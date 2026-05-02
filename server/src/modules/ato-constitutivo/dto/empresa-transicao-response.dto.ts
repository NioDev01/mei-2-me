import { NaturezaJuridica } from '../enums/natureza-juridica.enums';

export class EmpresaTransicaoResponseDto {
  naturezaJuridica!: NaturezaJuridica;

  eiData?: {
    capitalSocial: number;
  };

  ltdaData?: {
    capitalSocial: number;
    titular: {
      nome: string;
      cpf: string;
    };
    socios: {
      nome: string;
      cpf: string;
    }[];
  };
}
