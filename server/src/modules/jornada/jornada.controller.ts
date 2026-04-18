import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseEnumPipe,
} from '@nestjs/common';
import { JornadaService } from './jornada.service';
import { JornadaStep } from './enums/jornada-step.enum';

@Controller('jornada')
export class JornadaController {
  constructor(private readonly jornadaService: JornadaService) {}

  // 🔸 TEMP: mock de usuário
  private getMeiId(): number {
    return 1;
  }

  // 🔹 Status de todas as etapas
  @Get('steps')
  async getSteps() {
    const id_mei = this.getMeiId();
    return this.jornadaService.getStepsWithStatus(id_mei);
  }

  // 🔹 Checklist de uma etapa
  @Get('steps/:step/checklist')
  async getChecklist(
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
  ) {
    const id_mei = this.getMeiId();
    return this.jornadaService.getChecklist(id_mei, step);
  }

  // 🔹 Iniciar etapa
  @Post('steps/:step/start')
  async startStep(
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
  ) {
    const id_mei = this.getMeiId();
    await this.jornadaService.startStep(id_mei, step);

    return { message: 'Etapa iniciada' };
  }

  // 🔹 Marcar/desmarcar item
  @Patch('steps/:step/checklist/:itemId')
  async toggleItem(
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
    @Param('itemId') itemId: string,
  ) {
    const id_mei = this.getMeiId();
    await this.jornadaService.toggleItem(id_mei, step, itemId);

    return { message: 'Item atualizado' };
  }

  // 🔹 Concluir etapa
  @Post('steps/:step/complete')
  async completeStep(
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
  ) {
    const id_mei = this.getMeiId();
    await this.jornadaService.completeStep(id_mei, step);

    return { message: 'Etapa concluída' };
  }
}
