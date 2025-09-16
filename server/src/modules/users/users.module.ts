import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, ReceitawsApiService],
  exports: [UsersService],
})
export class UsersModule {}
