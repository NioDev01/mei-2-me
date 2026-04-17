import { Module } from '@nestjs/common';
import { DiagnosticoInicialService } from '@/modules/diagnostico-inicial/diagnostico-inicial.service';
import { DiagnosticoInicialController } from '@/modules/diagnostico-inicial/diagnostico-inicial.controller';
import { HttpModule } from '@nestjs/axios';
import { ReceitawsApiService } from '@/integrations/receitaws-api/receitaws-api.service';
import { AnaliseMigracaoModule } from '@/modules/analise-migracao/analise-migracao.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [HttpModule, AnaliseMigracaoModule, AuthModule],
  controllers: [DiagnosticoInicialController],
  providers: [DiagnosticoInicialService, ReceitawsApiService],
})
export class DiagnosticoInicialModule {}
