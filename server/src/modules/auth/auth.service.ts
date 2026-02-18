import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDto) {
    try {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(data.senha, saltRounds);

      const usuario = await this.prisma.usuario.create({
        data: {
          nome_user: data.nome,
          email_user: data.email,
          cnpj_user: data.cnpj,
          celular_user: data.celular,
          senha_user: hashedPassword,
          mei: {},
        },
      });

      return {
        message: 'Usuário criado com sucesso',
        id: usuario.id_user,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Não foi possível concluir o cadastro.');
      }

      throw error;
    }
  }

  async login(data: LoginDto) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        OR: [
          { email_user: data.identificador },
          { cnpj_user: data.identificador },
          { celular_user: data.identificador },
        ],
      },
    });

    // Se usuário não existir
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Comparar senha
    const senhaValida = await bcrypt.compare(data.senha, usuario.senha_user);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return {
      message: 'Login realizado com sucesso',
      userId: usuario.id_user,
    };
  }
}
