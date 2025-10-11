import { Module } from '@nestjs/common';
import { SimuladorRegimesService } from './simulador-regimes.service';
import { SimuladorRegimesController } from './simulador-regimes.controller';

@Module({
  controllers: [SimuladorRegimesController],
  providers: [SimuladorRegimesService],
})
export class SimuladorRegimesModule {}
