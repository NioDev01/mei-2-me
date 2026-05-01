import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NaturezaJuridica } from '../enums/natureza-juridica.enums';
import { GenerateEIDto } from './generate-ei.dto';
import { GenerateLtdaDto } from './generate-ltda.dto';

export class GenerateAtoDto {
  @IsEnum(NaturezaJuridica)
  naturezaJuridica!: NaturezaJuridica;

  @ValidateNested()
  @Type(() => GenerateEIDto)
  eiData?: GenerateEIDto;

  @ValidateNested()
  @Type(() => GenerateLtdaDto)
  ltdaData?: GenerateLtdaDto;
}
