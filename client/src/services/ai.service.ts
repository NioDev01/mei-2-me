import { api } from "@/lib/api";

export type ChatMessage = {
  role: "user" | "bot";
  content: string;
  timestamp?: number;
};

export type AtoConstitutivoContext = {
  naturezaJuridica?: string | null;
  capitalSocial?: number | null;
  titular?: { nome?: string; cpf?: string } | null;
  socios?: { nome?: string; cpf?: string }[];
};

export type SimuladorContext = {
  faturamento_12m?: number;
  recomendacao?: string;
  // Simples Nacional
  tributos_simples?: number;
  aliq_efetiva_simples?: number;
  lucro_liq_simples?: number;
  // Lucro Presumido
  tributos_lucrop?: number;
  aliq_efetiva_lucrop?: number;
  lucro_liq_lucrop?: number;
};

export type DiagnosticoContext = {
  status?: string | null;
  resumo?: string | null;
  principaisMotivos?: string[];
};

export type AIContext = {
  module?: string;
  jornada?: {
    steps?: {
      step: string;
      status: "completed" | "in_progress" | "available" | "locked";
    }[];
    progress?: number;
  };
  simulador?: SimuladorContext;
  // Array de labels legíveis dos documentos ainda pendentes
  checklist?: string[];
  diagnostico?: DiagnosticoContext;
  atoConstitutivo?: AtoConstitutivoContext;
};

// Enviar mensagem
export async function sendMessageToAI(
  message: string,
  context?: AIContext,
): Promise<{ text: string }> {
  const { data } = await api.post("/ai/chat", {
    message,
    context,
  });

  return data; // { text }
}

// Buscar histórico
export async function getAIHistory(): Promise<ChatMessage[]> {
  const { data } = await api.get("/ai/history");

  return data;
}