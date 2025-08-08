import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  Min,
  Max,
  Length,
  Matches,
} from 'class-validator';

const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

export class ImplementacaoDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Matches(/^[\w\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ'.-]*$/, { message: 'O nome contém caracteres inválidos' })
  nome: string;

  @IsString({ message: 'O CNPJ deve estar no formato de string' })
  @Matches(CNPJ_REGEX, { message: 'CNPJ inválido. Use o formato XX.XXX.XXX/XXXX-XX' })
  cnpj: string;

  @IsNumber({}, { message: 'O faturamento deve ser um número' })
  @Min(0, { message: 'O faturamento não pode ser negativo' })
  @IsNotEmpty({ message: 'O faturamento é obrigatório' })
  faturamento: number;

  @IsNumber({}, { message: 'O número de funcionários deve ser um número' })
  @Min(0, { message: 'O número de funcionários não pode ser negativo' })
  @IsNotEmpty({ message: 'O número de funcionários é obrigatório' })
  numFuncionarios: number;

  @IsNumber({}, { message: 'O faturamento dos últimos 12 meses deve ser um número' })
  @Min(0, { message: 'O valor não pode ser negativo' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  faturamentoUltimos12Meses: number;

  @IsNumber({}, { message: 'O valor gasto com compras deve ser um número' })
  @Min(0, { message: 'O valor não pode ser negativo' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  gastoUltimos12Meses: number;

  @IsOptional()
  @IsBoolean({ message: 'O campo "ativo" deve ser verdadeiro ou falso' })
  ativo?: boolean;
}
