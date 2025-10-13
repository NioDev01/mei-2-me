import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements Usuario {
  constructor(partial: Partial<UserEntity | null>) {
    Object.assign(this, partial);
  }

  id_user!: number;
  id_mei!: number;

  @ApiProperty({ required: true, description: 'Nome do usuário' })
  nome_user!: string;

  @ApiProperty({ description: 'E-mail do usuário', example: 'email@gmail.com' })
  email_user!: string;

  @ApiProperty({ description: 'Número de celular do usuário' })
  celular_user!: string;

  @ApiProperty({ description: 'CNPJ do usuário' })
  cnpj_user!: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @Exclude()
  senha_user!: string;
}
