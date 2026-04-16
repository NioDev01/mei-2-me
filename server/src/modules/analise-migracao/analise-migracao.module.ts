import { Module } from '@nestjs/common';
import { AnaliseMigracaoService } from '@/modules/analise-migracao/analise-migracao.service';
import { AnaliseMigracaoController } from '@/modules/analise-migracao/analise-migracao.controller';
import { AnaliseMigracaoUseCase } from '@/modules/analise-migracao/analise-migracao.usecase';

@Module({
  controllers: [AnaliseMigracaoController],
  providers: [AnaliseMigracaoService, AnaliseMigracaoUseCase],
  exports: [AnaliseMigracaoUseCase],
})
export class AnaliseMigracaoModule {}
