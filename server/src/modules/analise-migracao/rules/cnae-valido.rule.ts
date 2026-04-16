import { Logger } from '@nestjs/common';
import { Diagnostico } from '@/interfaces/diagnostico';

export function validaCNAE(
  user: any,
  resultados: Diagnostico[],
  adicionar: (rule: string) => void,
  cnaesPermitidos: string[],
) {
  try {
    const atividades = user.cnae_principal;
    const code = atividades[0]?.code?.trim();
    const cnaesNormalizados = cnaesPermitidos.map((code) => code.trim());

    if (cnaesNormalizados.includes(code)) {
      adicionar('Atividades Permitidas');
    }
  } catch (err) {
    Logger.error(`Erro ao tentar validar CNAE: ${err}`);
  }
}
