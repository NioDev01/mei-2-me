interface ResultadoSimulador {
  faturamento_12m: number;
  receitas_financeiras: number;
  receitas_nao_operacionais: number;
  despesas_financeiras: number;
  tributos_simples: number;
  aliq_efetiva_simples: number;
  lucro_liq_simples: number;
  tributos_lucrop: number;
  aliq_efetiva_lucrop: number;
  lucro_liq_lucrop: number;
  recomendacao: "SN" | "LP";
}

export type { ResultadoSimulador };
