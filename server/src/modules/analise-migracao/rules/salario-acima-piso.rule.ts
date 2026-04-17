import { Diagnostico } from '@/interfaces/diagnostico';

export function validaSalarioAcimaPiso(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.paga_acima_piso) {
    adicionar('Salário acima do permitido');
  }
}
