import { JornadaStep } from '../enums/jornada-step.enum';

export type JornadaStepState = {
  step: JornadaStep;
  started: boolean;
  completed: boolean;
};
