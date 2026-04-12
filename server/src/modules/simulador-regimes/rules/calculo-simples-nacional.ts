import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import anexosSimplesLookup, { AnexosSimples } from './simples-anexos-lookup';
// import { Logger } from '@nestjs/common';

interface ResultadoSimplesNacional {
  tributosMensais: number;
  aliquotaEfetiva: number; // fração (ex: 0.1342 = 13.42%)
  lucroEstimado: number;
}

export function calcularSimplesNacional(
  rendaBrutaAnual: number = 0,
  despesasFinanceirasAnual: number = 0,
  anexoParam: string = 'I',
): ResultadoSimplesNacional {
  // Pega apenas o primeiro anexo, em casos como "II ou III ou IV"
  const anexo = anexoParam.trim().split(' ')[0].toUpperCase() as AnexosSimples;

  if (!anexosSimplesLookup[anexo]) {
    throw new BadRequestException(`Anexo inválido: ${anexo}`);
  }

  const faixaEnquadrada = Object.values(anexosSimplesLookup[anexo]).find(
    (faixa) =>
      rendaBrutaAnual >= faixa.rbt12.min && rendaBrutaAnual <= faixa.rbt12.max,
  );

  if (!faixaEnquadrada) {
    throw new BadRequestException(
      'Renda Bruta Anual fora das faixas permitidas para o Simples Nacional',
    );
  }

  // Cálculo dos tributos, alíquota efetiva e lucro líquido mensal
  const tributosMensais =
    (rendaBrutaAnual * (faixaEnquadrada.aliquota / 100) -
      faixaEnquadrada.deducao) /
    12;

  const receitaMensal = rendaBrutaAnual / 12;

  // Alíquota efetiva agora em fração (ex: 0.1342 em vez de 13.42)
  const aliquotaEfetiva =
    receitaMensal > 0 ? tributosMensais / receitaMensal : 0;

  const lucroEstimado =
    rendaBrutaAnual / 12 - tributosMensais - despesasFinanceirasAnual / 12; // lucro líquido mensal estimado

  return { tributosMensais, aliquotaEfetiva, lucroEstimado };
}
