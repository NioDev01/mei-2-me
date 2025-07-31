export function regraPart(possuiPart: boolean): string {
  if (possuiPart == true) {
    return "Desenquadramento imediato. Motivo: tem participação em outra empresa";
  } else {
    return "Elegível para migração de MEI para ME";
  }
}