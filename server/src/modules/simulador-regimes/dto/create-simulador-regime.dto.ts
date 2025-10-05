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
    description:
      'Receita financeira anual do MEI (Rendimentos de aplicações, juros recebidos)',
    example: 10000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A receita financeira anual deve ser um número.' })
  @IsPositive({
    message: 'A receita financeira anual deve ser um número positivo.',
  })
  receitas_financeiras!: number;

  @ApiProperty({
    description:
      'Receita não operacional anual do MEI (Vendas de ativos, ganhos eventuais)',
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
    description:
      'Despesa financeira anual do MEI (Juros pagos, multas, despesas bancárias)',
    example: 20000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A despesa financeira deve ser um número.' })
  @IsPositive({ message: 'A despesa financeira deve ser um número positivo.' })
  despesas_financeiras!: number;
}
