import { IsEmail } from 'class-validator';

export class SolicitarResetDto {
  @IsEmail()
  email_user!: string;
}