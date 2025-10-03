import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateSimuladorRegimeDto {
  @IsNotEmpty({ message: 'O campo id é obrigatório.' })
  @IsNumber({}, { message: 'O campo id deve ser um número.' })
  @IsInt({ message: 'O campo id deve ser um número inteiro.' })
  @IsPositive({ message: 'O campo id deve ser um número positivo.' })
  id_mei!: number;

  @IsOptional()
  @IsNumber({}, { message: 'A receita bruta anual deve ser um número.' })
  @IsPositive({ message: 'A receita bruta anual deve ser um número positivo.' })
  receitas_financeiras!: number;

  @IsOptional()
  @IsNumber({}, { message: 'A receita não operacional deve ser um número.' })
  @IsPositive({
    message: 'A receita não operacional deve ser um número positivo.',
  })
  receitas_nao_operacionais!: number;

  @IsOptional()
  @IsNumber({}, { message: 'A despesa financeira deve ser um número.' })
  @IsPositive({ message: 'A despesa financeira deve ser um número positivo.' })
  despesas_financeiras!: number;
}
