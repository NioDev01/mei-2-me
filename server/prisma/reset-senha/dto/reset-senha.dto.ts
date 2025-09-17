import { IsString, MinLength } from 'class-validator';

export class ResetSenhaDto {
  @IsString()
  token!: string;

  @IsString()
  @MinLength(6)
  newPassword!: string;
}
