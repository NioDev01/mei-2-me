import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChecklistDocumentoDto {
  @IsNumber()
  id_mei!: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_rg!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_cpf!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_cnh!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_ccmei!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_cartao_cnpj!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_insc_estadual!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  possui_insc_municipal!: boolean;
}
