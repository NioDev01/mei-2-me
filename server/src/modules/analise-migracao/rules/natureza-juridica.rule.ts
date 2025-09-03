import { Diagnostico } from '../analise-migracao.service';

export function validaNaturezaJuridica(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.natureza_juridica != 'Empresário Individual') {
    adicionar('Natureza jurídica incompatível com MEI');
  }
}
