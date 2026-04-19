import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateChecklistDocumentoDto {
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_rg?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_cpf?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_comprovante_residencia?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_cartao_cnpj?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  comunicacao_desenquadramento_simei?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  formulario_capa_marrom?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  requerimento_desenquadramento?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  comprovante_pagamento_dare?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  contrato_social?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_ccmei?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_cadesp?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  comprovante_situacao_simples_nacional?: boolean;
}
