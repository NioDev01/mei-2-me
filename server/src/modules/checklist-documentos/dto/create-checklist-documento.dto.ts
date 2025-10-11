import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChecklistDocumentoDto {
  @IsNumber()
  @ApiProperty()
  id_mei!: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_rg!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_cpf!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_cnh!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_ccmei!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_cartao_cnpj!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_insc_estadual!: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'O usuário precisa selecionar uma opção.' })
  @ApiProperty()
  possui_insc_municipal!: boolean;
}
