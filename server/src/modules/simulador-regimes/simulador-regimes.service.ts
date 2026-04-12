import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSimuladorRegimeDto } from './dto/create-simulador-regime.dto';
import { calcularSimplesNacional, calcularLucroPresumido } from './rules';

interface InfosCnae {
  simples_anexo: string;
  iss_cnae: boolean | string;
  icms_cnae: boolean | string;
  lucrop_aliq_csll: number;
  lucrop_aliq_irpj: number;
}

@Injectable()
export class SimuladorRegimesService {
  constructor(private prisma: PrismaService) {}

  // 🔧 Helper para normalizar Decimal/string → number
  private toNumber(value: any): number {
    if (value === null || value === undefined) return 0;
    return Number(value);
  }

  formatCnaeMei(cnaeMei: string) {
    if (!cnaeMei) return null;

    let cnae = cnaeMei.replace(/\./g, '');
    cnae = cnae.replace(/-(\d{2})$/, '/$1');

    return cnae;
  }

  recomendarRegime(
    lucroSimples: number,
    lucroLucroPresumido: number,
  ): 'SN' | 'LP' | 'ID' {
    if (lucroSimples > lucroLucroPresumido) return 'SN';
    if (lucroLucroPresumido > lucroSimples) return 'LP';
    return 'ID';
  }

  async create(dto: CreateSimuladorRegimeDto, id_mei: number) {
    const {
      receitas_financeiras,
      receitas_nao_operacionais,
      despesas_financeiras,
    } = dto;

    const infosMei = await this.prisma.mei.findUnique({
      where: { id_mei },
      select: { faturamento_12m: true, cnae_principal: true },
    });

    if (!infosMei) {
      throw new NotFoundException(`MEI com id ${id_mei} não encontrado.`);
    }

    const rendaBrutaAnual = infosMei.faturamento_12m
      ? infosMei.faturamento_12m.toNumber()
      : 0;

    const cnae = infosMei.cnae_principal as any;

    if (!cnae?.code) {
      throw new BadRequestException(
        'CNAE principal do MEI não encontrado ou inválido.',
      );
    }

    const cnaePrincipal = this.formatCnaeMei(cnae.code);

    if (!cnaePrincipal) {
      throw new BadRequestException('Não foi possível formatar o CNAE do MEI.');
    }

    const infosCnae = (await this.prisma.cnae.findFirst({
      where: { cnae: cnaePrincipal },
      select: {
        simples_anexo: true,
        iss_cnae: true,
        icms_cnae: true,
        lucrop_aliq_csll: true,
        lucrop_aliq_irpj: true,
      },
    })) as InfosCnae | null;

    if (!infosCnae) {
      throw new NotFoundException(
        `CNAE ${cnaePrincipal} não encontrado na tabela Cnae.`,
      );
    }

    const {
      simples_anexo: anexoSimples,
      iss_cnae: consideraIss,
      icms_cnae: consideraIcms,
      lucrop_aliq_csll: percentualCsll,
      lucrop_aliq_irpj: percentualIrpj,
    } = infosCnae;

    if (!anexoSimples) {
      throw new NotFoundException(
        `Anexo do Simples Nacional não encontrado para o CNAE ${cnaePrincipal}.`,
      );
    }

    // 🧮 Cálculos
    const simples = calcularSimplesNacional(
      rendaBrutaAnual,
      despesas_financeiras ?? 0,
      anexoSimples,
    );

    const lucrop = calcularLucroPresumido(
      rendaBrutaAnual,
      receitas_financeiras ?? 0,
      receitas_nao_operacionais ?? 0,
      despesas_financeiras ?? 0,
      percentualIrpj ?? 0,
      percentualCsll ?? 0,
      consideraIcms,
      consideraIss,
    );

    const recomendacao = this.recomendarRegime(
      simples.lucroEstimado,
      lucrop.lucroEstimado,
    );

    const atualizado_em = new Date();

    const registroCalculo = await this.prisma.calculoRegime.upsert({
      where: { id_mei },
      update: {
        atualizado_em,
        receitas_financeiras,
        receitas_nao_operacionais,
        despesas_financeiras,
        tributos_simples: simples.tributosMensais,
        aliq_efetiva_simples: simples.aliquotaEfetiva,
        lucro_liq_simples: simples.lucroEstimado,
        tributos_lucrop: lucrop.tributosMensais,
        aliq_efetiva_lucrop: lucrop.aliquotaEfetiva,
        lucro_liq_lucrop: lucrop.lucroEstimado,
        recomendacao,
      },
      create: {
        id_mei,
        atualizado_em,
        receitas_financeiras,
        receitas_nao_operacionais,
        despesas_financeiras,
        tributos_simples: simples.tributosMensais,
        aliq_efetiva_simples: simples.aliquotaEfetiva,
        lucro_liq_simples: simples.lucroEstimado,
        tributos_lucrop: lucrop.tributosMensais,
        aliq_efetiva_lucrop: lucrop.aliquotaEfetiva,
        lucro_liq_lucrop: lucrop.lucroEstimado,
        recomendacao,
      },
      select: {
        receitas_financeiras: true,
        receitas_nao_operacionais: true,
        despesas_financeiras: true,
        tributos_simples: true,
        aliq_efetiva_simples: true,
        lucro_liq_simples: true,
        tributos_lucrop: true,
        aliq_efetiva_lucrop: true,
        lucro_liq_lucrop: true,
        recomendacao: true,
      },
    });

    // 🔥 Conversão para number (ESSENCIAL)
    return {
      faturamento_12m: rendaBrutaAnual,
      receitas_financeiras: this.toNumber(registroCalculo.receitas_financeiras),
      receitas_nao_operacionais: this.toNumber(
        registroCalculo.receitas_nao_operacionais,
      ),
      despesas_financeiras: this.toNumber(registroCalculo.despesas_financeiras),
      tributos_simples: this.toNumber(registroCalculo.tributos_simples),
      aliq_efetiva_simples: this.toNumber(registroCalculo.aliq_efetiva_simples),
      lucro_liq_simples: this.toNumber(registroCalculo.lucro_liq_simples),
      tributos_lucrop: this.toNumber(registroCalculo.tributos_lucrop),
      aliq_efetiva_lucrop: this.toNumber(registroCalculo.aliq_efetiva_lucrop),
      lucro_liq_lucrop: this.toNumber(registroCalculo.lucro_liq_lucrop),
      recomendacao: registroCalculo.recomendacao,
    };
  }

