import { Injectable, NotFoundException } from '@nestjs/common';
import {
  validaComprasAcimaReceita,
  validaExportacaoAcimaLimite,
  validaFaturamentoAnual,
  validaPossuiFilial,
  validaParticipacaoSocietaria,
  validaQuantidadeFuncionarios,
  validaSalarioAcimaPiso,
  validaNaturezaJuridica,
  validaImportacaoDireta,
  validaCNAE,
} from './rules';
import { Diagnostico } from '../../interfaces/diagnostico';
import { diagnostico } from './rules';

@Injectable()
export class AnaliseMigracaoService {
  private adicionaDiagnostico(resultados: Diagnostico[], rule: string) {
    const encontrado = diagnostico.find((d) => d.rule === rule);

    if (encontrado) resultados.push(encontrado);
  }

  analisar(mei: any, cnaesPermitidos: string[]) {
    const resultados: Diagnostico[] = [];

    const add = (rule: string) => this.adicionaDiagnostico(resultados, rule);

    validaCNAE(mei, resultados, add, cnaesPermitidos);
    validaFaturamentoAnual(mei, resultados, add);
    validaComprasAcimaReceita(mei, resultados, add);
    validaExportacaoAcimaLimite(mei, resultados, add);
    validaPossuiFilial(mei, resultados, add);
    validaParticipacaoSocietaria(mei, resultados, add);
    validaQuantidadeFuncionarios(mei, resultados, add);
    validaSalarioAcimaPiso(mei, resultados, add);
    validaNaturezaJuridica(mei, resultados, add);
    validaImportacaoDireta(mei, resultados, add);

    const deveMigrar = resultados.length > 0;

    return {
      status: deveMigrar ? 'APTO' : 'NÃO APTO',
      analise:
        resultados.length > 0
          ? `O MEI deve realizar a migração, pois violou os requisitos legais`
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
