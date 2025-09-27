import { Logger } from '@nestjs/common';
import { Diagnostico } from './index';

export function validaCNAE(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
  cnaesPermitidos: string[],
) {
  try {
    const atividades = user.cnae_principal;

    const code = atividades[0]?.code?.trim();

    const permitidasNormalizados = cnaesPermitidos.map((c) => c.trim());

    if (!permitidasNormalizados.includes(code)) {
      adicionar('Atividades Permitidas');
    }
  } catch (err) {
    Logger.error(`Erro ao tentar validar CNAE: ${err}`);
  }
}
