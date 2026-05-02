import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class GenerateEIDto {
  @IsString()
  @IsNotEmpty()
  nomeEmpresarial!: string;

  @IsString()
  @IsNotEmpty()
  cnpj!: string;

  @IsString()
  @IsNotEmpty()
  endereco!: string;

  @IsString()
  @IsNotEmpty()
  atividade!: string;

  @IsNumber()
  capitalSocial!: number;
}
