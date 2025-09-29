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
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';

@Controller('diagnostico-inicial')
export class DiagnosticoInicialController {
  constructor(
    private readonly diagnosticoInicialService: DiagnosticoInicialService,
    private receitawsAPIService: ReceitawsApiService,
  ) {}

  @Post()
  create(@Body() createDiagnosticoInicialDto: CreateDiagnosticoInicialDto) {
    return this.diagnosticoInicialService.create(createDiagnosticoInicialDto);
  }

  @Get(':cnpj')
  async findOne(@Param('cnpj') cnpj: string) {
    const data = await this.receitawsAPIService.findOne(cnpj);

    return data;
  }
}
