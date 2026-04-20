import { api } from "@/lib/api";

export async function getDiagnostico(cnpj: string) {
  const { data } = await api.get(`/diagnostico-inicial/${cnpj}`);
  return data;
}
