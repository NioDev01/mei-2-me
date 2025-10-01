import { Diagnostico } from '../analise-migracao.service';

export function validaImportacaoDireta(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.importacao_direta == true) {
    adicionar('Importação direta');
  }
}
