import anexosSimplesLookup, { AnexosSimples } from './simples-anexos-lookup';
// import { Logger } from '@nestjs/common';

interface ResultadoSimplesNacional {
  tributos: number;
  aliquotaEfetiva: number; // fração (ex: 0.1342 = 13.42%)
  lucroLiquido: number;
}

export function calcularSimplesNacional(
  rendaBrutaAnual: number = 0,
  despesasFinanceirasAnual: number = 0,
  anexoParam: string = 'I',
): ResultadoSimplesNacional {
  // Pega apenas o primeiro anexo, em casos como "II ou III ou IV"
  const anexo = anexoParam.trim().split(' ')[0].toUpperCase() as AnexosSimples;

  const faixaEnquadrada = Object.values(anexosSimplesLookup[anexo]).find(
    (faixa) =>
      rendaBrutaAnual >= faixa.rbt12.min && rendaBrutaAnual <= faixa.rbt12.max,
  );

  if (!faixaEnquadrada) {
    throw new Error(
      'Renda Bruta Anual fora das faixas permitidas para o Simples Nacional',
    );
  }

  // Cálculo dos tributos, alíquota efetiva e lucro líquido mensal
  const tributos =
    (rendaBrutaAnual * (faixaEnquadrada.aliquota / 100) -
      faixaEnquadrada.deducao) /
    12;

  // Alíquota efetiva agora em fração (ex: 0.1342 em vez de 13.42)
  const aliquotaEfetiva = tributos / (rendaBrutaAnual / 12);

  const lucroLiquido =
    rendaBrutaAnual / 12 - tributos - despesasFinanceirasAnual / 12;

  return { tributos, aliquotaEfetiva, lucroLiquido };
}
