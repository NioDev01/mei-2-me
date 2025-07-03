import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReceitawsApiService } from './integrations/receitaws-api/receitaws-api.service';
import { DiagnosticoInicialModule } from './modules/diagnostico-inicial/diagnostico-inicial.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, MessageModule, DiagnosticoInicialModule, HttpModule],
  providers: [ReceitawsApiService],
})
export class AppModule {}
