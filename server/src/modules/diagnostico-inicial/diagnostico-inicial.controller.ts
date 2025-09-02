import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiagnosticoInicialService } from './diagnostico-inicial.service';
import { CreateDiagnosticoInicialDto } from './dto/create-diagnostico-inicial.dto';
import { UpdateDiagnosticoInicialDto } from './dto/update-diagnostico-inicial.dto';

@Controller('diagnostico-inicial')
export class DiagnosticoInicialController {
  constructor(
    private readonly diagnosticoInicialService: DiagnosticoInicialService,
  ) {}

  @Post()
  create(@Body() createDiagnosticoInicialDto: CreateDiagnosticoInicialDto) {
    return this.diagnosticoInicialService.create(createDiagnosticoInicialDto);
  }

  @Get(':cnpj')
  async findOne(@Param('cnpj') cnpj: string) {
    const data = await this.diagnosticoInicialService.findOne(cnpj);

    return data;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiagnosticoInicialDto: UpdateDiagnosticoInicialDto,
  ) {
    return this.diagnosticoInicialService.update(
      +id,
      updateDiagnosticoInicialDto,
    );
  }
}
