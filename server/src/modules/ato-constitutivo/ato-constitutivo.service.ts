import { Injectable } from '@nestjs/common';
import { Document, Packer } from 'docx';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GenerateEIDto } from './dto/generate-ei.dto';
import { GenerateLtdaDto } from './dto/generate-ltda.dto';
import { NaturezaJuridica } from './enums/natureza-juridica.enums';
import { GenerateAtoDto } from './dto/generate-ato.dto';
import { buildEIDocument } from './builders/ei.builder';
import { buildLtdaDocument } from './builders/ltda.builder';
import { GenerateFromMeiDto } from './dto/generate-from-mei.dto';

@Injectable()
export class AtoConstitutivoService {
  constructor(private readonly prisma: PrismaService) {}

  private mapMeiToAto(mei: any, payload: GenerateFromMeiDto): GenerateAtoDto {
    const endereco = `${mei.municipio_mei}/${mei.uf_mei}`;

    const atividade =
      Array.isArray(mei.cnae_principal) && mei.cnae_principal.length > 0
        ? mei.cnae_principal[0].text
        : 'Atividade não informada';

    if (payload.naturezaJuridica === 'EI') {
      return {
        naturezaJuridica: payload.naturezaJuridica,
        eiData: {
          nomeEmpresarial: mei.razao_social,
          cnpj: mei.cnpj_mei,
          endereco,
          atividade,
          capitalSocial: payload.eiData?.capitalSocial ?? 0,
        },
      };
    }

    return {
      naturezaJuridica: payload.naturezaJuridica,
      ltdaData: {
        cnpj: mei.cnpj_mei,
        nomeEmpresarial: mei.razao_social,
        endereco,
        atividade,
        capitalSocial: payload.ltdaData?.capitalSocial ?? 0,
        titular: payload.ltdaData!.titular,
        socios: payload.ltdaData?.socios ?? [],
      },
    };
  }

  async generateFromMei(
    id_mei: number,
    payload: GenerateFromMeiDto,
  ): Promise<Buffer> {
    const mei = await this.prisma.mei.findUnique({
      where: { id_mei },
    });

    if (!mei) {
      throw new BadRequestException('MEI não encontrado');
    }

    return this.generateAto(this.mapMeiToAto(mei, payload));
  }

  async generateAto(data: GenerateAtoDto): Promise<Buffer> {
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
          data.ltdaData?.socios?.length > 0
        ) {
          throw new BadRequestException('SLU não pode ter sócios adicionais');
        }
        return this.generateBuffer(buildLtdaDocument(data.ltdaData));

      default:
        throw new BadRequestException('Natureza jurídica inválida');
    }
  }

  async generateEI(data: GenerateEIDto): Promise<Buffer> {
    const doc = buildEIDocument(data);
    return await this.generateBuffer(doc);
  }

  async generateLTDA(data: GenerateLtdaDto): Promise<Buffer> {
    const doc = buildLtdaDocument(data);
    return this.generateBuffer(doc);
  }

  // ===============================
  // BUFFER
  // ===============================

  private async generateBuffer(doc: Document): Promise<Buffer> {
    return await Packer.toBuffer(doc);
  }
}
