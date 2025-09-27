import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DiagnosticoInicialService } from './diagnostico-inicial.service';
import { CreateDiagnosticoInicialDto } from './dto/create-diagnostico-inicial.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('diagnostico-inicial')
@ApiTags('Diagnóstico Inicial')
export class DiagnosticoInicialController {
  constructor(
    private readonly diagnosticoInicialService: DiagnosticoInicialService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Cria diagnóstico inicial.',
    description:
      'Endpoint responsável por criar o diagnóstico inicial do usuário.',
  })
  @ApiResponse({
    status: 201,
    description: 'Diagnóstico inicial criado com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar criar o diagnóstico inicial.',
  })
  create(@Body() createDiagnosticoInicialDto: CreateDiagnosticoInicialDto) {
    return this.diagnosticoInicialService.create(createDiagnosticoInicialDto);
  }

  @Get(':cnpj')
  @ApiOperation({
    summary: 'Retorna diagnóstico inicial do usuário.',
    description:
      'Endpoint reponsável por retornar os dados do diagnóstico inicial feito pelo usuário.',
  })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso!' })
  @ApiResponse({
    status: 400,
    description: 'Erro ao tentar retornar os dados do diagnóstico.',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao tentar encontrar o diagnóstico.',
  })
  async findOne(@Param('cnpj') cnpj: string) {
    const data = await this.diagnosticoInicialService.findOne(cnpj);

    return data;
  }
}
