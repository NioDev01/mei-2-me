import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendResetPassword(email: string, token: string): Promise<void> {
    const resetURL = `http://localhost:3000/api/auth/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"MEI-2-ME" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject: 'Redefinição de senha',
      html: `
        <h3>Olá!</h3>

        <p>Recebemos uma solicitação para redefinir a sua senha.</p>
        <p>Clique no link abaixo para redefinir sua senha: </p>

        <a href="${resetURL}">${resetURL}</a>

        <p>Esse link expira em 15 minutos.</p>
        
        <p><b>ATENÇÃO! </b>Se você não fez essa solicitação, desconsidere este e-mail.</p>
      `,
    });
  }
}
