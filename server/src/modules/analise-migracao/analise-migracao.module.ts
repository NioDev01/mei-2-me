import { Module } from '@nestjs/common';
import { AnaliseMigracaoService } from './analise-migracao.service';

@Module({
  providers: [AnaliseMigracaoService]
})
export class AnaliseMigracaoModule {}
