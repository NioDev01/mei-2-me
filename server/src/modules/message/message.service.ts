import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/db/entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const novaMensagem = this.messageRepository.create({
      conteudo: dto.conteudo,
    });
    return await this.messageRepository.save(novaMensagem);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      order: { criadoEm: 'DESC' }, // Ordena por data de criação, do mais recente para o mais antigo
    });
  }
}
