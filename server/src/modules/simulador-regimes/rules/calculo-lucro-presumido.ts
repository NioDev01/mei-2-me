interface ResultadoLucroPresumido {
  tributos: number;
  aliquotaEfetiva: number;
  lucroLiquido: number;
}

export function calcularLucroPresumido(
  rendaBrutaAnual: number = 0,
  receitasFinanceirasAnual: number = 0,
  receitasNaoOperacionaisAnual: number = 0,
  despesasFinanceirasAnual: number = 0, // NOVO
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

  // Agora somamos as receitas que não têm presunção (financeiras e não operacionais)
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

  // PIS e COFINS cumulativos (sobre receita operacional + financeira + não operacional)
  const receitaTotalTrimestral =
    receitaOperacionalTrimestral +
    receitasFinanceirasTrimestral +
    receitasNaoOperacionaisTrimestral;
  const pis = receitaTotalTrimestral * 0.0065;
  const cofins = receitaTotalTrimestral * 0.03;

  // ICMS e ISS (simplificados, só sobre receita operacional)
  const icms = calculaIcms ? receitaOperacionalTrimestral * 0.18 : 0;
  const iss = calculaIss ? receitaOperacionalTrimestral * 0.05 : 0;

  // Consolidando
  const tributosTrimestrais = irpj + csll + pis + cofins + icms + iss;
  const tributos = tributosTrimestrais / 3; // mensal
  const aliquotaEfetiva = (tributos / (receitaTotalTrimestral / 3)) * 100;
  const lucroLiquido =
    receitaTotalTrimestral / 3 - tributos - despesasFinanceirasAnual / 12;

  return { tributos, aliquotaEfetiva, lucroLiquido };
}
