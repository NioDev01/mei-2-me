import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async buscarTodos() {
    return this.prisma.usuario.findMany({
      include: {
        mei: true,
        resetSenhas: true
      }
    });
  }

  async buscarPorId(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id_user: id },
      include: {
        mei: true,
        resetSenhas: true
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return usuario;
  }

  async buscarPorEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email_user: email },
      include: {
        mei: true
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }

    return usuario;
  }

  async buscarPorCnpj(cnpj: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { cnpj_user: cnpj },
      include: {
        mei: true
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com CNPJ ${cnpj} não encontrado`);
    }

    return usuario;
  }
}