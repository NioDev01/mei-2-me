import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateChecklistDocumentoDto {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  possui_rg?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  possui_cpf?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  possui_comprovante_residencia?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  possui_cartao_cnpj?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  comunicacao_desenquadramento_simei?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  formulario_capa_marrom?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  requerimento_desenquadramento?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  comprovante_pagamento_dare?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  ato_constitutivo?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  possui_ccmei?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  possui_cadesp?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  comprovante_situacao_simples_nacional?: boolean;
}
