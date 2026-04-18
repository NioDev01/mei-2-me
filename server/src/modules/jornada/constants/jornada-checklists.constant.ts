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
      id: 'verifiquei-vigencia',
      step: JornadaStep.DESENQUADRAMENTO,
      label: 'Verifiquei quando entra em vigor',
      isChecked: false,
      required: true,
    },
  ],

  // por enquanto deixa vazio
  [JornadaStep.DEFINICAO_EMPRESA]: [],
  [JornadaStep.CONTRATO_SOCIAL]: [],
  [JornadaStep.JUNTA_COMERCIAL]: [],
  [JornadaStep.CNPJ]: [],
  [JornadaStep.LICENCIAMENTO]: [],
  [JornadaStep.REGIME_TRIBUTARIO]: [],
  [JornadaStep.OBRIGACOES_FISCAIS]: [],
};
