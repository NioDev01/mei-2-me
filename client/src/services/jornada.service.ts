import { api } from "@/lib/api";

// 🔹 Summary
export async function getJornadaSummary() {
  const { data } = await api.get("/jornada/summary");
  return data;
}

// 🔹 Checklist
export async function getChecklist(step: string) {
  const { data } = await api.get(`/jornada/steps/${step}/checklist`);
  return data;
}

// 🔹 Start
export async function startStep(step: string) {
  await api.post(`/jornada/steps/${step}/start`);
}

// 🔹 Toggle
export async function toggleItem(step: string, itemId: string) {
  await api.patch(`/jornada/steps/${step}/checklist/${itemId}`);
}

// 🔹 Complete
export async function completeStep(step: string) {
  await api.post(`/jornada/steps/${step}/complete`);
}
