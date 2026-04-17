import { Diagnostico } from '@/interfaces/diagnostico';

export function validaNaturezaJuridica(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.natureza_juridica != '213-5 - Empresário (Individual)') {
    adicionar('Natureza jurídica incompatível com MEI');
  }
}
