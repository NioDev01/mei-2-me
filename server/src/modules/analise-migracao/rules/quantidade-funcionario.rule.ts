import { Diagnostico } from './index';

export function validaQuantidadeFuncionarios(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.qtd_funcionario > 1) {
    adicionar('Quantidade de Funcionários');
  }
}
