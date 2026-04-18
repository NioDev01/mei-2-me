import { JornadaStep } from '../enums/jornada-step.enum';
import { JornadaStepState } from '../types/jornada-step-state.type';
import { JornadaChecklistItem } from '../types/jornada-checklist-item.type';
import { JORNADA_CHECKLISTS } from '../constants/jornada-checklists.constant';
import { toggleChecklistItem } from './toggle-checklist-item.util';
import { canCompleteStep } from './can-complete-step.util';
import { getStepStatus } from './get-step-status.util';
import { JornadaStepStatus } from '../enums/jornada-step-status.enum';

export class JornadaEngine {
  private steps: JornadaStepState[];
  private checklists: Record<JornadaStep, JornadaChecklistItem[]>;

  constructor(initialSteps: JornadaStepState[]) {
    this.steps = initialSteps;

    // clone do checklist
    this.checklists = JSON.parse(JSON.stringify(JORNADA_CHECKLISTS));
  }

  getSteps() {
    return this.steps;
  }

  getStepsWithStatus(): {
    step: JornadaStep;
    status: JornadaStepStatus;
  }[] {
    return this.steps.map((stepState) => ({
      step: stepState.step,
      status: getStepStatus(stepState.step, this.steps),
    }));
  }

  getChecklist(step: JornadaStep) {
    return this.checklists[step];
  }

  startStep(step: JornadaStep) {
    const target = this.steps.find((s) => s.step === step);
    if (target) target.started = true;
  }

  toggleItem(step: JornadaStep, itemId: string) {
    const checklist = this.checklists[step];
    this.checklists[step] = toggleChecklistItem(checklist, itemId);
  }

  completeStep(step: JornadaStep) {
    const checklist = this.checklists[step];

    if (!canCompleteStep(checklist)) {
      throw new Error('Checklist incompleto');
    }

    const target = this.steps.find((s) => s.step === step);
    if (target) target.completed = true;
  }
}
