interface ResultadoSimulador {
  faturamento_12m: number | string;
  receitas_financeiras: number | string;
  receitas_nao_operacionais: number | string;
  despesas_financeiras: number | string;
  tributos_simples: number | string;
  aliq_efetiva_simples: number | string;
  lucro_liq_simples: number | string;
  tributos_lucrop: number | string;
  aliq_efetiva_lucrop: number | string;
  lucro_liq_lucrop: number | string;
  recomendacao: "SN" | "LP";
}

export type { ResultadoSimulador };
