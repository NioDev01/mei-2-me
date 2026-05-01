import { Injectable } from '@nestjs/common';
import { Document, Packer } from 'docx';
import { GenerateEIDto } from './dto/generate-ei.dto';
import { buildEIDocument } from './builders/ei.builder';

@Injectable()
export class AtoConstitutivoService {
  async generateEI(data: GenerateEIDto): Promise<Buffer> {
    const doc = buildEIDocument(data);
    return await this.generateBuffer(doc);
  }

  // ===============================
  // BUFFER
  // ===============================

  private async generateBuffer(doc: Document): Promise<Buffer> {
    return await Packer.toBuffer(doc);
  }
}
