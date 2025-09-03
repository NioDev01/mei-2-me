import { Diagnostico } from '../analise-migracao.service';

export function validaParticipacaoSocietaria(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
) {
  if (user.participa_outra_empresa) {
    adicionar('Participação Societária');
  }
}
