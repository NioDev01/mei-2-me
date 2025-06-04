import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    // Aqui você adicionaria a lógica de autenticação com JWT, etc.
    return {
      message: 'Login simulado',
      email: dto.email,
    };
  }
}
