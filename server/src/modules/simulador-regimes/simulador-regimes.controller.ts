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

@Controller('simulador-regimes')
export class SimuladorRegimesController {
  constructor(
    private readonly simuladorRegimesService: SimuladorRegimesService,
  ) {}

  @Post()
  create(@Body() createSimuladorRegimeDto: CreateSimuladorRegimeDto) {
    return this.simuladorRegimesService.create(createSimuladorRegimeDto);
  }

  @Get()
  findAll() {
    return this.simuladorRegimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simuladorRegimesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSimuladorRegimeDto: UpdateSimuladorRegimeDto,
  ) {
    return this.simuladorRegimesService.update(+id, updateSimuladorRegimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simuladorRegimesService.remove(+id);
  }
}
