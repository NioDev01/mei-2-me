// import { Logger } from '@nestjs/common';

interface ResultadoLucroPresumido {
  tributosMensais: number;
  aliquotaEfetiva: number; // fração (ex: 0.1342 = 13.42%)
  lucroEstimado: number;
}

export function calcularLucroPresumido(
  rendaBrutaAnual: number = 0,
  receitasFinanceirasAnual: number = 0,
  receitasNaoOperacionaisAnual: number = 0,
  despesasFinanceirasAnual: number = 0,
  percentualIrpj: number = 0,
  percentualCsll: number = 0,
  consideraIcms: string | boolean = false,
  consideraIss: string | boolean = false,
): ResultadoLucroPresumido {
  const calculaIcms =
    consideraIcms === 'S'
      ? true
      : consideraIcms === 'N'
        ? false
        : Boolean(consideraIcms);

  const calculaIss =
    consideraIss === 'S'
      ? true
      : consideraIss === 'N'
        ? false
        : Boolean(consideraIss);

  // Quebra trimestral
  const receitaOperacionalTrimestral = rendaBrutaAnual / 4;
  const receitasFinanceirasTrimestral = receitasFinanceirasAnual / 4;
  const receitasNaoOperacionaisTrimestral = receitasNaoOperacionaisAnual / 4;

  // Bases de cálculo presumidas
  const basePresumidaIrpj =
    receitaOperacionalTrimestral * (percentualIrpj / 100);
  const basePresumidaCsll =
    receitaOperacionalTrimestral * (percentualCsll / 100);

  // Soma das receitas que não têm presunção
  const baseIrpj =
    basePresumidaIrpj +
    receitasFinanceirasTrimestral +
    receitasNaoOperacionaisTrimestral;
  const baseCsll =
    basePresumidaCsll +
    receitasFinanceirasTrimestral +
    receitasNaoOperacionaisTrimestral;

  // IRPJ: 15% + adicional
  const adicionalIrpj = baseIrpj > 60000 ? (baseIrpj - 60000) * 0.1 : 0;
  const irpj = baseIrpj * 0.15 + adicionalIrpj;

  // CSLL: 9%
  const csll = baseCsll * 0.09;

  // PIS e COFINS cumulativos (sobre receita total)
  const receitaTotalTrimestral =
    receitaOperacionalTrimestral +
    receitasFinanceirasTrimestral +
    receitasNaoOperacionaisTrimestral;
  const PIS = 0.0065;
  const COFINS = 0.03;
  const pis = receitaTotalTrimestral * PIS;
  const cofins = receitaTotalTrimestral * COFINS;

  // ICMS e ISS (simplificados)
  const icms = calculaIcms ? receitaOperacionalTrimestral * 0.12 : 0;
  const iss = calculaIss ? receitaOperacionalTrimestral * 0.05 : 0;

  // Consolidando
  const tributosTrimestrais = irpj + csll + pis + cofins + icms + iss;

  const tributosMensais = tributosTrimestrais / 3; // mensal
  const receitaMensal = receitaTotalTrimestral / 3;
  const aliquotaEfetiva =
    receitaMensal > 0 ? tributosMensais / receitaMensal : 0; // fração 0–1
  const lucroEstimado =
    receitaTotalTrimestral / 3 -
    tributosMensais -
    despesasFinanceirasAnual / 12; // lucro líquido mensal estimado

  return { tributosMensais, aliquotaEfetiva, lucroEstimado };
}
