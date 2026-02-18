import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDto) {
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
  }
}
