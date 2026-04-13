import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReceitawsApiService } from './integrations/receitaws-api/receitaws-api.service';
import { HttpModule } from '@nestjs/axios';
import { AnaliseMigracaoModule } from './modules/analise-migracao/analise-migracao.module';
import { DiagnosticoInicialModule } from './modules/diagnostico-inicial/diagnostico-inicial.module';
import { AuthModule } from './modules/auth/auth.module';
import { SimuladorRegimesModule } from './modules/simulador-regimes/simulador-regimes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MessageModule,
    HttpModule,
    AnaliseMigracaoModule,
    DiagnosticoInicialModule,
    AuthModule,
    SimuladorRegimesModule,
  ],
  providers: [ReceitawsApiService],
})
export class AppModule {}
