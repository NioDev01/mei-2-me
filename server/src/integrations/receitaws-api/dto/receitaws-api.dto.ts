import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ReceitawsApiDto {
  @IsNotEmpty()
  @IsString()
  @Length(14, 14, { message: 'O CNPJ deve ter 14 dígitos' })
  @Matches(/^\d+$/, { message: 'CNPJ deve conter apenas números' })
  cnpj!: string;
}
