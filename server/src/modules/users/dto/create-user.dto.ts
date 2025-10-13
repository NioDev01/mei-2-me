import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id_mei!: number;

  @ApiProperty({ required: true, description: 'Nome do usuário' })
  @IsString()
  nome_user!: string;

  @ApiProperty({ description: 'E-mail do usuário', example: 'email@gmail.com' })
  @IsString()
  @IsEmail({}, { message: 'E-mail inválido.' })
  email_user!: string;

  @ApiProperty({ description: 'Número de celular do usuário' })
  @IsPhoneNumber()
  @IsString()
  celular_user!: string;

  @ApiProperty({ description: 'CNPJ do usuário' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsString({ message: 'Digite apenas os números do CNPJ.' })
  cnpj_user!: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsStrongPassword()
  senha_user!: string;
}
