import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/integrations/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async login(data: LoginDto): Promise<AuthEntity> {
    const { senha_user, ...loginFields } = data;

    const loginType = Object.entries(loginFields).find(
      ([, value]) => value !== undefined && value !== null && value !== '',
    );

    if (!loginType) {
      throw new BadRequestException(
        'Informe o email, CNPJ ou celular para efetuar o login.',
      );
    }

    const [field, value] = loginType;

    const user = await this.prisma.usuario.findFirst({
      where: { [field]: value },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(senha_user, user.senha_user);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    const accessToken = this.jwtService.sign({ sub: user.id_user });

    return {
      accessToken,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.usuario.findUnique({
      where: { email_user: email },
    });

    if (!user) {
      throw new NotFoundException('E-mail de usuário inválido.');
    }

    const token = this.jwtService.sign(
      { sub: user.id_user, email: user.email_user },
      { expiresIn: '15m' },
    );

    await this.emailService.sendResetPassword(email, token);

    Logger.log('E-mail enviado com sucesso!');
  }
}
