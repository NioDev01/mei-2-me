// forgot-password.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'E-mail do usuário para redefinição de senha' })
  @IsEmail()
  email!: string;
}
