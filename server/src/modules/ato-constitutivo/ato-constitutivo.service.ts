import { Injectable, BadRequestException } from '@nestjs/common';
import { Document, Packer } from 'docx';
import { PrismaService } from '@prisma/prisma.service';

import { NaturezaJuridica } from './enums/natureza-juridica.enums';

import { GenerateAtoDto } from './dto/generate-ato.dto';
import { GenerateFromMeiDto } from './dto/generate-from-mei.dto';

import { buildEIDocument } from './builders/ei.builder';
import { buildLtdaDocument } from './builders/ltda.builder';
import { EmpresaTransicaoResponseDto } from './dto/empresa-transicao-response.dto';

@Injectable()
export class AtoConstitutivoService {
  constructor(private readonly prisma: PrismaService) {}

  // ===============================
  // VALIDAÇÕES
  // ===============================

  private validateBusinessRules(payload: GenerateFromMeiDto) {
    if (!payload.naturezaJuridica) return;

    if (
      payload.naturezaJuridica === NaturezaJuridica.LTDA &&
      (payload.ltdaData?.socios?.length ?? 0) === 0
    ) {
      throw new BadRequestException('LTDA deve possuir pelo menos um sócio');
    }

    if (
      payload.naturezaJuridica === NaturezaJuridica.SLU &&
      (payload.ltdaData?.socios?.length ?? 0) > 0
    ) {
      throw new BadRequestException('SLU não pode ter sócios adicionais');
    }
  }

  // ===============================
  // GERAÇÃO A PARTIR DA TRANSIÇÃO
  // ===============================

  async generateFromTransicao(id_mei: number): Promise<Buffer> {
    const mei = await this.prisma.mei.findUnique({
      where: { id_mei },
    });

    const transicao = await this.prisma.empresaTransicao.findUnique({
      where: { id_mei },
    });

    if (!mei || !transicao) {
      throw new BadRequestException(
        'Dados da nova empresa ainda não definidos',
      );
    }

    return this.generateAto(this.mapTransicaoToAto(mei, transicao));
  }

  // ===============================
  // MAPPERS
  // ===============================

  private mapTransicaoToAto(mei: any, transicao: any): GenerateAtoDto {
    const endereco = `${mei.municipio_mei}/${mei.uf_mei}`;

    const atividade =
      Array.isArray(mei.cnae_principal) && mei.cnae_principal.length > 0
        ? mei.cnae_principal[0].text
        : 'Atividade não informada';

    if (
      transicao.natureza_juridica === NaturezaJuridica.SLU &&
      transicao.socios?.length > 0
    ) {
      throw new BadRequestException(
        'Dados inconsistentes: SLU não pode ter sócios',
      );
    }

    if (transicao.natureza_juridica === NaturezaJuridica.EI) {
      return {
        naturezaJuridica: NaturezaJuridica.EI,
        eiData: {
          nomeEmpresarial: mei.razao_social,
          cnpj: mei.cnpj_mei,
          endereco,
          atividade,
          capitalSocial: Number(transicao.capital_social),
        },
      };
    }

    return {
      naturezaJuridica: transicao.natureza_juridica,
      ltdaData: {
        cnpj: mei.cnpj_mei,
        nomeEmpresarial: mei.razao_social,
        endereco,
        atividade,
        capitalSocial: Number(transicao.capital_social),
        titular: {
          nome: transicao.titular_nome,
          cpf: transicao.titular_cpf,
        },
        socios: (transicao.socios as any[]) ?? [],
      },
    };
  }

  // ===============================
  // CORE
  // ===============================

  private async generateAto(data: GenerateAtoDto): Promise<Buffer> {
    switch (data.naturezaJuridica) {
      case NaturezaJuridica.EI:
        if (!data.eiData) {
          throw new BadRequestException('Dados de EI não fornecidos');
        }
        return this.generateBuffer(buildEIDocument(data.eiData));

      case NaturezaJuridica.LTDA:
      case NaturezaJuridica.SLU:
        if (!data.ltdaData) {
          throw new BadRequestException('Dados de LTDA/SLU não fornecidos');
        }

        if (
          data.naturezaJuridica === NaturezaJuridica.SLU &&
          data.ltdaData.socios.length > 0
        ) {
          throw new BadRequestException('SLU não pode ter sócios adicionais');
        }

        return this.generateBuffer(buildLtdaDocument(data.ltdaData));

      default:
        throw new BadRequestException('Natureza jurídica inválida');
    }
  }

  private async generateBuffer(doc: Document): Promise<Buffer> {
    return await Packer.toBuffer(doc);
  }

  // ===============================
  // PERSISTÊNCIA
  // ===============================

  async saveEmpresaTransicao(id_mei: number, payload: GenerateFromMeiDto) {
    if (!payload.naturezaJuridica) {
      throw new BadRequestException(
        'Natureza jurídica é obrigatória para salvar a transição',
      );
    }

    this.validateBusinessRules(payload);

    const socios =
      payload.ltdaData?.socios?.map((s) => ({
        nome: s.nome,
        cpf: s.cpf,
      })) ?? [];

    return this.prisma.empresaTransicao.upsert({
      where: { id_mei },
      update: {
        natureza_juridica: payload.naturezaJuridica,
        capital_social:
          payload.ltdaData?.capitalSocial ?? payload.eiData?.capitalSocial ?? 0,
        titular_nome: payload.ltdaData?.titular.nome ?? '',
        titular_cpf: payload.ltdaData?.titular.cpf ?? '',
        socios,
      },
      create: {
        id_mei,
        natureza_juridica: payload.naturezaJuridica,
        capital_social:
          payload.ltdaData?.capitalSocial ?? payload.eiData?.capitalSocial ?? 0,
        titular_nome: payload.ltdaData?.titular.nome ?? '',
        titular_cpf: payload.ltdaData?.titular.cpf ?? '',
        socios,
      },
    });
  }

  // ===============================
  // CONSULTA TRANSIÇÃO
  // ===============================

  async getEmpresaTransicao(
    id_mei: number,
  ): Promise<EmpresaTransicaoResponseDto> {
    const transicao = await this.prisma.empresaTransicao.findUnique({
      where: { id_mei },
    });

    if (!transicao) {
      throw new BadRequestException(
        'Dados da nova empresa ainda não definidos',
      );
    }

    if (transicao.natureza_juridica === NaturezaJuridica.EI) {
      return {
        naturezaJuridica: NaturezaJuridica.EI,
        eiData: {
          capitalSocial: Number(transicao.capital_social),
        },
      };
    }

    const natureza = transicao.natureza_juridica as NaturezaJuridica;

    if (!Object.values(NaturezaJuridica).includes(natureza)) {
      throw new BadRequestException('Natureza jurídica inválida no banco');
    }

    return {
      naturezaJuridica: natureza,
      ltdaData: {
        capitalSocial: Number(transicao.capital_social),
        titular: {
          nome: transicao.titular_nome,
          cpf: transicao.titular_cpf,
        },
        socios: (transicao.socios as any[]) ?? [],
      },
    };
  }
}
