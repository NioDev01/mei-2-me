import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { Mensagem } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(dto: CreateMessageDto): Promise<Mensagem> {
    return this.messageRepository.create(dto);
  }

  async findAll(): Promise<Mensagem[]> {
    return this.messageRepository.findAll();
  }
}
