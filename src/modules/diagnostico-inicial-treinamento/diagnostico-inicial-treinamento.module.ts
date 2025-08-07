import { Module } from '@nestjs/common';
import { DiagnosticoInicialTreinamentoService } from './diagnostico-inicial-treinamento.service';
import { DiagnosticoInicialTreinamentoController } from './diagnostico-inicial-treinamento.controller';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DiagnosticoInicialTreinamentoController],
  providers: [DiagnosticoInicialTreinamentoService, ReceitawsApiService],
})
export class DiagnosticoInicialTreinamentoModule {}
