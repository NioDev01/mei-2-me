export function regraFunc(qtdFunc: number): string {
  if (qtdFunc >= 1) {
    return "Desenquadramento imediato. Motivo: tem mais de um funcionário";
  } else {
    return "Elegível para migração de MEI para ME";
  }
}