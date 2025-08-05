import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { NavBarMain } from "@/features/NavBarMain"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  cnpj: z.string()
    .min(1, "CNPJ é obrigatório")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
  uf: z.string()
    .min(1, "UF é obrigatório")
    .length(2, "UF deve ter 2 caracteres")
    .regex(/^[A-Za-z]+$/, "UF deve conter apenas letras"),
  municipio: z.string()
    .min(1, "Município é obrigatório")
    .regex(/^[a-zA-Z\s]+$/, "Município deve conter apenas letras"),
  qtdFuncionarios: z.string()
    .min(1, "Quantidade de funcionários é obrigatória")
    .regex(/^\d+$/, "Deve conter apenas números"),
  faturamento: z.string()
    .min(1, "Faturamento é obrigatório")
    .regex(/^\d+$/, "Deve conter apenas números"),
  gastos: z.string()
    .min(1, "Gastos são obrigatórios")
    .regex(/^\d+$/, "Deve conter apenas números"),
  salarioMaior: z.enum(["sim1", "nao1"]),
  possuiSocios: z.enum(["sim2", "nao2"]),
  importouMercadorias: z.enum(["sim3", "nao3"]),
  precisaNotasFiscais: z.enum(["sim4", "nao4"]),
  motivosMigracao: z.array(z.string()).optional(),
  possibilidades: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function DiaInicial() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      uf: '',
      municipio: '',
      qtdFuncionarios: '',
      faturamento: '',
      gastos: '',
      salarioMaior: "nao1",
      possuiSocios: "nao2",
      importouMercadorias: "nao3",
      precisaNotasFiscais: "nao4",
      motivosMigracao: [],
      possibilidades: ''
    },
    mode: "onChange",
  })

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 14)
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
   const formatUF = (value: string) => {
    const lettersOnly = value.replace(/[^a-zA-Z]/g, '').toUpperCase()
    return lettersOnly.slice(0, 2)
  }

  const formatOnlyNumbers = (value: string) => value.replace(/\D/g, '')
  const formatOnlyLetters = (value: string) => value.replace(/[^a-zA-Z\s]/g, '')

  const onSubmit = (data: FormValues) => {
    console.log("Dados do formulário:", data)
    alert('Formulário válido!')
  }

  return (
    <div className="min-h-screen p-6">
      <NavBarMain />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">DIAGNÓSTICO INICIAL</h1>
          <p className="mb-2">
            Quer fazer uma simulação para verificar se você está apto a se transformar em uma Microempresa?
          </p>
          <p>
            Preencha o formulário abaixo e saiba agora.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ da empresa *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: 00.000.000/0001-00"
                        onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qtdFuncionarios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de funcionários na empresa *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: 10"
                        onChange={(e) => field.onChange(formatOnlyNumbers(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF de registro *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="SP"
                        onChange={(e) =>  {
                          const formattedValue = formatUF(e.target.value)
                          field.onChange(formattedValue)
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Município de registro *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Campinas"
                        onChange={(e) => field.onChange(formatOnlyLetters(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="faturamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-3.5">Quanto foi o faturamento de MEI nos últimos 12 meses? *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: R$ 20.000,00"
                        onChange={(e) => field.onChange(formatOnlyNumbers(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gastos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quanto foi gasto em compras de mercadorias ou insumos nos últimos 12 meses? *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: R$ 20.000,00"
                        onChange={(e) => field.onChange(formatOnlyNumbers(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <FormField
                control={form.control}
                name="salarioMaior"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-4 block">
                      Você paga um salário maior do que o piso da categoria ou um salário mínimo para seu funcionário?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim1" id="sim1" />
                          <Label htmlFor="sim1">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao1" id="nao1" />
                          <Label htmlFor="nao1">Não</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="possuiSocios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-4 block">
                      Você possui um sócio de sócios, administrador ou titular em uma empresa?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim2" id="sim2" />
                          <Label htmlFor="sim2">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao2" id="nao2" />
                          <Label htmlFor="nao2">Não</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="importouMercadorias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-4 block">
                      Fez importação de mercadorias ou insumos para revenda?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim3" id="sim3" />
                          <Label htmlFor="sim3">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao3" id="nao3" />
                          <Label htmlFor="nao3">Não</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="precisaNotasFiscais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-4 block">
                      Você precisa entrar fiscais para pessoas jurídicas (outras empresas)?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim4" id="sim4" />
                          <Label htmlFor="sim4">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao4" id="nao4" />
                          <Label htmlFor="nao4">Não</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8">
              <FormField
                control={form.control}
                name="motivosMigracao"
                render={() => (
                  <FormItem>
                    <FormLabel className="mb-4 block">
                      Por quais motivos você considera fazer a migração?
                    </FormLabel>
                    <div className="space-y-3">
                      {[
                        { id: "faturamento-proximo", label: "Faturamento próximo ao limite", value: "faturamento" },
                        { id: "necessidade-contratar", label: "Necessidade de contratar mais funcionários", value: "funcionarios" },
                        { id: "expansao-atividades", label: "Expansão de atividades", value: "expansao" },
                        { id: "experiencia-clientes", label: "Experiência de clientes / fornecedores", value: "clientes" },
                        { id: "acesso-credito", label: "Acesso a crédito", value: "credito" },
                        { id: "outros", label: "Outros (especificar)", value: "outros" },
                      ].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="motivosMigracao"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...(field.value || []), item.value]
                                      : field.value?.filter((v) => v !== item.value)
                                    field.onChange(newValue)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8">
              <FormField
                control={form.control}
                name="possibilidades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ex: Possibilidades de ter sócios</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[100px]"
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full py-3 text-lg">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}