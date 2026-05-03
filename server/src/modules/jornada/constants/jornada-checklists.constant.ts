import { JornadaStep } from '../enums/jornada-step.enum';
import { JornadaChecklistItem } from '../types/jornada-checklist-item.type';

export const JORNADA_CHECKLISTS: Record<JornadaStep, JornadaChecklistItem[]> = {
  [JornadaStep.DESENQUADRAMENTO]: [
    {
      id: 'entendi-motivo',
      step: JornadaStep.DESENQUADRAMENTO,
      label: 'Entendi o motivo do desenquadramento',
      isChecked: false,
      required: true,
    },
    {
      id: 'acessei-portal',
      step: JornadaStep.DESENQUADRAMENTO,
      label: 'Acessei o Portal do Simples Nacional',
      isChecked: false,
      required: true,
    },
    {
      id: 'solicitei-desenquadramento',
      step: JornadaStep.DESENQUADRAMENTO,
      label: 'Solicitei meu processo de desenquadramento',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.DEFINICAO_EMPRESA]: [
    {
      id: 'defini-natureza',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'A natureza jurídica da empresa foi definida.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-capital-social',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'O capital social da empresa foi definido.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-titular',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'Os dados do titular foram informados.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-socios',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'Os sócios foram definidos (quando aplicável).',
      isChecked: false,
      required: false,
    },
  ],

  [JornadaStep.ATO_CONSTITUTIVO]: [
    {
      id: 'ato-revisao-dados',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Revisei os dados da empresa antes de gerar o documento.',
      isChecked: false,
      required: true,
    },
    {
      id: 'ato-geracao-documento',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Gerei o documento da minha empresa.',
      isChecked: false,
      required: true,
    },
    {
      id: 'ato-validacao-documento',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Entendo que o documento deve ser validado antes do uso oficial.',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.JUNTA_COMERCIAL]: [
    {
      id: 'iniciei-processo-junta',
      step: JornadaStep.JUNTA_COMERCIAL,
      label:
        'Iniciei o processo de registro da empresa no portal da Junta Comercial (JUCESP).',
      isChecked: false,
      required: true,
    },
    {
      id: 'preenchi-dados-e-anexei-documentos',
      step: JornadaStep.JUNTA_COMERCIAL,
      label:
        'Preenchi os dados da empresa e anexei o Ato Constitutivo e demais documentos.',
      isChecked: false,
      required: true,
    },
    {
      id: 'realizei-pagamento-taxas',
      step: JornadaStep.JUNTA_COMERCIAL,
      label: 'Realizei o pagamento das taxas de registro.',
      isChecked: false,
      required: true,
    },
    {
      id: 'acompanhei-protocolo',
      step: JornadaStep.JUNTA_COMERCIAL,
      label:
        'Acompanhei o andamento do processo utilizando o número de protocolo.',
      isChecked: false,
      required: true,
    },
    {
      id: 'registro-aprovado-ou-ajustado',
      step: JornadaStep.JUNTA_COMERCIAL,
      label:
        'Obtive a aprovação do registro ou realizei ajustes solicitados pela Junta Comercial.',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.CNPJ]: [
    {
      id: 'verifiquei-situacao-cnpj',
      step: JornadaStep.CNPJ,
      label: 'Consultei a situação do meu CNPJ na Receita Federal',
      isChecked: false,
      required: true,
    },
    {
      id: 'confirmei-atualizacao-automatica',
      step: JornadaStep.CNPJ,
      label: 'Verifiquei se os dados foram atualizados automaticamente',
      isChecked: false,
      required: true,
    },
    {
      id: 'revisei-dados-cadastrais',
      step: JornadaStep.CNPJ,
      label: 'Revisei se os dados cadastrais estão corretos',
      isChecked: false,
      required: true,
    },
    {
      id: 'realizei-ajustes-se-necessario',
      step: JornadaStep.CNPJ,
      label: 'Realizei a atualização via DBE (apenas se necessário)',
      isChecked: false,
      required: false,
    },
    {
      id: 'confirmei-regularizacao-cnpj',
      step: JornadaStep.CNPJ,
      label: 'Confirmei que o CNPJ está regular e atualizado',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.LICENCIAMENTO]: [
    {
      id: 'verifiquei-exigencia-licenciamento',
      step: JornadaStep.LICENCIAMENTO,
      label:
        'Verifiquei se minha atividade exige licenciamento no meu município.',
      isChecked: false,
      required: true,
    },
    {
      id: 'consultei-prefeitura',
      step: JornadaStep.LICENCIAMENTO,
      label:
        'Consultei o portal da prefeitura para entender as exigências aplicáveis.',
      isChecked: false,
      required: true,
    },
    {
      id: 'identifiquei-necessidade-licencas',
      step: JornadaStep.LICENCIAMENTO,
      label:
        'Identifiquei se preciso solicitar licenças ou alvará de funcionamento.',
      isChecked: false,
      required: true,
    },
    {
      id: 'iniciei-licenciamento-se-necessario',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Iniciei o processo de licenciamento (se necessário).',
      isChecked: false,
      required: false,
    },
    {
      id: 'regularidade-operacional',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Confirmei que minha empresa está regular para operar.',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.REGIME_TRIBUTARIO]: [
    {
      id: 'compreendi-impacto-regime',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label:
        'Compreendi como o regime tributário impacta os impostos e o lucro da empresa.',
      isChecked: false,
      required: true,
    },
    {
      id: 'realizei-ou-avaliei-simulacao',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label:
        'Realizei ou analisei a simulação para comparar os regimes tributários.',
      isChecked: false,
      required: true,
    },
    {
      id: 'comparei-regimes',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Comparei os resultados entre Simples Nacional e Lucro Presumido.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-regime',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Defini qual regime tributário é mais adequado para o meu caso.',
      isChecked: false,
      required: true,
    },
    {
      id: 'ciente-prazo-opcao',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label:
        'Estou ciente do prazo para formalizar a escolha do regime tributário.',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.OBRIGACOES_FISCAIS]: [
    {
      id: 'compreendi-obrigacoes',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Compreendi as principais obrigações fiscais da minha empresa.',
      isChecked: false,
      required: true,
    },
    {
      id: 'entendi-emissao-notas',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Entendi quando e como devo emitir notas fiscais.',
      isChecked: false,
      required: true,
    },
    {
      id: 'conheco-prazos',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label:
        'Estou ciente dos prazos de pagamento de impostos e envio de declarações.',
      isChecked: false,
      required: true,
    },
    {
      id: 'organizei-controle',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Organizei um controle básico das receitas e despesas da empresa.',
      isChecked: false,
      required: true,
    },
    {
      id: 'planejei-apoio-contabil',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label:
        'Avaliei a necessidade de contar com um contador para manter a empresa regular.',
      isChecked: false,
      required: true,
    },
  ],
};
