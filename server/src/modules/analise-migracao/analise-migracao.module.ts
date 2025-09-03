import { Module } from '@nestjs/common';
import { AnaliseMigracaoService } from './analise-migracao.service';
import { AnaliseMigracaoController } from './analise-migracao.controller';

@Module({
  controllers: [AnaliseMigracaoController],
  providers: [AnaliseMigracaoService],
  exports: [AnaliseMigracaoService],
})
export class AnaliseMigracaoModule {}
