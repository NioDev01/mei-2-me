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
    const rawCode = atividades[0]?.code?.trim();
    const code = rawCode
      ?.replace(/\./g, '') // Remove todos os pontos
      ?.replace(/-(\d{2})$/, '/$1'); // Troca o último hífen por uma barra
    const cnaesNormalizados = cnaesPermitidos.map((code) => code.trim());

    if (!cnaesNormalizados.includes(code)) {
      adicionar('Atividade não permitida para MEI');
    }
  } catch (err) {
    Logger.error(`Erro ao tentar validar CNAE: ${err}`);
  }
}
