import { Diagnostico } from './index';

export function validaExportacaoAcimaLimite(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.exporta_acima_limite) {
    adicionar('Exportações acima do limite permitido');
  }
}
