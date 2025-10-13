import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email_user?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsOptional()
  @IsString()
  cnpj_user?: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber()
  @IsOptional()
  celular_user?: string;

  @IsString()
  @ApiProperty()
  senha_user!: string;
}
