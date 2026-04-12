import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SimuladorRegimesService } from './simulador-regimes.service';
import { CreateSimuladorRegimeDto } from './dto/create-simulador-regime.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('simulador-regimes')
@ApiTags('SimuladorRegimes')
export class SimuladorRegimesController {
  constructor(
    private readonly simuladorRegimesService: SimuladorRegimesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Calcula e salva uma simulação de regime tributário',
  })
  calcular(@Body() dto: CreateSimuladorRegimeDto) {
    return this.simuladorRegimesService.create(dto);
  }

  @Get(':id_mei')
  @ApiOperation({
    summary: 'Obtém simulação pelo ID do MEI',
  })
  findOne(@Param('id_mei', ParseIntPipe) id_mei: number) {
    return this.simuladorRegimesService.findOne(id_mei);
  }
}
