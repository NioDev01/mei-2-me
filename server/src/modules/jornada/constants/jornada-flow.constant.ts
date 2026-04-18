import { JornadaStep } from '../enums/jornada-step.enum';

export const JORNADA_FLOW: JornadaStep[] = [
  JornadaStep.DESENQUADRAMENTO,
  JornadaStep.DEFINICAO_EMPRESA,
  JornadaStep.CONTRATO_SOCIAL,
  JornadaStep.JUNTA_COMERCIAL,
  JornadaStep.CNPJ,
  JornadaStep.LICENCIAMENTO,
  JornadaStep.REGIME_TRIBUTARIO,
  JornadaStep.OBRIGACOES_FISCAIS,
] as const;
