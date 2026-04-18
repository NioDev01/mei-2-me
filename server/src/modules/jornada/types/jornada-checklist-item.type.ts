import { JornadaStep } from '../enums/jornada-step.enum';

export type JornadaChecklistItem = {
  id: string;
  step: JornadaStep;
  label: string;
  isChecked: boolean;
  required: boolean;
};
