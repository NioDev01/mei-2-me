import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Função para formatar o CNAE do MEI para o padrão da tabela Cnae
  formatCnaeMei(cnaeMei: string) {
    if (!cnaeMei) return null;

    // Remove todos os pontos
    let cnae = cnaeMei.replace(/\./g, '');

    // Converte o último hífen em barra
    cnae = cnae.replace(/-(\d{2})$/, '/$1');

    return cnae;
  }

  // Função para comparar e recomedar o melhor regime com base nas alíquotas efetivas
  recomendarRegime(
    aliqEfetivaSimples: number,
    aliqEfetivaLucrop: number,
  ): 'SN' | 'LP' | 'ID' {
    if (aliqEfetivaSimples < aliqEfetivaLucrop) {
      return 'SN';
    } else if (aliqEfetivaLucrop < aliqEfetivaSimples) {
      return 'LP';
    } else {
      return 'ID';
    }
  }

  async create(createSimuladorRegimeDto: CreateSimuladorRegimeDto) {
    // Extrai os dados do DTO vindos da requisição
    const {
      id_mei,
      receitas_financeiras,
      receitas_nao_operacionais,
      despesas_financeiras,
    } = createSimuladorRegimeDto;

    // Busca no banco de dados as informações do MEI
    const infosMei = await this.prisma.mei.findUnique({
      where: { id_mei },
      select: { faturamento_12m: true, cnae_principal: true },
    });

    if (!infosMei) {
      throw new NotFoundException(`MEI com id ${id_mei} não encontrado.`);
    }

    // Extrai os dados do MEI
    const { faturamento_12m: rendaBrutaAnual, cnae_principal: cnaeJson } =
      infosMei;

    // Verifica se existe o array e o primeiro elemento
    if (!cnaeJson || !cnaeJson[0]?.code) {
      throw new Error('CNAE principal do MEI não encontrado.');
    }

    // Formata o CNAE do MEI
    const cnaePrincipal = this.formatCnaeMei(cnaeJson[0].code);

    if (!cnaePrincipal) {
      throw new Error('Não foi possível formatar o CNAE do MEI.');
    }

    // Busca no banco de dados as informações do CNAE
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

    // Extrai os dados do CNAE
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

    const {
      tributos: tributos_simples,
      aliquotaEfetiva: aliq_efetiva_simples,
      lucroLiquido: lucro_liq_simples,
    } = calcularSimplesNacional(
      rendaBrutaAnual.toNumber() ?? 0,
      despesas_financeiras ?? 0,
      anexoSimples,
    );

    const {
      tributos: tributos_lucrop,
      aliquotaEfetiva: aliq_efetiva_lucrop,
      lucroLiquido: lucro_liq_lucrop,
    } = calcularLucroPresumido(
      rendaBrutaAnual.toNumber() ?? 0,
      receitas_financeiras ?? 0,
      receitas_nao_operacionais ?? 0,
      despesas_financeiras ?? 0,
      percentualIrpj ?? 0,
      percentualCsll ?? 0,
      consideraIcms,
      consideraIss,
    );

    // Define a recomendação de regime
    const recomendacao = this.recomendarRegime(
      aliq_efetiva_simples,
      aliq_efetiva_lucrop,
    );

    // Data e hora atual para o campo atualizado_em
    const atualizado_em = new Date();

    // Salva ou atualiza o registro na tabela CalculaRegime
    const registroCalculo = await this.prisma.calculoRegime.upsert({
      where: { id_mei },
      update: {
        atualizado_em,
        receitas_financeiras,
        receitas_nao_operacionais,
        despesas_financeiras,
        tributos_simples,
        aliq_efetiva_simples,
        lucro_liq_simples,
        tributos_lucrop,
        aliq_efetiva_lucrop,
        lucro_liq_lucrop,
        recomendacao,
      },
      create: {
        id_mei,
        atualizado_em,
        receitas_financeiras,
        receitas_nao_operacionais,
        despesas_financeiras,
        tributos_simples,
        aliq_efetiva_simples,
        lucro_liq_simples,
        tributos_lucrop,
        aliq_efetiva_lucrop,
        lucro_liq_lucrop,
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

    // Retorna o registro do Calculo e o faturamento do MEI
    return { faturamento_12m: rendaBrutaAnual, ...registroCalculo };
  }

  async findOne(id_mei: number) {
    // Busca o faturamento do MEI
    const infosMei = await this.prisma.mei.findUnique({
      where: { id_mei },
      select: { faturamento_12m: true },
    });

    // Busca o registro de cálculo do MEI
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

    // Adiciona o faturamento ao resultado, se encontrado
    if (infosMei) {
      return { faturamento_12m: infosMei.faturamento_12m, ...registroCalculo };
    }
  }
}
