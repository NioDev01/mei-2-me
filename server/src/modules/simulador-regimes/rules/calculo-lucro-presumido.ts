interface ResultadoSimplesNacional {
  tributos: number;
  aliquotaEfetiva: number;
  lucroLiquido: number;
}

export function calcularLucroPresumido(
  rendaBrutaAnual: number = 0,
  percentualIrpj: number = 0,
  percentualCsll: number = 0,
  consideraIcms: string | boolean = false,
  consideraIss: string | boolean = false,
): ResultadoSimplesNacional {
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

  const rendaBrutaTrimestral = rendaBrutaAnual / 4;

  const basePresumidaIrpj = rendaBrutaTrimestral * (percentualIrpj / 100);
  const basePresumidaCsll = rendaBrutaTrimestral * (percentualCsll / 100);

  // IRPJ: 15% + adicional
  const adicionalIrpj =
    basePresumidaIrpj > 60000 ? (basePresumidaIrpj - 60000) * 0.1 : 0;
  const irpj = basePresumidaIrpj * 0.15 + adicionalIrpj;

  // CSLL: 9%
  const csll = basePresumidaCsll * 0.09;

  // PIS e COFINS cumulativos
  const pis = rendaBrutaTrimestral * 0.0065;
  const cofins = rendaBrutaTrimestral * 0.03;

  // ICMS e ISS (simplificados)
  const icms = calculaIcms ? rendaBrutaTrimestral * 0.18 : 0;
  const iss = calculaIss ? rendaBrutaTrimestral * 0.05 : 0;

  // Consolidando
  const tributosTrimestrais = irpj + csll + pis + cofins + icms + iss;
  const tributos = tributosTrimestrais / 3; // mensal
  const aliquotaEfetiva = (tributos / (rendaBrutaTrimestral / 3)) * 100;
  const lucroLiquido = rendaBrutaTrimestral / 3 - tributos;

  return { tributos, aliquotaEfetiva, lucroLiquido };
}
