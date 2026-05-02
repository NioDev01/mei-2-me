import { Module } from '@nestjs/common';
import { AtoConstitutivoService } from './ato-constitutivo.service';
import { AtoConstitutivoController } from './ato-constitutivo.controller';

@Module({
  controllers: [AtoConstitutivoController],
  providers: [AtoConstitutivoService],
})
export class AtoConstitutivoModule {}
