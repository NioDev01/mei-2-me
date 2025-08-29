import { Diagnostico } from '../analise-migracao.service';

export function validaSalarioAcimaPiso(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.paga_acima_piso) {
    adicionar('Salário acima do permitido');
  }
}
