import { IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { NaturezaJuridica } from '../enums/natureza-juridica.enums';
import { GenerateEIDto } from './generate-ei.dto';
import { GenerateLtdaDto } from './generate-ltda.dto';

export class GenerateAtoDto {
  @IsEnum(NaturezaJuridica)
  naturezaJuridica!: NaturezaJuridica;

  @IsOptional()
  @ValidateNested()
  @Type(() => GenerateEIDto)
  eiData?: GenerateEIDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GenerateLtdaDto)
  ltdaData?: GenerateLtdaDto;
}
