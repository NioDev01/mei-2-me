import { Injectable } from '@nestjs/common';
import { JornadaEngine } from './utils/jornada-engine.util';
import { JORNADA_INITIAL_STATE } from './constants/jornada-initial-state.constant';
import { JornadaStep } from './enums/jornada-step.enum';

@Injectable()
export class JornadaService {
  private engine: JornadaEngine;

  constructor() {
    this.engine = new JornadaEngine(JORNADA_INITIAL_STATE);
  }

  getStepsWithStatus() {
    return this.engine.getStepsWithStatus();
  }

  getChecklist(step: JornadaStep) {
    return this.engine.getChecklist(step);
  }

  startStep(step: JornadaStep) {
    this.engine.startStep(step);
  }

  toggleItem(step: JornadaStep, itemId: string) {
    this.engine.toggleItem(step, itemId);
  }

  completeStep(step: JornadaStep) {
    this.engine.completeStep(step);
  }
}
