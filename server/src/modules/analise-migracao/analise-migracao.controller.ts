import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AnaliseMigracaoService } from './analise-migracao.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('analise-migracao')
@ApiTags('Análise de Migração')
export class AnaliseMigracaoController {
  constructor(private readonly analiseService: AnaliseMigracaoService) {}

  @Get(':cnpj')
  @ApiOperation({
    summary: 'Retorna resultado da análise.',
    description:
      'Endpoint reponsável por retornar o resultado da análise de migração.',
  })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso!' })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar retornar a análise.',
  })
  @ApiResponse({
    status: 404,
    description: 'Resultado da análise não foi encontrado.',
  })
  async findResult(@Param('cnpj') cnpj: string) {
    try {
      const analise = await this.analiseService.analisarMigracao(cnpj);
      return analise;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Erro ao buscar análise de migração');
    }
  }
}
