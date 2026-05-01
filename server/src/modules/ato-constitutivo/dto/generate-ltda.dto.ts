import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PessoaDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  cpf!: string;
}

export class GenerateLtdaDto {
  @IsString()
  @IsNotEmpty()
  cnpj!: string;

  @IsString()
  @IsNotEmpty()
  nomeEmpresarial!: string;

  @IsString()
  @IsNotEmpty()
  endereco!: string;

  @IsString()
  @IsNotEmpty()
  atividade!: string;

  @IsNumber()
  capitalSocial!: number;

  // sempre existe
  @ValidateNested()
  @Type(() => PessoaDto)
  titular!: PessoaDto;

  // opcional
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PessoaDto)
  socios!: PessoaDto[];
}
