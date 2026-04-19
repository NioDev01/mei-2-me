import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDocumentoDto } from './dto/create-checklist-documento.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChecklistDocumentosService {
  constructor(private prisma: PrismaService) {}

  // Cria dados de checklist do usuário
  async create(
    id_mei: number,
    createChecklistDocumentoDto: CreateChecklistDocumentoDto,
  ) {
    return await this.prisma.documentosMei.upsert({
      where: { id_mei },
      update: {
        ...createChecklistDocumentoDto,
      },
      create: {
        id_mei,
        ...createChecklistDocumentoDto,
      },
    });
  }

  // Busca dados do usuário
  async findOne(id_mei: number) {
    const data = await this.prisma.documentosMei.findUnique({
      where: { id_mei },
    });

    if (!data) {
      return {
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

    return data;
  }
}
