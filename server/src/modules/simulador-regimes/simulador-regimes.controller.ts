import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SimuladorRegimesService } from './simulador-regimes.service';
import { CreateSimuladorRegimeDto } from './dto/create-simulador-regime.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('simulador-regimes')
@ApiTags('SimuladorRegimes')
@UseGuards(JwtAuthGuard) // protege todas as rotas
export class SimuladorRegimesController {
  constructor(
    private readonly simuladorRegimesService: SimuladorRegimesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Calcula e salva uma simulação de regime tributário',
  })
  @Post()
  calcular(@Request() req, @Body() dto: CreateSimuladorRegimeDto) {
    const id_mei = req.user.id_mei;

    return this.simuladorRegimesService.create(dto, id_mei);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtém simulação do usuário autenticado',
  })
  findOne(@Request() req) {
    const id_mei = req.user.id_mei;

    return this.simuladorRegimesService.findOne(id_mei);
  }
}
