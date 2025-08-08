export function validarFaturamentoAnual(faturamentoAnual: number): string {
  if (faturamentoAnual <= 81000) {
    return "Elegível para migração de MEI para ME";
  } else if (faturamentoAnual > 81000 && faturamentoAnual <= 97200) {
    return "Desenquadramento no próximo ano";
  } else {
    return "Desenquadramento imediato e retroativo";
  }
}
