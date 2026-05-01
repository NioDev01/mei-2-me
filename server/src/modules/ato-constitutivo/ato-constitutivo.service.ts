import { Injectable } from '@nestjs/common';
import { Document, Packer } from 'docx';
import { BadRequestException } from '@nestjs/common';
import { GenerateEIDto } from './dto/generate-ei.dto';
import { GenerateLtdaDto } from './dto/generate-ltda.dto';
import { NaturezaJuridica } from './enums/natureza-juridica.enums';
import { GenerateAtoDto } from './dto/generate-ato.dto';
import { buildEIDocument } from './builders/ei.builder';
import { buildLtdaDocument } from './builders/ltda.builder';

@Injectable()
export class AtoConstitutivoService {
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
