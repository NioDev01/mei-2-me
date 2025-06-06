import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // ajuste o caminho se precisar
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository'; // se tiver repositório customizado

@Module({
  imports: [], // não precisa do TypeOrmModule aqui
  controllers: [MessageController],
  providers: [MessageService, PrismaService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
