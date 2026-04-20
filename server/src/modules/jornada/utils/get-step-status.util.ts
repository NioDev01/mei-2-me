import { JornadaStep } from '../enums/jornada-step.enum';
import { JornadaStepStatus } from '../enums/jornada-step-status.enum';
import { JORNADA_FLOW } from '../constants/jornada-flow.constant';

type StepState = {
  step: JornadaStep;
  completed: boolean;
  started: boolean;
};

export function getStepStatus(
  step: JornadaStep,
  stepsState: StepState[],
): JornadaStepStatus {
  const stepIndex = JORNADA_FLOW.indexOf(step);

  if (stepIndex === -1) {
    throw new Error(`Step inválido: ${step}`);
  }

  const currentStep = stepsState.find((s) => s.step === step);

  // 1. Se já completou
  if (currentStep?.completed) {
    return JornadaStepStatus.COMPLETED;
  }

  // 2. Primeira etapa sempre disponível
  if (stepIndex === 0) {
    return currentStep?.started
      ? JornadaStepStatus.IN_PROGRESS
      : JornadaStepStatus.AVAILABLE;
  }

  // 3. Verifica etapa anterior
  const previousStep = JORNADA_FLOW[stepIndex - 1];
  const previousState = stepsState.find((s) => s.step === previousStep);

  if (!previousState?.completed) {
    return JornadaStepStatus.LOCKED;
  }

  // 4. Se pode acessar
  if (currentStep?.started) {
    return JornadaStepStatus.IN_PROGRESS;
  }

  return JornadaStepStatus.AVAILABLE;
}
