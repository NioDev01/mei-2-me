import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { Mensagem } from '@prisma/client'; // ou o caminho correto para o modelo Message

@Controller('mensagens')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() dto: CreateMessageDto): Promise<Mensagem> {
    return this.messageService.create(dto);
  }

  @Get()
  findAll(): Promise<Mensagem[]> {
    return this.messageService.findAll();
  }
}
