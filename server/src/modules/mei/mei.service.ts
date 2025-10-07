import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MeiService {
  constructor(private prisma: PrismaService) {}

  async buscarTodos() {
    return this.prisma.mei.findMany({
      include: {
        diagnostico: true,
        usuarios: true
      }
    });
  }

  async buscarPorId(id: number) {
    const mei = await this.prisma.mei.findUnique({
      where: { id_mei: id },
      include: {
        diagnostico: true,
        usuarios: true
      }
    });

    if (!mei) {
      throw new NotFoundException(`MEI com ID ${id} não encontrado`);
    }

    return mei;
  }

  async buscarPorCnpj(cnpj: string) {
    const mei = await this.prisma.mei.findUnique({
      where: { cnpj_mei: cnpj },
      include: {
        diagnostico: true,
        usuarios: true
      }
    });

    if (!mei) {
      throw new NotFoundException(`MEI com CNPJ ${cnpj} não encontrado`);
    }

    return mei;
  }
}