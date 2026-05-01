import {
  IsEnum,
  ValidateNested,
  IsNumber,
  IsString,
  IsNotEmpty,
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

  @ValidateNested({ each: true })
  @Type(() => PessoaDto)
  socios!: PessoaDto[];
}

class EiInputDto {
  @IsNumber()
  capitalSocial!: number;
}

export class GenerateFromMeiDto {
  @IsEnum(NaturezaJuridica)
  naturezaJuridica!: NaturezaJuridica;

  @ValidateNested()
  @Type(() => EiInputDto)
  eiData?: EiInputDto;

  @ValidateNested()
  @Type(() => LtdaInputDto)
  ltdaData?: LtdaInputDto;
}
