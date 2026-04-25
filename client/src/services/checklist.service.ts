import { api } from "@/lib/api";

export async function getChecklistDocumentos() {
  const { data } = await api.get("/checklist-documentos");
  return data;
}
