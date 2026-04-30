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
      id: 'defini-empresa',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'A definição do tipo de empresa foi feita.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-socios',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'A definição dos sócios foi feita.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-capital-social',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'A definição do capital social foi feita.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-cnaes',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'A definição dos CNAEs foi feita.',
      isChecked: false,
      required: true,
    },
    {
      id: 'defini-endereco',
      step: JornadaStep.DEFINICAO_EMPRESA,
      label: 'A definição do endereço atualizado foi feita.',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.ATO_CONSTITUTIVO]: [
    {
      id: 'compreendi-contrato',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Pude compreender o que é um Contrato Social',
      isChecked: false,
      required: true,
    },
    {
      id: 'separei-infos-necessarias',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Fiz a separação de informações necessárias',
      isChecked: false,
      required: true,
    },
    {
      id: 'usei-modelo-adequado',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Fiz uso de um modelo adequado',
      isChecked: false,
      required: true,
    },
    {
      id: 'revisei-documento',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Fiz a revisão do documento',
      isChecked: false,
      required: true,
    },
    {
      id: 'gerei-contrato-final',
      step: JornadaStep.ATO_CONSTITUTIVO,
      label: 'Pude fazer a geração do contrato final',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.JUNTA_COMERCIAL]: [
    {
      id: 'acessei-portal-junta',
      step: JornadaStep.JUNTA_COMERCIAL,
      label: 'Fiz o acesso ao Portal da Junta Comercial',
      isChecked: false,
      required: true,
    },
    {
      id: 'preenchi-dados-empresa',
      step: JornadaStep.JUNTA_COMERCIAL,
      label: 'Fiz o preenchimento de dados da empresa',
      isChecked: false,
      required: true,
    },
    {
      id: 'enviei-documentos-junta',
      step: JornadaStep.JUNTA_COMERCIAL,
      label: 'Enviei os documentos necessários',
      isChecked: false,
      required: true,
    },
    {
      id: 'realizei-pagamentos-taxes',
      step: JornadaStep.JUNTA_COMERCIAL,
      label: 'Realizei os pagamentos das taxas',
      isChecked: false,
      required: true,
    },
    {
      id: 'acompanhei-status-registro',
      step: JornadaStep.JUNTA_COMERCIAL,
      label: 'Acompanhei o status do registro',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.CNPJ]: [
    {
      id: 'acessei-portal-receita',
      step: JornadaStep.CNPJ,
      label: 'Fiz o acesso ao sistema da Receita Federal',
      isChecked: false,
      required: true,
    },
    {
      id: 'preenchi-dbe',
      step: JornadaStep.CNPJ,
      label: 'Fiz o preenchimento do DBE',
      isChecked: false,
      required: true,
    },
    {
      id: 'revisei-dados-informados',
      step: JornadaStep.CNPJ,
      label: 'Revisei os dados informados',
      isChecked: false,
      required: true,
    },
    {
      id: 'enviei-solicitacao',
      step: JornadaStep.CNPJ,
      label: 'Enviei a solicitação',
      isChecked: false,
      required: true,
    },
    {
      id: 'acompanhei-status-processo',
      step: JornadaStep.CNPJ,
      label: 'Acompanhei o status do processo',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.LICENCIAMENTO]: [
    {
      id: 'verifiquei-licenciamento',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Verifiquei se minha atividade exige licenciamento',
      isChecked: false,
      required: true,
    },
    {
      id: 'consultei-orgaos-responsaveis',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Consultei os órgãos responsáveis no meu município',
      isChecked: false,
      required: true,
    },
    {
      id: 'solicitei-licencas',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Solicitei as licenças necessárias',
      isChecked: false,
      required: true,
    },
    {
      id: 'separei-documentos-exigidos',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Separei os documentos exigidos',
      isChecked: false,
      required: true,
    },
    {
      id: 'acompanhei-solicitacoes',
      step: JornadaStep.LICENCIAMENTO,
      label: 'Acompanhei o andamento das solicitações',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.REGIME_TRIBUTARIO]: [
    {
      id: 'entendi-regime-tributario',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Entendi o que é o regime tributário',
      isChecked: false,
      required: true,
    },
    {
      id: 'analisei-opcoes',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Analisei as opções disponíveis',
      isChecked: false,
      required: true,
    },
    {
      id: 'utilizei-simulador',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Utilizei o simulador (se necessário)',
      isChecked: false,
      required: true,
    },
    {
      id: 'avaliei-regime',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Avaliei qual seria o regime mais adequado ao meu caso',
      isChecked: false,
      required: true,
    },
    {
      id: 'realizei-escolha-regime',
      step: JornadaStep.REGIME_TRIBUTARIO,
      label: 'Realizei minha escolha dentro do prazo',
      isChecked: false,
      required: true,
    },
  ],

  [JornadaStep.OBRIGACOES_FISCAIS]: [
    {
      id: 'entendi-obrigacoes-fiscais',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Entendi minhas obrigações fiscais',
      isChecked: false,
      required: true,
    },
    {
      id: 'sei-como-emitir-notas-fiscais',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Sei como emitir notas fiscais',
      isChecked: false,
      required: true,
    },
    {
      id: 'entendi-prazos-pagamento',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Estou ciente dos prazos de pagamento de impostos',
      isChecked: false,
      required: true,
    },
    {
      id: 'organizei-controle-financeiro',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Organizei o controle financeiro básico',
      isChecked: false,
      required: true,
    },
    {
      id: 'considerei-apoio-contador',
      step: JornadaStep.OBRIGACOES_FISCAIS,
      label: 'Considerei o apoio de um contador',
      isChecked: false,
      required: true,
    },
  ],
};
