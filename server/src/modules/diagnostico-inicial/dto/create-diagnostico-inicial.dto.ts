import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class AtividadeDto {
  @IsString()
  code!: string;

  @IsString()
  text!: string;
}

export class CreateDiagnosticoInicialDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  cnpj!: string;

  @IsNotEmpty()
  @IsString()
  razaoSocial!: string;

  @IsString()
  nomeFantasia?: string;

  @IsString()
  uf!: string;

  @IsString()
  municipio!: string;

  @IsString()
  dataAbertura!: string;

  @ValidateNested({ each: true })
  @Type(() => AtividadeDto)
  @IsArray()
  atividadePrincipal!: AtividadeDto[];

  @ValidateNested({ each: true })
  @Type(() => AtividadeDto)
  @IsArray()
  atividadesSecundarias!: AtividadeDto[];

  @IsString()
  naturezaJuridica!: string;
}
