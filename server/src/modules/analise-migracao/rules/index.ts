import { Diagnostico } from '@/interfaces/diagnostico';

export * from './cnae-valido.rule';
export * from './compras-acima-receita.rule';
export * from './exportacao-acima-limite.rule';
export * from './faturamento-anual.rule';
export * from './importacao-direta.rule';
export * from './natureza-juridica.rule';
export * from './possui-filial.rule';
export * from './possui-participacao.rule';
export * from './quantidade-funcionario.rule';
export * from './salario-acima-piso.rule';

export const diagnostico: Diagnostico[] = [
  {
    id: 1,
    rule: 'Faturamento anual acima do limite, mas dentro do tolerado',
    reasons: [
      'Faturamento anual superior à R$81.000,00',
      'Faturamento dentro da margem de até 20% acima do limite legal (até R$97.200,00)',
    ],
    risks: [
      'Obrigatoriedade de desenquadramento do MEI no ano seguinte',
      'Obrigação de recolher tributos como ME a partir de janeiro do próximo ano',
      'Exclusão do Simples Nacional se não houver regularização',
    ],
    legalReferences: ['Lei Complementar 123/2006, Art. 18-A'],
  },
  {
    id: 2,
    rule: 'Faturamento anual acima do limite, excedendo o tolerado',
    reasons: ['Faturamento anual excede o limite tolerado de R$ 97.200,00'],
    risks: [
      'Desenquadramento imediato e retroativo ao mês da ultrapassagem',
      'Obrigação de recolher tributos como ME desde o mês do excesso',
      'Exclusão do Simples Nacional se não houver regularização',
    ],
    legalReferences: ['Lei Complementar 123/2006, Art. 18-A'],
  },
  {
    id: 3,
    rule: 'Atividade não permitida para MEI',
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
    id: 4,
    rule: 'Quantidade de Funcionários',
    reasons: ['MEI não pode ter mais de 1 funcionário contratado.'],
    risks: [
      'Cancelamento imediato do enquadramento como MEI.',
      'Cobrança de encargos trabalhistas retroativos.',
    ],
    legalReferences: ['Lei Complementar 123/2006, Art. 18-C'],
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    rule: 'Abertura de filial',
    reasons: ['CNPJ possui uma ou mais filiais'],
    risks: ['Desenquadramento obrigatório imediato do regime de MEI'],
    legalReferences: [
      'Art. 3º, §4º, inciso IV da Lei Complementar nº 123/2006',
    ],
  },
  {
    id: 8,
    rule: 'Importação direta',
    reasons: [
      'A empresa realiza importações de forma direta, o que não é permitido ao MEI',
    ],
    risks: [
      'Desenquadramento obrigatório imediato do regime MEI',
      'Obrigação de recolher tributos como ME desde a ocorrência da importação',
      'Exclusão do Simples Nacional se não houver regularização',
    ],
    legalReferences: [
      'Lei Complementar nº 123/2006',
      'Resolução CGSN nº 140/2018',
    ],
  },
  {
    id: 9,
    rule: 'Compras superiores a 80% da receita bruta',
    reasons: ['Valor total das compras superior a 80% da receita bruta anual'],
    risks: ['Desenquadramento obrigatório no ano seguinte ao excesso'],
    legalReferences: ['Lei Complementar nº 123/2006'],
  },
  {
    id: 10,
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
  {
    id: 11,
    rule: 'Natureza jurídica incompatível com MEI',
    reasons: [
      'A natureza jurídica informada não é "Empresário Individual"',
      'Somente empresários individuais podem ser enquadrados como MEI',
    ],
    risks: [
      'Desenquadramento obrigatório do regime MEI',
      'Obrigação de recolher tributos como ME a partir da constatação da irregularidade',
      'Exclusão do Simples Nacional se não houver regularização',
    ],
    legalReferences: [
      'Lei Complementar 123/2006, Art. 18-A',
      'Resolução CGSN nº 140/2018',
    ],
  },
];
