import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class CreateSimuladorRegimeDto {
  @ApiProperty({
    description:
      'Receita financeira anual do MEI (Rendimentos de aplicações, juros recebidos)',
    example: 10000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A receita financeira anual deve ser um número.' })
  @Min(0, { message: 'A receita financeira anual não pode ser negativa.' })
  receitas_financeiras!: number;

  @ApiProperty({
    description:
      'Receita não operacional anual do MEI (Vendas de ativos, ganhos eventuais)',
    example: 10000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A receita não operacional deve ser um número.' })
  @Min(0, { message: 'A receita não operacional não pode ser negativa.' })
  receitas_nao_operacionais!: number;

  @ApiProperty({
    description:
      'Despesa financeira anual do MEI (Juros pagos, multas, despesas bancárias)',
    example: 20000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A despesa financeira deve ser um número.' })
  @Min(0, { message: 'A despesa financeira não pode ser negativa.' })
  despesas_financeiras!: number;
}
