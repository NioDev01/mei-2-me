import {
  IsEnum,
  ValidateNested,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NaturezaJuridica } from '../enums/natureza-juridica.enums';

class PessoaDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  cpf!: string;
}

class LtdaInputDto {
  @IsNumber()
  capitalSocial!: number;

  @ValidateNested()
  @Type(() => PessoaDto)
  titular!: PessoaDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PessoaDto)
  socios!: PessoaDto[];
}

class EiInputDto {
  @IsNumber()
  capitalSocial!: number;
}

export class GenerateFromMeiDto {
  @IsOptional()
  @IsEnum(NaturezaJuridica)
  naturezaJuridica?: NaturezaJuridica;

  @IsOptional()
  @ValidateNested()
  @Type(() => EiInputDto)
  eiData?: EiInputDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LtdaInputDto)
  ltdaData?: LtdaInputDto;
}
