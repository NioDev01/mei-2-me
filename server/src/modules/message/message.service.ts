import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  private mensagens: string[] = []; // temporário, simula um banco de dados

  create(dto: CreateMessageDto) {
    this.mensagens.push(dto.conteudo);
    return { conteudo: dto.conteudo };
  }

  findAll() {
    return this.mensagens;
  }
}
