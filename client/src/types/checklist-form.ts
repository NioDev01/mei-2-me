import { z } from "zod";

export const checklistSchema = z.object({
  possui_rg: z.boolean(),
  possui_cpf: z.boolean(),
  possui_comprovante_residencia: z.boolean(),
  possui_cartao_cnpj: z.boolean(),
  comunicacao_desenquadramento_simei: z.boolean(),
  formulario_capa_marrom: z.boolean(),
  requerimento_desenquadramento: z.boolean(),
  comprovante_pagamento_dare: z.boolean(),
  ato_constitutivo: z.boolean(),
  possui_ccmei: z.boolean(),
  possui_cadesp: z.boolean(),
  comprovante_situacao_simples_nacional: z.boolean(),
});

export type ChecklistFormData = z.infer<typeof checklistSchema>;
