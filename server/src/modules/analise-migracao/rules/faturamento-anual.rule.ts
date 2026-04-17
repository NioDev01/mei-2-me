import { Diagnostico } from '@/interfaces/diagnostico';

export function validaFaturamentoAnual(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  const faturamentoUsuario = Number(user.faturamento_12m);
  const faturamentoPermitido = 81000;
  const faturamentoLimite = faturamentoPermitido * 1.2;

  if (
    faturamentoUsuario > faturamentoPermitido &&
    faturamentoUsuario <= faturamentoLimite
  ) {
    adicionar('Faturamento anual acima do limite, mas dentro do tolerado');
  } else if (faturamentoUsuario > faturamentoLimite) {
    adicionar('Faturamento anual acima do limite, excedendo o tolerado');
  }
}
