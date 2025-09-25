import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/email.dto';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Autentica usuário',
    description:
      'Endpoint responsável por realizar a autenticação de um usuário no sistema.',
  })
  @ApiResponse({
    type: AuthEntity,
    status: 200,
    description: 'Usuário autenticado com sucesso!',
  })
  @ApiResponse({
    status: 401,
    description: 'Não foi possível realizar a autenticação do usuário.',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Solicita redefinição de senha.',
    description:
      'Endpoint responsável por fazer a solicitação de redefinição de senha.',
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitação para redefinição de senha realizada com sucesso!',
  })
  async forgotPassword(@Body() email: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(email.email);
  }
}
