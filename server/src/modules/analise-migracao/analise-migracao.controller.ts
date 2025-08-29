import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AnaliseMigracaoService } from './analise-migracao.service';

@Controller('analise-migracao')
export class AnaliseMigracaoController {
  constructor(private readonly analiseService: AnaliseMigracaoService) {}

  @Get(':cnpj')
  async findResult(@Param('cnpj') cnpj: string) {
    try {
      const analise = await this.analiseService.analisarMigracao(cnpj);
      return analise;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Erro ao buscar análise de migracão');
    }
  }
}
