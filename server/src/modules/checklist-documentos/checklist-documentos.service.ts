import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDocumentoDto } from './dto/create-checklist-documento.dto';
import { UpdateChecklistDocumentoDto } from './dto/update-checklist-documento.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChecklistDocumentosService {
  constructor(private prisma: PrismaService) {}

  // Cria dados de checklist do usuário
  async create(createChecklistDocumentoDto: CreateChecklistDocumentoDto) {
    return await this.prisma.documentosMei.upsert({
      where: { id_mei: createChecklistDocumentoDto.id_mei },
      create: {
        ...createChecklistDocumentoDto,
      },
      update: { ...createChecklistDocumentoDto },
    });
  }

  // Busca dados do usuário
  async findOne(id: number) {
    const meiDocumentos = await this.prisma.documentosMei.findUnique({
      where: { id_mei: id },
    });

    if (!meiDocumentos) {
      return {
        id_mei: id,
        possui_rg: false,
        possui_cpf: false,
        possui_comprovante_residencia: false,
        possui_cartao_cnpj: false,
        comunicacao_desenquadramento_simei: false,
        formulario_capa_marrom: false,
        requerimento_desenquadramento: false,
        comprovante_pagamento_dare: false,
        contrato_social: false,
        possui_ccmei: false,
        possui_cadesp: false,
        comprovante_situacao_simples_nacional: false,
      };
    }

    return meiDocumentos;
  }
}
