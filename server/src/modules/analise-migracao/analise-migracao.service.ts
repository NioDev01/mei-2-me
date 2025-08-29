import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  validaComprasAcimaReceita,
  validaExportacaoAcimaLimite,
  validaFaturamentoAnual,
  validaPossuiFilial,
  validaParticipacaoSocietaria,
  validaQuantidadeFuncionarios,
  validaSalarioAcimaPiso,
} from './rules';

export interface Diagnostico {
  id: number;
  rule: string;
  reasons: string[];
  risks: string[];
  legalReferences: string[];
}

const diagnostico: Diagnostico[] = [
  {
    id: 1,
    rule: 'Faturamento Anual',
    reasons: [
      'Faturamento anual excede o limite MEI de R$ 81.000,00',
      'Faturamento anual excede o limite tolerado de R$ 97.200,00',
    ],
    risks: [
      'Multa de até R$ 5.000,00 por enquadramento incorreto',
      'Exclusão do Simples Nacional',
      'Obrigação de pagar impostos retroativos',
    ],
    legalReferences: ['Lei Complementar 123/2006, Art. 18-A'],
  },
  {
    id: 2,
    rule: 'Atividades Permitidas',
    reasons: [
      'Atividade exercida não consta na lista oficial de CNAEs permitidos para MEI',
      'Ramo da empresa não listado nas opções pré-definidas',
    ],
    risks: [
      'Desenquadramento obrigatório imediato do regime de MEI',
      'Obrigatoriedade de migração para ME ou outro regime tributário',
    ],
    legalReferences: [
      'Lei Complementar nº 123/2006',
      'Resolução CGSN nº 140/2018',
      'Lista oficial de atividades permitidas para MEI - Portal do Empreendedor (https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei/atividades-permitidas)',
    ],
  },
  {
    id: 3,
    rule: 'Quantidade de Funcionários',
    reasons: ['MEI não pode ter mais de 1 funcionário contratado.'],
    risks: [
      'Cancelamento imediato do enquadramento como MEI.',
      'Cobrança de encargos trabalhistas retroativos.',
    ],
    legalReferences: ['Lei Complementar 123/2006, Art. 18-C'],
  },
  {
    id: 4,
    rule: 'Participação Societária',
    reasons: [
      'O MEI não pode ser sócio, administrador ou titular de outra empresa',
      'Exercício de atividade secundária não autorizada ao MEI',
    ],
    risks: [
      'Desenquadramento imediato do regime MEI',
      'Obrigatoriedade de migração para ME',
    ],
    legalReferences: [
      'Art. 3º, §4º da Lei Complementar nº 123/2006',
      'Resolução CGSN nº 140/2018',
    ],
  },
  {
    id: 5,
    rule: 'Salário acima do permitido',
    reasons: [
      'Pagamento de salário superior ao piso da categoria profissional',
      'Pagamento de salário superior ao salário mínimo vigente',
    ],
    risks: [
      'Possibilidade de desenquadramento obrigatório do MEI',
      'Necessidade de análise jurídica para definição da obrigatoriedade',
    ],
    legalReferences: [
      'Lei Complementar nº 123/2006',
      'CLT - Consolidação das Leis do Trabalho',
    ],
  },
  {
    id: 6,
    rule: 'Abertura de filial',
    reasons: ['CNPJ possui uma ou mais filiais'],
    risks: ['Desenquadramento obrigatório imediato do regime de MEI'],
    legalReferences: [
      'Art. 3º, §4º, inciso IV da Lei Complementar nº 123/2006',
    ],
  },
  {
    id: 7,
    rule: 'Importação direta',
    reasons: ['A empresa realiza importações de forma direta'],
    risks: ['Desenquadramento obrigatório imediato do regime de MEI'],
    legalReferences: [
      'Lei Complementar nº 123/2006',
      'Resolução CGSN nº 140/2018',
    ],
  },
  {
    id: 8,
    rule: 'Compras superiores a 80% da receita bruta',
    reasons: ['Valor total das compras superior a 80% da receita bruta anual'],
    risks: ['Desenquadramento obrigatório no ano seguinte ao excesso'],
    legalReferences: ['Lei Complementar nº 123/2006'],
  },
  {
    id: 9,
    rule: 'Exportações acima do limite permitido',
    reasons: [
      'Total de exportações ultrapassa o limite legal de R$ 81.000 para serviços ou outros valores definidos em lei',
    ],
    risks: [
      'Desenquadramento proporcional ao excesso',
      'Obrigatoriedade de transição conforme a categoria de exportação',
    ],
    legalReferences: [
      'Art. 91 da Resolução CGSN nº 140/2018',
      'Lei Complementar nº 123/2006',
    ],
  },
];

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

    if (!user) {
      throw new NotFoundException(`CNPJ ${cnpj} não encontrado no banco.`);
    }

    const resultados: Diagnostico[] = [];

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

    return {
      cnpj: user.cnpj_mei,
      razaoSocial: user.razao_social,
      analise:
        resultados.length > 0
          ? `O MEI deve realizar a migração, pois os seguintes requisitos legais foram violados: ${resultados.map((r) => r.rule).join(', ')}`
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
