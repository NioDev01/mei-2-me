import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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

    const payload = {
      sub: usuario.id_user,
      email: usuario.email_user,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(
      { sub: usuario.id_user },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
      },
    );

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);

    await this.prisma.usuario.update({
      where: { id_user: usuario.id_user },
      data: { refresh_token: hashedRefresh },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    await this.prisma.usuario.update({
      where: { id_user: userId },
      data: { refresh_token: null },
    });

    return { message: 'Logout realizado com sucesso' };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const usuario = await this.prisma.usuario.findUnique({
        where: { id_user: decoded.sub },
      });

      if (!usuario || !usuario.refresh_token) {
        throw new UnauthorizedException();
      }

      const tokenValido = await bcrypt.compare(
        refreshToken,
        usuario.refresh_token,
      );

      if (!tokenValido) {
        throw new UnauthorizedException();
      }

      const newAccessToken = await this.jwtService.signAsync({
        sub: usuario.id_user,
        email: usuario.email_user,
      });

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
