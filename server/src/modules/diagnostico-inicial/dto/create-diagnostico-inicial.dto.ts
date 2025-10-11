import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'CNPJ do MEI',
    example: 12698724000187,
    required: true,
  })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{14}$/, { message: 'CNPJ deve ter 14 dígitos' })
  @IsString({ message: 'Digite apenas os números do CNPJ.' })
  @Length(14, 14, {
    message: 'É obrigatório que o CNPJ contenha 14 dígitos.',
  })
  @IsNotEmpty({ message: 'É obrigatório fornecer um CNPJ válido.' })
  cnpj_mei!: string;

  @ApiProperty({
    description: 'Mei possui outra empresa?',
    example: false,
    required: false,
  })
  @IsBoolean()
  possui_filial!: boolean;

  @ApiProperty({
    description: 'Quantidade de funcionários do MEI',
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: 'A quantidade de funcionários deve ser um número.' })
  @Min(0)
  @IsNotEmpty({ message: 'O número de funcionários não pode estar em branco.' })
  qtd_funcionario!: number;

  @ApiProperty({
    description: 'MEI paga acima do piso salarial?',
    example: false,
    required: false,
  })
  @IsBoolean()
  paga_acima_piso!: boolean;

  @ApiProperty({
    description: 'MEI participa de outra empresa?',
    example: false,
    required: false,
  })
  @IsBoolean()
  participa_outra_empresa!: boolean;

  @ApiProperty({
    description: 'Faturamento anual do MEI',
    example: 81000.0,
    required: true,
  })
  @IsNumber({}, { message: 'O faturamento anual deve ser um número.' })
  @Min(0, {
    message: 'O faturamento anual não pode ser um número negativo.',
  })
  @IsNotEmpty({ message: 'O faturamento anual não pode estar em branco.' })
  faturamento_12m!: number;

  @ApiProperty({
    description: 'Total de compras anuais do MEI',
    example: 20000.0,
    required: true,
  })
  @IsNumber({}, { message: 'O total de compras anuais deve ser um número.' })
  @Min(0, {
    message: 'O total de compras anuais não pode ser um número negativo.',
  })
  @IsNotEmpty({
    message: 'O total de compras anuais não pode estar em branco.',
  })
  compras_12m!: number;

  @ApiProperty({
    description: 'MEI exporta acima do limite?',
    example: false,
    required: false,
  })
  @IsBoolean()
  exporta_acima_limite!: boolean;

  @ApiProperty({
    description: 'MEI realiza importação direta?',
    example: false,
    required: false,
  })
  @IsBoolean()
  importacao_direta!: boolean;
}
