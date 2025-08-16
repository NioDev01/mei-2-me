import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateDiagnosticoInicialDto {
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{14}$/, { message: 'CNPJ deve ter 14 dígitos' })
  @IsString({ message: 'Digite apenas os números do CNPJ.' })
  @Length(14, 14, {
    message: 'É obrigatório que o CNPJ contenha 14 dígitos.',
  })
  @IsNotEmpty({ message: 'É obrigatório fornecer um CNPJ válido.' })
  cnpj_mei!: string;

  @IsBoolean()
  possui_filial!: boolean;

  @IsNumber({}, { message: 'A quantidade de funcionários deve ser um número.' })
  @Min(0)
  @IsNotEmpty({ message: 'O número de funcionários não pode estar em branco.' })
  qtd_funcionario!: number;

  @IsBoolean()
  paga_acima_piso!: boolean;

  @IsBoolean()
  participa_outra_empresa!: boolean;

  @IsNumber({}, { message: 'O faturamento anual deve ser um número.' })
  @Min(0, {
    message: 'O faturamento anual não pode ser um número negativo.',
  })
  @IsNotEmpty({ message: 'O faturamento anual não pode estar em branco.' })
  faturamento_12m!: number;

  @IsNumber({}, { message: 'O total de compras anuais deve ser um número.' })
  @Min(0, {
    message: 'O total de compras anuais não pode ser um número negativo.',
  })
  @IsNotEmpty({
    message: 'O total de compras anuais não pode estar em branco.',
  })
  compras_12m!: number;

  @IsBoolean()
  exporta_acima_limite!: boolean;
}
