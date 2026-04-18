import { JornadaStep } from '../enums/jornada-step.enum';
import { JornadaStepState } from '../types/jornada-step-state.type';
import { JORNADA_FLOW } from './jornada-flow.constant';

export const JORNADA_INITIAL_STATE: JornadaStepState[] = JORNADA_FLOW.map(
  (step) => ({
    step,
    started: false,
    completed: false,
  }),
);
