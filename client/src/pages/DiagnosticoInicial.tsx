import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NavBarMain } from "@/features/NavBarMain";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  cnpj_mei: z.string().min(14, "CNPJ inválido").max(18),
  qtd_funcionario: z.coerce.number().min(0),
  faturamento_12m: z.coerce.number().min(0),
  compras_12m: z.coerce.number().min(0),
  paga_acima_piso: z.boolean(),
  participa_outra_empresa: z.boolean(),
  importacao_direta: z.boolean(),
  exporta_acima_limite: z.boolean(),
  possui_filial: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function DiagInicial() {
  const [empresaData, setEmpresaData] = useState<{
    razao_social?: string;
    nome_fantasia?: string;
    uf?: string;
    municipio?: string;
  }>({});
  const [analise, setAnalise] = useState<null | {
    cnpj: string;
    razaoSocial: string;
    status: "APTO" | "NÃO APTO";
    analise: string;
    motivos: {
      regra: string;
      razoes: string[];
      riscos: string[];
      referenciasLegais: string[];
    }[];
  }>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { refreshUser } = useAuth();

  const navigate = useNavigate();

  const handleNavigate = async () => {
    setOpen(false);

    await refreshUser();

    setTimeout(() => {
      navigate("/app");
    }, 0);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj_mei: "",
      qtd_funcionario: 0,
      faturamento_12m: 0,
      compras_12m: 0,
      paga_acima_piso: false,
      participa_outra_empresa: false,
      importacao_direta: false,
      exporta_acima_limite: false,
      possui_filial: false,
    },
  });

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const formatCurrency = (value: number) => {
    if (!value && value !== 0) return "";

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatOnlyNumbers = (value: string) => value.replace(/\D/g, "");

  const handleSearchCNPJ = async (cnpj: string) => {
    const clean = cnpj.replace(/\D/g, "");

    if (clean.length !== 14) return;

    try {
      const res = await api.get(`diagnostico-inicial/cnpj/${clean}`);
      const data = res.data;

      setEmpresaData({
        razao_social: data.razao_social,
        nome_fantasia: data.nome_fantasia,
        uf: data.uf,
        municipio: data.municipio,
      });
    } catch (error) {
      console.error(`Erro ao buscar CNPJ: ${error}`);
      setEmpresaData({});
      toast.error("Não foi possível buscar os dados do CNPJ.");
    }
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      cnpj_mei: data.cnpj_mei.replace(/\D/g, ""),
    };

    setLoading(true);

    try {
      const res = await api.post("diagnostico-inicial", payload);
      setAnalise(res.data.analise);
      setOpen(true);
      toast.success("Diagnóstico realizado com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar formulário", err);
      toast.error("Ocorreu um erro ao tentar enviar o diagnóstico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen p-6'>
      <NavBarMain />
      <div className='max-w-4xl mx-auto px-6 py-24'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold mb-4'>DIAGNÓSTICO INICIAL</h1>
          <p className='mb-2'>
            Quer fazer uma simulação para verificar se você está apto a se
            transformar em uma Microempresa?
          </p>
          <p>Preencha o formulário abaixo e saiba agora.</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='p-6 rounded-lg space-y-8'
          >
            <div>
              <h2 className='text-sm font-semibold uppercase tracking-wide mb-4'>
                Identificação
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='cnpj_mei'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ da empresa *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Ex: 00.000.000/0001-00'
                          onChange={(e) =>
                            field.onChange(formatCNPJ(e.target.value))
                          }
                          onBlur={(e) => handleSearchCNPJ(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Placeholder invisível para manter o CNPJ na primeira coluna */}
                {!empresaData.uf && <div className='hidden md:block' />}

                {/* Dados da empresa (readonly) */}
                {empresaData.uf && (
                  <>
                    <FormItem>
                      <FormLabel className='text-gray-400'>
                        Razão social
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='bg-accent cursor-not-allowed opacity-50'
                          value={empresaData.razao_social}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel className='text-gray-400'>
                        Nome fantasia
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='bg-accent cursor-not-allowed opacity-50'
                          value={empresaData.nome_fantasia}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel className='text-gray-400'>UF</FormLabel>
                      <FormControl>
                        <Input
                          className='bg-accent cursor-not-allowed opacity-50'
                          value={empresaData.uf}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel className='text-gray-400'>Município</FormLabel>
                      <FormControl>
                        <Input
                          className='bg-accent cursor-not-allowed opacity-50'
                          value={empresaData.municipio}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              </div>
            </div>

            {/* Dados financeiros */}
            <div>
              <h2 className='text-sm font-semibold uppercase tracking-wide mb-4'>
                Dados financeiros
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='qtd_funcionario'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade de funcionários *</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          placeholder='Ex: 10'
                          onChange={(e) =>
                            field.onChange(
                              Number(formatOnlyNumbers(e.target.value)),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='faturamento_12m'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Quanto foi o faturamento de MEI nos últimos 12 meses? *
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={formatCurrency(field.value)}
                          placeholder='Ex: R$ 20.000,00'
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            field.onChange(digits ? Number(digits) / 100 : 0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='compras_12m'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Quanto foi gasto em compras de mercadorias ou insumos
                        nos últimos 12 meses? *
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={formatCurrency(field.value)}
                          placeholder='Ex: R$ 20.000,00'
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            field.onChange(digits ? Number(digits) / 100 : 0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Situação da empresa */}
            <div>
              <h2 className='text-sm font-semibold uppercase tracking-wide mb-4'>
                Situação da empresa
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-6'>
                {[
                  { name: "paga_acima_piso", label: "Paga acima do piso?" },
                  {
                    name: "participa_outra_empresa",
                    label: "Participa de outra empresa?",
                  },
                  { name: "importacao_direta", label: "Importa mercadorias?" },
                  {
                    name: "exporta_acima_limite",
                    label: "Exporta acima do limite?",
                  },
                  { name: "possui_filial", label: "Possui filial?" },
                ].map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name as keyof FormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={String(field.value)}
                            onValueChange={(val) =>
                              field.onChange(val === "true")
                            }
                          >
                            <div className='flex gap-10'>
                              <div className='flex items-center gap-2'>
                                <RadioGroupItem value='true' />
                                <Label>Sim</Label>
                              </div>
                              <div className='flex items-center gap-2'>
                                <RadioGroupItem value='false' />
                                <Label>Não</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className='mt-8'>
              <Button
                type='submit'
                className='w-full py-3 text-lg'
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-primary'>
              Resultado do Diagnóstico
            </DialogTitle>
            <p className='text-sm text-muted-foreground'>
              O usuário está{" "}
              <span
                className={`font-semibold text-sm ${analise?.status === "APTO" ? "text-[#49af50]" : "text-red-700"}`}
              >
                {analise?.status}
              </span>{" "}
              para fazer a migração!
            </p>
          </DialogHeader>

          <div className='mt-4'>
            <DialogDescription className='text-muted-foreground'>
              {analise?.analise}.
            </DialogDescription>
          </div>

          {analise?.motivos && analise.motivos.length > 0 && (
            <div className='space-y-2 '>
              <p className='font-semibold text-primary'>Regras violadas:</p>
              <ul className='list-disc pl-4 space-y-1'>
                {analise.motivos.map((motivo, i) => (
                  <li key={i} className='text-sm text-muted-foreground'>
                    {motivo.regra}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DialogFooter>
            <Button variant='outline' onClick={handleNavigate}>
              Ver mais informações
            </Button>
            <Button onClick={handleNavigate}>Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
