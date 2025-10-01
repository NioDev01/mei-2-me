import { Diagnostico } from '../analise-migracao.service';

export function validaComprasAcimaReceita(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (Number(user.compras_12m) > Number(user.faturamento_12m) * 0.8) {
    adicionar('Compras superiores a 80% da receita bruta');
  }
}
