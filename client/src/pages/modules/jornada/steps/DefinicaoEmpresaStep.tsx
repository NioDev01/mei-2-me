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

const formSchema = z.object({
  naturezaJuridica: z.enum(["EI", "LTDA", "SLU"]),

  capitalSocial: z
    .number()
    .positive("O capital social deve ser maior que zero"),

  titularNome: z.string().max(100).optional(),

  titularCpf: z
    .string()
    .regex(cpfRegex, "CPF inválido")
    .refine(isValidCPF, "CPF inválido")
    .optional(),

  socios: z
    .array(
      z.object({
        nome: z.string().min(1).max(100),
        cpf: z
          .string()
          .regex(cpfRegex, "CPF inválido")
          .refine(isValidCPF, "CPF inválido"),
      })
    )
    .default([]),
})
.superRefine((data, ctx) => {
  if (data.naturezaJuridica === "LTDA") {
    if (!data.titularNome) {
      ctx.addIssue({
        path: ["titularNome"],
        message: "Nome do titular obrigatório",
        code: z.ZodIssueCode.custom,
      })
    }

    if (!data.titularCpf) {
      ctx.addIssue({
        path: ["titularCpf"],
        message: "CPF do titular obrigatório",
        code: z.ZodIssueCode.custom,
      })
    }

    if (data.socios.length === 0) {
      ctx.addIssue({
        path: ["socios"],
        message: "LTDA deve possuir pelo menos um sócio",
        code: z.ZodIssueCode.custom,
      })
    }
  }

  if (data.naturezaJuridica === "SLU") {
    if (!data.titularNome || !data.titularCpf) {
      ctx.addIssue({
        path: ["titularNome"],
        message: "Titular obrigatório na SLU",
        code: z.ZodIssueCode.custom,
      })
    }
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
                <p>Nesta etapa, você precisa definir as informações básicas da sua nova empresa, como:</p>

                <ul className="list-disc pl-5 mt-2 mb-2">
                  <li>tipo de empresa (natureza jurídica)</li>
                  <li>atividades que ela irá exercer</li>
                  <li>capital inicial</li>
                  <li>e, se houver, participação de sócios</li>
                </ul>

                <p>Essas definições servem como base para toda a formalização da empresa nas próximas etapas.</p>
              </>
            ),
          },
          why: {
            title: "Por que isso é importante?",
            content: (
              <>
                <p>As escolhas feitas aqui impactam diretamente em:</p>

                <ul className="list-disc pl-5 mt-2 mb-2">
                  <li>como sua empresa será registrada</li>
                  <li>quais serão suas obrigações legais</li>
                  <li>como os impostos serão aplicados</li>
                  <li>e o nível de responsabilidade dos sócios (se houver)</li>
                </ul>

                <p>Em outras palavras: essa etapa define “como a sua empresa vai funcionar” do ponto de vista legal e fiscal.</p>
              </>
            ),
          },
          when: {
            title: "Quando isso é necessário?",
            content: (
              <>
                <p>Essa etapa acontece após o desenquadramento do MEI e antes da formalização da nova empresa.</p>
                <br />
                <p>É nesse momento que você estrutura sua empresa antes de registrá-la oficialmente.</p>
              </>
            ),
          },
          requirements: {
            title: "O que você vai precisar?",
            content: (
              <>
                <p>Para definir sua nova empresa, você deve ter uma ideia clara sobre:</p>

                <ul className="list-disc pl-5 mt-2 mb-2">
                  <li>quais atividades sua empresa irá exercer</li>
                  <li>onde ela irá funcionar</li>
                  <li>se você terá sócios ou atuará sozinho</li>
                  <li>quanto pretende investir inicialmente (capital social)</li>
                </ul>

                <p>Algumas dessas informações podem já ter sido informadas anteriormente na plataforma.</p>
              </>
            ),
          },
          form: { title: "Defina sua empresa", content: formContent },
        }}
        howTo={{
          title: "Entendendo as opções de tipo de empresa (natureza jurídica)",
          content: (
            <>
              <div className='grid md:grid-cols-3 gap-6'>
                <div className="space-y-2">
                  <p className="font-bold">Empresário Individual (EI)</p>

                  <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                    <li>Indicado para quem quer continuar atuando sozinho</li>
                    <li>Não há separação entre o patrimônio da empresa e o pessoal</li>
                    <li>Estrutura mais simples</li>
                  </ul>

                  <p>Pode ser uma opção para negócios menores ou com menor risco</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Sociedade Limitada (LTDA)</p>

                  <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                    <li>Utilizada quando há dois ou mais sócios</li>
                    <li>Define responsabilidades e participação de cada sócio</li>
                    <li>O patrimônio pessoal dos sócios é, em geral, separado do da empresa</li>
                  </ul>
                  
                  <p>É um dos modelos mais comuns no Brasil</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Sociedade Limitada Unipessoal (SLU)</p>

                  <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                    <li>Permite abrir uma empresa sozinho, com características de uma LTDA</li>
                    <li>Há separação entre patrimônio pessoal e empresarial</li>
                    <li>Não exige sócios</li>
                  </ul>

                  <p>É uma alternativa moderna para quem quer empreender sozinho com mais proteção</p>
                </div>
              </div>
            </>
          ),
        }}
        tips={{
          title: "Dicas e cuidados",
          content: (
            <>
              <ul className="list-disc pl-5 mt-2 mb-2">
                <li>A escolha da natureza jurídica impacta diretamente na responsabilidade sobre dívidas da empresa</li>
                <li>Definir corretamente as atividades (CNAE) evita problemas fiscais futuros</li>
                <li>O capital social deve ser compatível com a realidade do negócio</li>
                <li>Em caso de dúvida, o apoio de um contador pode ajudar na escolha mais adequada</li>
              </ul>
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