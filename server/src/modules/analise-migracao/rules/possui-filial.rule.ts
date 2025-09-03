import { Diagnostico } from '../analise-migracao.service';

export function validaPossuiFilial(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.possui_filial) {
    adicionar('Abertura de filial');
  }
}
