import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JornadaService } from './jornada.service';
import { JornadaStep } from './enums/jornada-step.enum';

@Controller('jornada')
export class JornadaController {
  constructor(private readonly jornadaService: JornadaService) {}

  // 🔹 Status de todas as etapas
  @Get('steps')
  getSteps() {
    return this.jornadaService.getStepsWithStatus();
  }

  // 🔹 Checklist de uma etapa
  @Get('steps/:step/checklist')
  getChecklist(@Param('step') step: JornadaStep) {
    return this.jornadaService.getChecklist(step);
  }

  // 🔹 Iniciar etapa
  @Post('steps/:step/start')
  startStep(@Param('step') step: JornadaStep) {
    this.jornadaService.startStep(step);
    return { message: 'Etapa iniciada' };
  }

  // 🔹 Marcar/desmarcar item
  @Patch('steps/:step/checklist/:itemId')
  toggleItem(
    @Param('step') step: JornadaStep,
    @Param('itemId') itemId: string,
  ) {
    this.jornadaService.toggleItem(step, itemId);
    return { message: 'Item atualizado' };
  }

  // 🔹 Concluir etapa
  @Post('steps/:step/complete')
  completeStep(@Param('step') step: JornadaStep) {
    this.jornadaService.completeStep(step);
    return { message: 'Etapa concluída' };
  }
}
