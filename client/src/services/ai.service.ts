import { api } from "@/lib/api";

export type ChatMessage = {
  role: "user" | "bot";
  content: string;
  timestamp?: number;
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
  simulador?: {
    faturamento_12m?: number;
    recomendacao?: string;
  };
  checklist?: string[];
};

// 🔹 Enviar mensagem
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

// 🔹 Buscar histórico
export async function getAIHistory(): Promise<ChatMessage[]> {
  const { data } = await api.get("/ai/history");

  return data;
}
