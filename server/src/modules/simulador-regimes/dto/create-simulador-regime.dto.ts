import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateSimuladorRegimeDto {
  @ApiProperty({
    description: 'ID do MEI',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'O campo id é obrigatório.' })
  @IsNumber({}, { message: 'O campo id deve ser um número.' })
  @IsInt({ message: 'O campo id deve ser um número inteiro.' })
  @IsPositive({ message: 'O campo id deve ser um número positivo.' })
  id_mei!: number;

  @ApiProperty({
    description: 'Receita bruta anual do MEI',
    example: 81000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A receita bruta anual deve ser um número.' })
  @IsPositive({ message: 'A receita bruta anual deve ser um número positivo.' })
  receitas_financeiras!: number;

  @ApiProperty({
    description: 'Receita não operacional anual do MEI',
    example: 10000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A receita não operacional deve ser um número.' })
  @IsPositive({
    message: 'A receita não operacional deve ser um número positivo.',
  })
  receitas_nao_operacionais!: number;

  @ApiProperty({
    description: 'Despesa financeira anual do MEI',
    example: 20000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A despesa financeira deve ser um número.' })
  @IsPositive({ message: 'A despesa financeira deve ser um número positivo.' })
  despesas_financeiras!: number;
}
