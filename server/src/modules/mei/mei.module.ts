import { Module } from '@nestjs/common';
import { MeiController } from './mei.controller';
import { MeiService } from './mei.service';

@Module({
  controllers: [MeiController],
  providers: [MeiService],
  exports: [MeiService],
})
export class MeiModule {}