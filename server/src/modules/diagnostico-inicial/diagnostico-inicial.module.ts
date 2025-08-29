import { Module } from '@nestjs/common';
import { DiagnosticoInicialService } from './diagnostico-inicial.service';
import { DiagnosticoInicialController } from './diagnostico-inicial.controller';
import { HttpModule } from '@nestjs/axios';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';
import { AnaliseMigracaoModule } from '../analise-migracao/analise-migracao.module';

@Module({
  imports: [HttpModule, AnaliseMigracaoModule],
  controllers: [DiagnosticoInicialController],
  providers: [DiagnosticoInicialService, ReceitawsApiService],
})
export class DiagnosticoInicialModule {}
