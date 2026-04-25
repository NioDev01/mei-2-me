import { api } from "@/lib/api";

export async function getSimulador() {
  const { data } = await api.get("/simulador-regimes");
  return data;
}
