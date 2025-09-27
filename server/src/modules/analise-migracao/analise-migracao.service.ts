import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  validaCNAE,
  validaComprasAcimaReceita,
  validaExportacaoAcimaLimite,
  validaFaturamentoAnual,
  validaPossuiFilial,
  validaParticipacaoSocietaria,
  validaQuantidadeFuncionarios,
  validaSalarioAcimaPiso,
  validaNaturezaJuridica,
  validaImportacaoDireta,
  diagnostico,
  Diagnostico,
} from './rules';

@Injectable()
export class AnaliseMigracaoService {
  constructor(private prisma: PrismaService) {}

  private adicionaDiagnostico(resultados: Diagnostico[], rule: string) {
    const diagnosticoEncontrado = diagnostico.find((d) => d.rule === rule);

    if (diagnosticoEncontrado) {
      resultados.push(diagnosticoEncontrado);
    }
  }

  async analisarMigracao(cnpj: string) {
    const user = await this.prisma.mei.findUnique({
      where: { cnpj_mei: cnpj },
    });

    const cnaesPermitidos = await this.prisma.cnae.findMany({
      select: { cnae: true },
    });

    if (!user) {
      throw new NotFoundException(`CNPJ ${cnpj} não encontrado no banco.`);
    }

    const cnaesList = cnaesPermitidos.map((c) => c.cnae);

    const resultados: Diagnostico[] = [];

    validaCNAE(
      user,
      resultados,
      (rule) => this.adicionaDiagnostico(resultados, rule),
      cnaesList,
    );

    validaFaturamentoAnual(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaComprasAcimaReceita(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaExportacaoAcimaLimite(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaPossuiFilial(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaParticipacaoSocietaria(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaQuantidadeFuncionarios(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaSalarioAcimaPiso(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaNaturezaJuridica(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    validaImportacaoDireta(user, resultados, (rule) =>
      this.adicionaDiagnostico(resultados, rule),
    );

    return {
      cnpj: user.cnpj_mei,
      razaoSocial: user.razao_social,
      analise:
        resultados.length > 0
          ? 'O MEI deve realizar a migração, pois violou requisitos legais.'
          : 'O MEI está em conformidade com a legislação vigente',
      motivos: resultados.map((r) => ({
        regra: r.rule,
        razoes: r.reasons,
        riscos: r.risks,
        referenciasLegais: r.legalReferences,
      })),
    };
  }
}
