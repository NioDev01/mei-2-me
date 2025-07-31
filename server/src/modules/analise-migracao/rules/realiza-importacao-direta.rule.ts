export function regraImport(possuiImport: boolean): string {
  if (possuiImport == true) {
    return "Desenquadramento imediato. Motivo: tem importação direta";
  } else {
    return "Elegível para migração de MEI para ME";
  }
}