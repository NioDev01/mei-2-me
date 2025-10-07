import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CnaeService {
  constructor(private prisma: PrismaService) {}

  async buscarTodos() {
    return this.prisma.cnae.findMany();
  }

  async buscarPorId(id: number) {
    const cnae = await this.prisma.cnae.findUnique({
      where: { id_cnae: id }
    });

    if (!cnae) {
      throw new NotFoundException(`CNAE com ID ${id} não encontrado`);
    }

    return cnae;
  }

  async buscarPorCodigo(codigoCnae: string) {
    const cnae = await this.prisma.cnae.findFirst({
      where: { cnae: codigoCnae }
    });

    if (!cnae) {
      throw new NotFoundException(`CNAE com código ${codigoCnae} não encontrado`);
    }

    return cnae;
  }
}