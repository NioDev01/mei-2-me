"use client"

import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"

import {
  getEmpresaTransicao,
  saveEmpresaTransicao,
} from "@/services/ato-constitutivo.service"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NumericFormat } from "react-number-format"

import { isValidCPF } from "@/utils/valid-cpf.util"

// ===============================
// HELPERS
// ===============================

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

const formatCpf = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

// ===============================
// SCHEMA
// ===============================

const formSchema = z
  .object({
    naturezaJuridica: z.enum(["EI", "LTDA", "SLU"]),

    capitalSocial: z
      .number()
      .positive("O capital social deve ser maior que zero"),

    titularNome: z
      .string()
      .max(100, "Máximo de 100 caracteres")
      .optional(),

    titularCpf: z
      .string()
      .optional()
      .refine((cpf) => !cpf || cpfRegex.test(cpf), {
        message: "CPF inválido",
      })
      .refine((cpf) => !cpf || isValidCPF(cpf), {
        message: "CPF inválido",
      }),

    socios: z
      .array(
        z.object({
          nome: z
            .string()
            .min(1, "Nome obrigatório")
            .max(100, "Máximo de 100 caracteres"),

          cpf: z
            .string()
            .refine((cpf) => cpfRegex.test(cpf), {
              message: "CPF inválido",
            })
            .refine((cpf) => isValidCPF(cpf), {
              message: "CPF inválido",
            }),
        })
      )
      .default([]),
  })
  .superRefine((data, ctx) => {
    const { naturezaJuridica, titularNome, titularCpf, socios } = data

    // ===============================
    // LTDA
    // ===============================
    if (naturezaJuridica === "LTDA") {
      if (!titularNome) {
        ctx.addIssue({
          path: ["titularNome"],
          message: "Nome do titular obrigatório",
          code: z.ZodIssueCode.custom,
        })
      }

      if (!titularCpf) {
        ctx.addIssue({
          path: ["titularCpf"],
          message: "CPF do titular obrigatório",
          code: z.ZodIssueCode.custom,
        })
      }

      if (socios.length === 0) {
        ctx.addIssue({
          path: ["socios"],
          message: "LTDA deve possuir pelo menos um sócio",
          code: z.ZodIssueCode.custom,
        })
      }
    }

    // ===============================
    // SLU
    // ===============================
    if (naturezaJuridica === "SLU") {
      if (!titularNome) {
        ctx.addIssue({
          path: ["titularNome"],
          message: "Nome do titular obrigatório",
          code: z.ZodIssueCode.custom,
        })
      }

      if (!titularCpf) {
        ctx.addIssue({
          path: ["titularCpf"],
          message: "CPF do titular obrigatório",
          code: z.ZodIssueCode.custom,
        })
      }
    }

    // ===============================
    // VALIDAÇÕES AVANÇADAS
    // ===============================

    // 🔹 CPFs duplicados entre sócios
    const cpfSet = new Set<string>()

    socios.forEach((s, index) => {
      if (cpfSet.has(s.cpf)) {
        ctx.addIssue({
          path: ["socios", index, "cpf"],
          message: "CPF duplicado entre sócios",
          code: z.ZodIssueCode.custom,
        })
      }

      cpfSet.add(s.cpf)
    })

    // 🔹 Sócio com mesmo CPF do titular
    if (titularCpf) {
      socios.forEach((s, index) => {
        if (s.cpf === titularCpf) {
          ctx.addIssue({
            path: ["socios", index, "cpf"],
            message: "Sócio não pode ter o mesmo CPF do titular",
            code: z.ZodIssueCode.custom,
          })
        }
      })
    }
  })

type FormData = z.infer<typeof formSchema>

// ===============================
// COMPONENT
// ===============================

