import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { AnaliseMigracaoUseCase } from '@/modules/analise-migracao/analise-migracao.usecase';

@Controller('analise-migracao')
@ApiTags('Análise de Migração')
export class AnaliseMigracaoController {
  constructor(private readonly useCase: AnaliseMigracaoUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get(':cnpj')
  @ApiOperation({
    summary: 'Retorna o resultado da análise do usuário.',
    description:
      'Endpoint responsável por retornar o resultado da análise de migração do usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados retornados com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar retornar os dados da análise.',
  })
  @ApiResponse({
    status: 404,
    description: 'Os dados da análise de migração não foram encontrados.',
  })
  async findResult(@Param('cnpj') cnpj: string, @Req() req) {
    return this.useCase.execute(cnpj, req.user.id_user);
  }
}
