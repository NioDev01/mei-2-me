import { api } from "@/lib/api";

// 🔹 GET → buscar dados
export async function getEmpresaTransicao() {
  const { data } = await api.get("/ato-constitutivo");
  return data;
}

// 🔹 POST → salvar dados
export async function saveEmpresaTransicao(payload: any) {
  const { data } = await api.post("/ato-constitutivo", payload);
  return data;
}

// 🔹 POST → gerar documento
export async function generateAtoConstitutivo() {
  const response = await api.post(
    "/ato-constitutivo/generate",
    {},
    {
      responseType: "blob",
    },
  );

  return response.data;
}
