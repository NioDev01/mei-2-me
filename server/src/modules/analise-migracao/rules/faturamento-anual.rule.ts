import { Diagnostico } from '../analise-migracao.service';

export function validaFaturamentoAnual(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (Number(user.faturamento_12m) > 81000) {
    adicionar('Faturamento Anual');
  }
}
