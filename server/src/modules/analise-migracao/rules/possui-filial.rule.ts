export function regraFilial(possuiFiliais: boolean): string {
  if (possuiFiliais == true) {
    return "Desenquadramento imediato. Motivo: tem filiais ativas";
  } else {
    return "Elegível para migração de MEI para ME";
  }
}