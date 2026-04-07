import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'É obrigatório fornecer um identificador válido.' })
  identificador!: string;

  @IsNotEmpty({ message: 'É obrigatório fornecer uma senha válida.' })
  @IsString()
  senha!: string;
}
