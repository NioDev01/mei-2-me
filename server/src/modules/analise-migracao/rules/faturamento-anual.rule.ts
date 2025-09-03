import { Diagnostico } from '../analise-migracao.service';

export function validaFaturamentoAnual(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  const faturamentoUsuario = Number(user.faturamento_12m);
  const faturamentoPermitido = 81000;
  const faturamentoLimite = faturamentoPermitido + faturamentoPermitido * 0.2;

  if (
    faturamentoUsuario > faturamentoPermitido &&
    faturamentoUsuario <= faturamentoLimite
  ) {
    adicionar('Faturamento anual até 20% acima do limite');
  } else if (faturamentoUsuario > faturamentoLimite) {
    adicionar('Faturamento anual superior à 20% do limite');
  }
}
