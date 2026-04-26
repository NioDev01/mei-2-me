import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DiagnosticoInicialService } from '@/modules/diagnostico-inicial/diagnostico-inicial.service';
import { CreateDiagnosticoInicialDto } from '@/modules/diagnostico-inicial/dto/create-diagnostico-inicial.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('diagnostico-inicial')
@ApiTags('Diagnóstico Inicial')
@UseGuards(JwtAuthGuard)
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
  create(
    @Body() createDiagnosticoInicialDto: CreateDiagnosticoInicialDto,
    @Request() req,
  ) {
    return this.diagnosticoInicialService.create(
      createDiagnosticoInicialDto,
      req.user,
    );
  }

  @Get('cnpj/:cnpj')
  @ApiOperation({
    summary: 'Consulta dados de CNPJ.',
    description:
      'Endpoint responsável por consultar e retornar os dados de um CNPJ informado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do CNPJ retornados com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao tentar consultar os dados do CNPJ.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum dado encontrado para o CNPJ informado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao consultar os dados do CNPJ.',
  })
  async findCnpjData(@Param('cnpj') cnpj: string) {
    return this.diagnosticoInicialService.findCnpjData(cnpj);
  }

  @Get(':cnpj')
  @ApiOperation({
    summary: 'Retorna diagnóstico inicial do usuário.',
    description:
      'Endpoint responsável por retornar os dados do diagnóstico inicial feito pelo usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados retornados com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao tentar retornar os dados do diagnóstico.',
  })
  async findOne(@Param('cnpj') cnpj: string, @Request() req) {
    const userId = req.user.id_user;

    return this.diagnosticoInicialService.findOne(cnpj, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna o diagnóstico inicial por usuário.',
    description:
      'Endpoint responsável por criar o diagnóstico inicial do usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Diagnóstico inicial retornado com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar retornar o diagnóstico inicial.',
  })
  async findByUser(@Request() req) {
    return this.diagnosticoInicialService.findByUser(req.user.id_user);
  }
}
