import { Injectable } from '@nestjs/common';
import { CreateChecklistDocumentoDto } from '@/modules/checklist-documentos/dto/create-checklist-documento.dto';
import { PrismaService } from '@prisma/prisma.service';
import { ChecklistDocumentoResponseDto } from '@/modules/checklist-documentos/dto/checklist-documento-response.dto';

@Injectable()
export class ChecklistDocumentosService {
  constructor(private prisma: PrismaService) {}

  // Cria dados de checklist do usuário
  async create(
    id_mei: number,
    createChecklistDocumentoDto: CreateChecklistDocumentoDto,
  ): Promise<ChecklistDocumentoResponseDto> {
    return await this.prisma.documentosMei.upsert({
      where: { id_mei },
      update: {
        ...createChecklistDocumentoDto,
      },
      create: {
        id_mei,
        ...createChecklistDocumentoDto,
      },
      select: {
        possui_rg: true,
        possui_cpf: true,
        possui_comprovante_residencia: true,
        possui_cartao_cnpj: true,
        comunicacao_desenquadramento_simei: true,
        formulario_capa_marrom: true,
        requerimento_desenquadramento: true,
        comprovante_pagamento_dare: true,
        contrato_social: true,
        possui_ccmei: true,
        possui_cadesp: true,
        comprovante_situacao_simples_nacional: true,
      },
    });
  }

  // Busca dados do usuário
  async findOne(id_mei: number): Promise<ChecklistDocumentoResponseDto> {
    const data = await this.prisma.documentosMei.findUnique({
      where: { id_mei },
      select: {
        possui_rg: true,
        possui_cpf: true,
        possui_comprovante_residencia: true,
        possui_cartao_cnpj: true,
        comunicacao_desenquadramento_simei: true,
        formulario_capa_marrom: true,
        requerimento_desenquadramento: true,
        comprovante_pagamento_dare: true,
        contrato_social: true,
        possui_ccmei: true,
        possui_cadesp: true,
        comprovante_situacao_simples_nacional: true,
      },
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
