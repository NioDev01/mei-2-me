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
    console.log(`Dados validados com sucesso!`, createDiagnosticoInicialDto);

    return this.diagnosticoInicialService.create(createDiagnosticoInicialDto);
  }

  @Get()
  findAll() {
    return this.diagnosticoInicialService.findAll();
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticoInicialService.remove(+id);
  }
}
