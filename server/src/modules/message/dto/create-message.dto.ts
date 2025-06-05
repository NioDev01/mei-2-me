import { IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(2, { message: 'A mensagem deve ter pelo menos 2 caracteres.' })
  conteudo: string;
}
