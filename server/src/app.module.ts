import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReceitawsApiService } from './integrations/receitaws-api/receitaws-api.service';
import { HttpModule } from '@nestjs/axios';
import { AnaliseMigracaoModule } from './modules/analise-migracao/analise-migracao.module';
import { DiagnosticoInicialModule } from './modules/diagnostico-inicial/diagnostico-inicial.module';
import { MeiModule } from './modules/mei/mei.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CnaeModule } from './modules/cnae/cnae.module';

@Module({
  imports: [
    PrismaModule,
    MessageModule,
    HttpModule,
    AnaliseMigracaoModule,
    DiagnosticoInicialModule,
    MeiModule, 
    UsuarioModule, 
    CnaeModule,
  ],
  providers: [ReceitawsApiService],
})
export class AppModule {}
