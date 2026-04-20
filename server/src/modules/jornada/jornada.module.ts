import { Module } from '@nestjs/common';
import { JornadaService } from './jornada.service';
import { JornadaController } from './jornada.controller';

@Module({
  providers: [JornadaService],
  controllers: [JornadaController],
  exports: [JornadaService],
})
export class JornadaModule {}
