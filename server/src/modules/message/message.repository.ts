import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Mensagem } from '@prisma/client';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto): Promise<Mensagem> {
    return this.prisma.mensagem.create({
      data: {
        conteudo: dto.conteudo,
      },
    });
  }

  async findAll(): Promise<Mensagem[]> {
    return this.prisma.mensagem.findMany({
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }
}
