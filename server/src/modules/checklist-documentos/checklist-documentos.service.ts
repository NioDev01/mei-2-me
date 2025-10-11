import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDocumentoDto } from './dto/create-checklist-documento.dto';
import { UpdateChecklistDocumentoDto } from './dto/update-checklist-documento.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChecklistDocumentosService {
  constructor(private prisma: PrismaService) {}

  // Cria dados de checklist do usuário
  async create(createChecklistDocumentoDto: CreateChecklistDocumentoDto) {
    return await this.prisma.documentosMei.create({
      data: {
        ...createChecklistDocumentoDto,
        atualizado_em: new Date(),
      },
    });
  }

  // Atualiza dados do usuário
  async update(
    id: number,
    updateChecklistDocumentoDto: UpdateChecklistDocumentoDto,
  ) {
    try {
      const meiDocumentos = await this.prisma.documentosMei.update({
        where: { id_mei: id },
        data: {
          ...updateChecklistDocumentoDto,
          atualizado_em: new Date(),
        },
      });

      return meiDocumentos;
    } catch {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
  }

  // Busca dados do usuário
  async findOne(id: number) {
    const meiDocumentos = await this.prisma.documentosMei.findUnique({
      where: { id_mei: id },
    });

    if (!meiDocumentos) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return meiDocumentos;
  }
}