export function DefinicaoEmpresaStep() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    nextValue: string | null
  }>({
    open: false,
    nextValue: null,
  })

  const [novoSocio, setNovoSocio] = useState({
    nome: "",
    cpf: "",
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      naturezaJuridica: undefined,
      capitalSocial: 0,
      titularNome: "",
      titularCpf: "",
      socios: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const sociosError = form.formState.errors.socios?.message

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socios",
  })

  const natureza = form.watch("naturezaJuridica")

  // ===============================
  // TROCA COM CONFIRMAÇÃO
  // ===============================

  function handleNatureChange(value: string) {
    if (!isHydrated) {
      form.setValue("naturezaJuridica", value as any)
      return
    }

    const current = form.getValues("naturezaJuridica")
    const socios = form.getValues("socios")

    if (current === "LTDA" && socios.length > 0 && value !== "LTDA") {
      setConfirmDialog({ open: true, nextValue: value })
      return
    }

    form.setValue("naturezaJuridica", value as any)
  }

  function confirmChange() {
    if (!confirmDialog.nextValue) return

    form.setValue("socios", [])
    form.setValue("naturezaJuridica", confirmDialog.nextValue as any)

    setConfirmDialog({ open: false, nextValue: null })
  }

  function cancelChange() {
    setConfirmDialog({ open: false, nextValue: null })
  }

  // ===============================
  // LOAD
  // ===============================

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const res = await getEmpresaTransicao()
      setData(res)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // HIDRATAÇÃO
  // ===============================

  useEffect(() => {
    if (!data) return

    form.reset({
      naturezaJuridica: data.naturezaJuridica,
      capitalSocial:
        data.eiData?.capitalSocial ||
        data.ltdaData?.capitalSocial ||
        0,
      titularNome: data.ltdaData?.titular?.nome || "",
      titularCpf: data.ltdaData?.titular?.cpf || "",
      socios: data.ltdaData?.socios || [],
    })

    setTimeout(() => setIsHydrated(true), 0)

  }, [data])

  // ===============================
  // SUBMIT
  // ===============================

  async function onSubmit(values: FormData) {
    setIsSubmitting(true)

    try {
      const payload =
        values.naturezaJuridica === "EI"
          ? {
              naturezaJuridica: "EI",
              eiData: { capitalSocial: values.capitalSocial },
            }
          : {
              naturezaJuridica: values.naturezaJuridica,
              ltdaData: {
                capitalSocial: values.capitalSocial,
                titular: {
                  nome: values.titularNome,
                  cpf: values.titularCpf,
                },
                socios: values.socios,
              },
            }

      await saveEmpresaTransicao(payload)

      toast.success("Dados salvos com sucesso!")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao salvar")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div>Carregando...</div>

  // ===============================
  // FORM
  // ===============================

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Natureza */}
        <FormItem>
          <FormLabel>Natureza Jurídica</FormLabel>
          <Select onValueChange={handleNatureChange} value={natureza}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="EI">EI</SelectItem>
              <SelectItem value="LTDA">LTDA</SelectItem>
              <SelectItem value="SLU">SLU</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Capital */}
        <FormField
          control={form.control}
          name="capitalSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capital Social</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  className="border rounded-md h-10 w-full px-3"
                  onValueChange={(v) =>
                    field.onChange(v.floatValue || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Titular */}
        {(natureza === "LTDA" || natureza === "SLU") && (
          <>
            <FormField
              control={form.control}
              name="titularNome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Titular</FormLabel>
                  <Input {...field} maxLength={100} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titularCpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    {...field}
                    maxLength={14}
                    onChange={(e) =>
                      field.onChange(formatCpf(e.target.value))
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Sócios */}
        {natureza === "LTDA" && (
          <div className="space-y-4">
            <p className="font-medium">Sócios</p>

            <div className="grid md:grid-cols-2 gap-2">
              <Input
                placeholder="Nome"
                value={novoSocio.nome}
                onChange={(e) =>
                  setNovoSocio({ ...novoSocio, nome: e.target.value })
                }
              />
              <Input
                placeholder="CPF"
                value={novoSocio.cpf}
                onChange={(e) =>
                  setNovoSocio({
                    ...novoSocio,
                    cpf: formatCpf(e.target.value),
                  })
                }
              />
            </div>

            <Button
              type="button"
              onClick={() => {
                if (!novoSocio.nome) {
                  toast.error("Nome obrigatório")
                  return
                }

                if (!isValidCPF(novoSocio.cpf)) {
                  toast.error("CPF inválido")
                  return
                }

                if (
                  fields.some((s) => s.cpf === novoSocio.cpf)
                ) {
                  toast.error("CPF duplicado")
                  return
                }

                if (novoSocio.cpf === form.getValues("titularCpf")) {
                  toast.error("Sócio não pode ser o titular")
                  return
                }

                append(novoSocio)
                setNovoSocio({ nome: "", cpf: "" })
              }}
            >
              Adicionar sócio
            </Button>

            {fields.map((s, i) => (
              <div key={s.id} className="flex justify-between border p-2 rounded">
                <div>
                  <p>{s.nome}</p>
                  <p className="text-sm">{s.cpf}</p>
                </div>
                <Button variant="destructive" onClick={() => remove(i)}>
                  Remover
                </Button>
              </div>
            ))}

            {/* 🔥 ERRO INLINE */}
            {sociosError && (
              <FormMessage>
                {form.formState.errors.socios?.message as string}
              </FormMessage>
            )}
          </div>
        )}

        <Button type="submit" className="w-full">
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>

      </form>
    </Form>
  )

  return (
    <>
      <StepTemplate
        sections={{
          whatIs: {
            title: "O que é a Definição da Nova Empresa?",
            content: (
              <>
                <p>
                  Nesta etapa, você vai definir a <b>estrutura jurídica da sua nova empresa</b>,
                  ou seja, como ela será formalizada após sair do MEI.
                </p>

                <div className="mt-3 space-y-2 text-muted-foreground">
                  <p>Você irá informar diretamente no formulário:</p>

                  <ul className="list-disc pl-5">
                    <li>o tipo de empresa (natureza jurídica)</li>
                    <li>o capital social</li>
                    <li>os dados do titular</li>
                    <li>os sócios (se houver)</li>
                  </ul>
                </div>

                <div className="mt-4 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                  <b>Importante:</b> informações como atividades (CNAE), CNPJ e localização
                  já foram obtidas automaticamente do seu cadastro como MEI e serão reutilizadas na geração do documento.
                </div>

                <p className="mt-3">
                  Você poderá revisar e ajustar essas informações posteriormente no documento final, se necessário.
                </p>
              </>
            ),
          },

          why: {
            title: "Por que isso é importante?",
            content: (
              <>
                <p>As decisões tomadas aqui definem a base legal da sua empresa.</p>

                <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="border rounded-md p-3">
                    <p className="font-medium text-foreground">Impacto jurídico</p>
                    <ul className="list-disc pl-4 mt-1">
                      <li>responsabilidade sobre dívidas</li>
                      <li>separação de patrimônio</li>
                    </ul>
                  </div>

                  <div className="border rounded-md p-3">
                    <p className="font-medium text-foreground">Impacto operacional</p>
                    <ul className="list-disc pl-4 mt-1">
                      <li>estrutura da empresa</li>
                      <li>relação entre sócios</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-3">
                  Essas definições serão usadas automaticamente na geração do <b>Ato Constitutivo</b>.
                </p>
              </>
            ),
          },

          when: {
            title: "Quando isso é necessário?",
            content: (
              <>
                <p>
                  Essa etapa acontece <b>após o desenquadramento do MEI</b> e antes da
                  formalização da nova empresa.
                </p>

                <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                  Aqui você define a estrutura da empresa antes de gerar os documentos oficiais.
                </div>
              </>
            ),
          },

          requirements: {
            title: "O que você precisa definir?",
            content: (
              <>
                <p>Para preencher esta etapa, você deve decidir:</p>

                <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                  <li>se irá atuar sozinho ou com sócios</li>
                  <li>qual nível de proteção patrimonial deseja</li>
                  <li>quanto pretende investir inicialmente</li>
                </ul>

                <div className="mt-4 border rounded-md p-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">📌 Dados já preenchidos automaticamente</p>
                  <ul className="list-disc pl-4">
                    <li>CNPJ</li>
                    <li>Razão social</li>
                    <li>Atividades (CNAE)</li>
                    <li>Município/UF</li>
                  </ul>
                </div>
              </>
            ),
          },

          form: {
            title: "Defina sua nova empresa",
            content: formContent,
          },
        }}

        howTo={{
          title: "Escolha o tipo de empresa",
          content: (
            <div className="grid md:grid-cols-3 gap-4">

              <div className="border rounded-lg p-4 space-y-2">
                <p className="font-bold text-lg">Empresário Individual</p>
                <p className="text-xs text-muted-foreground">EI</p>

                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Atuação individual</li>
                  <li>Estrutura simples</li>
                  <li>Sem separação de patrimônio</li>
                </ul>

                <div className="text-xs text-muted-foreground">
                  👉 Mais simples, porém com maior risco pessoal
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <p className="font-bold text-lg">Sociedade Limitada</p>
                <p className="text-xs text-muted-foreground">LTDA</p>

                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Dois ou mais sócios</li>
                  <li>Divisão de responsabilidades</li>
                  <li>Proteção patrimonial</li>
                </ul>

                <div className="text-xs text-muted-foreground">
                  👉 Ideal para negócios em parceria
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-2 border-primary">
                <p className="font-bold text-lg">Sociedade Unipessoal</p>
                <p className="text-xs text-muted-foreground">SLU</p>

                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Atuação individual</li>
                  <li>Proteção patrimonial</li>
                  <li>Sem necessidade de sócios</li>
                </ul>

                <div className="text-xs text-muted-foreground">
                  👉 Melhor opção para quem quer segurança sem sócios
                </div>
              </div>

            </div>
          ),
        }}

        tips={{
          title: "Dicas importantes",
          content: (
            <>
              <div className="space-y-2 text-muted-foreground">

                <p>✔ Você não precisa se preocupar com CNAE neste momento — já utilizamos os dados do seu MEI</p>
                <p>✔ Revise os dados antes de gerar o documento final</p>
                <p>✔ Escolha a natureza jurídica pensando no crescimento do seu negócio</p>

                <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
                  Em caso de dúvida, um contador pode ajudar a validar sua escolha.
                </div>

              </div>
            </>
          ),
        }}
      />

      {/* ALERT DIALOG */}
      <AlertDialog open={confirmDialog.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alterar natureza?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao mudar de LTDA, todos os sócios serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelChange}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmChange}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}