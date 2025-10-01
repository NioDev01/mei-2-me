import anexosSimplesLookup, { AnexosSimples } from './simples-anexos-lookup';

interface ResultadoSimplesNacional {
  tributos: number;
  aliquotaEfetiva: number;
  lucroLiquido: number;
}

export function calcularSimplesNacional(
  rendaBrutaAnual: number = 0,
  anexoParam: string = 'I',
): ResultadoSimplesNacional {
  // Pegar apenas o primeiro anexo, em casos de entradas como "II ou III ou IV"
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

  const aliquotaEfetiva = (tributos / (rendaBrutaAnual / 12)) * 100;

  const lucroLiquido = rendaBrutaAnual / 12 - tributos;

  return { tributos, aliquotaEfetiva, lucroLiquido };
}
