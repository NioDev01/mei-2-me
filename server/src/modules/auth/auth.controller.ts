import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return { accessToken };
  }

  @Post('refresh')
  refresh(@Req() req) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    res.clearCookie('refreshToken');

    return this.authService.logout(refreshToken);
  }

  @Post('forgot-password')
  forgot(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  reset(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('senha')
  async changePassword(
    @Request() req,
    @Body() body: { senhaAtual: string; novaSenha: string },
  ) {
    return this.authService.changePassword(
      req.user.id_user,
      body.senhaAtual,
      body.novaSenha,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteAccount(@Request() req) {
    return this.authService.deleteAccount(req.user.id_user);
  }
}