  async findOne(id_mei: number) {
    const infosMei = await this.prisma.mei.findUnique({
      where: { id_mei },
      select: { faturamento_12m: true },
    });

    const registroCalculo = await this.prisma.calculoRegime.findUnique({
      where: { id_mei },
      select: {
        receitas_financeiras: true,
        receitas_nao_operacionais: true,
        despesas_financeiras: true,
        tributos_simples: true,
        aliq_efetiva_simples: true,
        lucro_liq_simples: true,
        tributos_lucrop: true,
        aliq_efetiva_lucrop: true,
        lucro_liq_lucrop: true,
        recomendacao: true,
      },
    });

    if (!registroCalculo) {
      throw new NotFoundException(`Cálculo para MEI não encontrado.`);
    }

    return {
      faturamento_12m: infosMei?.faturamento_12m
        ? Number(infosMei.faturamento_12m)
        : 0,
      receitas_financeiras: this.toNumber(registroCalculo.receitas_financeiras),
      receitas_nao_operacionais: this.toNumber(
        registroCalculo.receitas_nao_operacionais,
      ),
      despesas_financeiras: this.toNumber(registroCalculo.despesas_financeiras),
      tributos_simples: this.toNumber(registroCalculo.tributos_simples),
      aliq_efetiva_simples: this.toNumber(registroCalculo.aliq_efetiva_simples),
      lucro_liq_simples: this.toNumber(registroCalculo.lucro_liq_simples),
      tributos_lucrop: this.toNumber(registroCalculo.tributos_lucrop),
      aliq_efetiva_lucrop: this.toNumber(registroCalculo.aliq_efetiva_lucrop),
      lucro_liq_lucrop: this.toNumber(registroCalculo.lucro_liq_lucrop),
      recomendacao: registroCalculo.recomendacao,
    };
  }
}
