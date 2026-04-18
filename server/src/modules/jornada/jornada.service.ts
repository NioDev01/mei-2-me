import { BadRequestException, Injectable } from '@nestjs/common';
import { JornadaEngine } from './utils/jornada-engine.util';
import { JORNADA_INITIAL_STATE } from './constants/jornada-initial-state.constant';
import { JornadaStep } from './enums/jornada-step.enum';
import { JornadaStepStatus } from './enums/jornada-step-status.enum';
import { getStepStatus } from './utils/get-step-status.util';
import { PrismaService } from '@prisma/prisma.service';
import { JORNADA_FLOW } from './constants/jornada-flow.constant';
import { JORNADA_CHECKLISTS } from './constants/jornada-checklists.constant';
import { canCompleteStep } from './utils/can-complete-step.util';

@Injectable()
export class JornadaService {
  private engine: JornadaEngine;

  constructor(private prisma: PrismaService) {
    this.engine = new JornadaEngine(JORNADA_INITIAL_STATE);
  }

  async ensureJourneyInitialized(id_mei: number) {
    const existing = await this.prisma.jornadaStepProgress.findMany({
      where: { id_mei },
    });

    if (existing.length > 0) return;

    // cria todas as etapas
    await this.prisma.jornadaStepProgress.createMany({
      data: JORNADA_FLOW.map((step) => ({
        id_mei,
        step,
        started: false,
        completed: false,
      })),
    });
  }

  async getStepsWithStatus(id_mei: number) {
    await this.ensureJourneyInitialized(id_mei);

    const steps = await this.prisma.jornadaStepProgress.findMany({
      where: { id_mei },
    });

    const stepStates = steps.map((s) => ({
      step: s.step as JornadaStep,
      started: s.started,
      completed: s.completed,
    }));

    return stepStates.map((stepState) => ({
      step: stepState.step,
      status: getStepStatus(stepState.step, stepStates),
    }));
  }

  async getChecklist(id_mei: number, step: JornadaStep) {
    const baseChecklist = JORNADA_CHECKLISTS[step];

    const saved = await this.prisma.jornadaChecklistItem.findMany({
      where: { id_mei, step },
    });

    return baseChecklist.map((item) => {
      const found = saved.find((s) => s.item_id === item.id);

      return {
        ...item,
        isChecked: found?.is_checked ?? false,
      };
    });
  }

  async startStep(id_mei: number, step: JornadaStep) {
    const steps = await this.prisma.jornadaStepProgress.findMany({
      where: { id_mei },
    });

    const stepStates = steps.map((s) => ({
      step: s.step as JornadaStep,
      started: s.started,
      completed: s.completed,
    }));

    const status = getStepStatus(step, stepStates);

    if (status === JornadaStepStatus.LOCKED) {
      throw new BadRequestException('Etapa bloqueada');
    }

    await this.prisma.jornadaStepProgress.update({
      where: {
        id_mei_step: {
          id_mei,
          step,
        },
      },
      data: {
        started: true,
      },
    });
  }

  async resetNextSteps(id_mei: number, currentStep: JornadaStep) {
    const currentIndex = JORNADA_FLOW.indexOf(currentStep);

    const nextSteps = JORNADA_FLOW.slice(currentIndex + 1);

    await this.prisma.jornadaStepProgress.updateMany({
      where: {
        id_mei,
        step: { in: nextSteps },
      },
      data: {
        started: false,
        completed: false,
      },
    });
  }

  async toggleItem(id_mei: number, step: JornadaStep, itemId: string) {
    const exists = JORNADA_CHECKLISTS[step].some((i) => i.id === itemId);

    if (!exists) {
      throw new BadRequestException('Checklist item inválido');
    }

    const existing = await this.prisma.jornadaChecklistItem.findUnique({
      where: {
        id_mei_step_item_id: {
          id_mei,
          step,
          item_id: itemId,
        },
      },
    });

    // toggle
    if (existing) {
      await this.prisma.jornadaChecklistItem.update({
        where: {
          id_mei_step_item_id: {
            id_mei,
            step,
            item_id: itemId,
          },
        },
        data: {
          is_checked: !existing.is_checked,
        },
      });
    } else {
      await this.prisma.jornadaChecklistItem.create({
        data: {
          id_mei,
          step,
          item_id: itemId,
          is_checked: true,
        },
      });
    }

    // 🔥 NOVA REGRA: revalidar etapa
    const checklist = await this.getChecklist(id_mei, step);

    if (!canCompleteStep(checklist)) {
      // remove conclusão da etapa atual
      await this.prisma.jornadaStepProgress.update({
        where: {
          id_mei_step: {
            id_mei,
            step,
          },
        },
        data: {
          completed: false,
        },
      });

      // 🔥 resetar próximas etapas
      await this.resetNextSteps(id_mei, step);
    }
  }

  async completeStep(id_mei: number, step: JornadaStep) {
    const checklist = await this.getChecklist(id_mei, step);

    if (!canCompleteStep(checklist)) {
      throw new BadRequestException('Checklist incompleto');
    }

    await this.prisma.jornadaStepProgress.update({
      where: {
        id_mei_step: {
          id_mei,
          step,
        },
      },
      data: {
        completed: true,
      },
    });
  }
}
