import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseEnumPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JornadaService } from './jornada.service';
import { JornadaStep } from './enums/jornada-step.enum';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('jornada')
export class JornadaController {
  constructor(private readonly jornadaService: JornadaService) {}

  getMeiId(req: any): number {
    return req.user.id_mei;
  }

  @Get('summary')
  async getSummary(@Req() req: any) {
    const id_mei = this.getMeiId(req);
    return this.jornadaService.getSummary(id_mei);
  }

  // 🔹 Status de todas as etapas
  @Get('steps')
  async getSteps(@Req() req: any) {
    const id_mei = this.getMeiId(req);
    return this.jornadaService.getStepsWithStatus(id_mei);
  }

  // 🔹 Checklist de uma etapa
  @Get('steps/:step/checklist')
  async getChecklist(
    @Req() req: any,
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
  ) {
    const id_mei = this.getMeiId(req);
    return this.jornadaService.getChecklist(id_mei, step);
  }

  // 🔹 Iniciar etapa
  @Post('steps/:step/start')
  async startStep(
    @Req() req: any,
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
  ) {
    const id_mei = this.getMeiId(req);
    await this.jornadaService.startStep(id_mei, step);

    return { message: 'Etapa iniciada' };
  }

  // 🔹 Marcar/desmarcar item
  @Patch('steps/:step/checklist/:itemId')
  async toggleItem(
    @Req() req: any,
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
    @Param('itemId') itemId: string,
  ) {
    const id_mei = this.getMeiId(req);
    await this.jornadaService.toggleItem(id_mei, step, itemId);

    return { message: 'Item atualizado' };
  }

  // 🔹 Concluir etapa
  @Post('steps/:step/complete')
  async completeStep(
    @Req() req: any,
    @Param('step', new ParseEnumPipe(JornadaStep)) step: JornadaStep,
  ) {
    const id_mei = this.getMeiId(req);
    await this.jornadaService.completeStep(id_mei, step);

    return { message: 'Etapa concluída' };
  }
}
