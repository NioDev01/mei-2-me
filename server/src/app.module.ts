import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReceitawsApiService } from './integrations/receitaws-api/receitaws-api.service';
import { HttpModule } from '@nestjs/axios';
import { AnaliseMigracaoModule } from './modules/analise-migracao/analise-migracao.module';
import { DiagnosticoInicialModule } from './modules/diagnostico-inicial/diagnostico-inicial.module';

@Module({
  imports: [
    PrismaModule,
    MessageModule,
    HttpModule,
    AnaliseMigracaoModule,
    DiagnosticoInicialModule,
  ],
  providers: [ReceitawsApiService],
})
export class AppModule {}
