export interface DiagnosticoData {
  mei?: {
    razao_social?: string;
    municipio_mei?: string;
    uf_mei?: string;
    qtd_funcionario?: number;
    faturamento_12m?: number;
    compras_12m?: number;
  };
  analise?: {
    status?: "APTO" | "NÃO APTO";
    analise?: string;
  };
}
