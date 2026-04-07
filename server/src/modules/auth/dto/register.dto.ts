import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'É obrigatório fornecer um nome válido.' })
  nome!: string;

  @IsEmail()
  @IsNotEmpty({ message: 'É obrigatório fornecer um email válido.' })
  email!: string;

  @IsNotEmpty({ message: 'É obrigatório fornecer um CNPJ válido.' })
  @IsString()
  cnpj!: string;

  @IsNotEmpty({ message: 'É obrigatório fornecer um celular válido.' })
  @IsString()
  celular!: string;

  @IsNotEmpty({ message: 'É obrigatório fornecer uma senha válida.' })
  @IsString()
  @MinLength(6)
  senha!: string;
}
