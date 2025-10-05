import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SimuladorRegimesService } from './simulador-regimes.service';
import { CreateSimuladorRegimeDto } from './dto/create-simulador-regime.dto';
import { UpdateSimuladorRegimeDto } from './dto/update-simulador-regime.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('simulador-regimes')
@ApiTags('SimuladorRegimes')
export class SimuladorRegimesController {
  constructor(
    private readonly simuladorRegimesService: SimuladorRegimesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Cria ou atualiza um registro de simulação.',
    description:
      'Cria um novo registro de simulação com base nos dados fornecidos. Se um registro para o MEI especificado já existir, ele será atualizado com os novos dados.',
  })
  create(@Body() createSimuladorRegimeDto: CreateSimuladorRegimeDto) {
    return this.simuladorRegimesService.create(createSimuladorRegimeDto);
  }

  // @Get()
  // findAll() {
  //   return this.simuladorRegimesService.findAll();
  // }

  @Get(':id_mei')
  @ApiOperation({
    summary: 'Obtém os detalhes de uma simulação específica.',
    description:
      'Recupera os detalhes de uma simulação com base no ID do MEI fornecido.',
  })
  findOne(@Param('id_mei') id: string) {
    return this.simuladorRegimesService.findOne(+id);
  }

  // @Patch(':id_mei')
  // update(
  //   @Param('id_mei') id: string,
  //   @Body() updateSimuladorRegimeDto: UpdateSimuladorRegimeDto,
  // ) {
  //   return this.simuladorRegimesService.update(+id, updateSimuladorRegimeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.simuladorRegimesService.remove(+id);
  // }
}
