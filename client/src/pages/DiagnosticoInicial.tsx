import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Building2,
  TrendingUp,
  ClipboardCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  DollarSign,
  ShoppingCart,
  Loader2,
} from "lucide-react";

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

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
  step,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  step: number;
}) {
  return (
    <Card>
      <CardHeader className="px-5 py-5 flex flex-row items-center gap-4 pb-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary shrink-0">
          <Icon size={20} className="text-primary-foreground"/>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <span className="text-xs font-semibold text-accent-foreground uppercase">
              Passo {step}
            </span>
          </div>

          <h2 className="font-semibold text-card-foreground mt-0.5">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-6">
        {children}
      </CardContent>
    </Card>
  );
}

export function DiagInicial() {
  const [empresaData, setEmpresaData] = useState<{
    razao_social?: string;
    nome_fantasia?: string;
    uf?: string;
    municipio?: string;
  }>({});
  const [cnpjLoading, setCnpjLoading] = useState(false);
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

    setCnpjLoading(true);
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
    } finally {
      setCnpjLoading(false);
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

  const booleanFields = [
    {
      name: "paga_acima_piso" as const,
      label: "Paga salário acima do piso?",
      description: "Considera todos os funcionários ativos",
    },
    {
      name: "participa_outra_empresa" as const,
      label: "Participa de outra empresa?",
      description: "Como sócio, titular ou administrador",
    },
    {
      name: "importacao_direta" as const,
      label: "Realiza importação direta?",
      description: "Importação de mercadorias do exterior",
    },
    {
      name: "exporta_acima_limite" as const,
      label: "Exporta acima do limite permitido?",
      description: "Considera o limite anual do MEI",
    },
    {
      name: "possui_filial" as const,
      label: "Possui filial?",
      description: "Unidades adicionais de operação",
    },
  ];

  const isApto = analise?.status === "APTO";

  return (
    <div className="min-h-screen bg-background">
      <NavBarMain />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pt-24">
        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full mb-4">
            <ClipboardCheck size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase">
              Simulação gratuita
            </span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-3 leading-tight">
            Diagnóstico de Migração
          </h1>
          <p className="text-foreground leading-relaxed max-w-lg">
            Descubra se o seu MEI está apto para se transformar em uma
            Microempresa. Preencha os dados abaixo e receba uma análise
            imediata.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Identificação */}
            <SectionCard
              icon={Building2}
              title="Identificação da empresa"
              description="Informe o CNPJ para buscarmos os dados automaticamente"
              step={1}
            >
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="cnpj_mei"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        CNPJ da empresa <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="00.000.000/0001-00"
                            className="h-11"
                            onChange={(e) =>
                              field.onChange(formatCNPJ(e.target.value))
                            }
                            onBlur={(e) => handleSearchCNPJ(e.target.value)}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {cnpjLoading ? (
                              <Loader2 size={16} className="animate-spin text-primary" />
                            ) : (
                              <Search size={16} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {empresaData.uf && (
                  <div className="rounded-xl bg-secondary p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 size={15} className="text-primary" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        Empresa encontrada
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Razão social", value: empresaData.razao_social },
                        { label: "Nome fantasia", value: empresaData.nome_fantasia },
                        { label: "UF", value: empresaData.uf },
                        { label: "Município", value: empresaData.municipio },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-xs text-primary font-medium mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-secondary-foreground">
                            {item.value || "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Dados financeiros */}
            <SectionCard
              icon={TrendingUp}
              title="Dados financeiros"
              description="Valores referentes aos últimos 12 meses de operação"
              step={2}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="qtd_funcionario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Users size={14} />
                        Funcionários <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value || ""}
                          placeholder="0"
                          className="h-11"
                          onChange={(e) =>
                            field.onChange(
                              Number(formatOnlyNumbers(e.target.value))
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
                  name="faturamento_12m"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>
                        <DollarSign size={14}/>
                        Faturamento bruto (12 meses){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={formatCurrency(field.value)}
                          placeholder="R$ 0,00"
                          className="h-11"
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
                  name="compras_12m"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>
                        <ShoppingCart size={14}/>
                        Compras de mercadorias ou insumos (12 meses){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={formatCurrency(field.value)}
                          placeholder="R$ 0,00"
                          className="h-11"
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
            </SectionCard>

            {/* Situação da empresa */}
            <SectionCard
              icon={ClipboardCheck}
              title="Situação da empresa"
              description="Responda sobre as características operacionais do seu negócio"
              step={3}
            >
              <div className="space-y-1">
                {booleanFields.map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className={"flex items-center justify-between gap-4 py-4"}>
                        <div className="flex-1 min-w-0">
                          <FormLabel>
                            {item.label}
                          </FormLabel>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <FormControl>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              type="button"
                              onClick={() => field.onChange(true)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                                field.value === true
                                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                              }`}
                            >
                              Sim
                            </Button>
                            <Button
                              type="button"
                              onClick={() => field.onChange(false)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                                field.value === false
                                  ? "bg-gray-800 border-gray-800 text-white shadow-sm"
                                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                              }`}
                            >
                              Não
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </SectionCard>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Analisando...
                </>
              ) : (
                <>
                  Realizar diagnóstico
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-foreground pb-4">
              Análise baseada na legislação vigente do Simples Nacional
            </p>
          </form>
        </Form>
      </div>

      {/* Result Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto p-0 gap-0">
          {/* Status header */}
          <div
            className={`px-6 pt-6 pb-5 ${
              isApto
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${
                  isApto ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {isApto ? (
                  <CheckCircle2 size={24} className="text-green-600" />
                ) : (
                  <XCircle size={24} className="text-red-600" />
                )}
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-background mb-0.5">
                  Resultado do Diagnóstico
                </DialogTitle>
                <p className="text-sm text-muted">
                  MEI{" "}
                  <span
                    className={`font-bold ${
                      isApto ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {analise?.status}
                  </span>{" "}
                  para migração para Microempresa
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5">
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {analise?.analise}
            </DialogDescription>

            {analise?.motivos && analise.motivos.length > 0 && (
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={15} className="text-amber-500" />
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    Regras que impedem a migração
                  </p>
                </div>
                <ul className="space-y-2">
                  {analise.motivos.map((motivo, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="text-sm text-amber-800">{motivo.regra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 pb-6 gap-2 flex-col sm:flex-row">
            <Button
              variant="outline"
              onClick={handleNavigate}
              className="flex-1 h-10"
            >
              Ver mais informações
            </Button>
            <Button onClick={handleNavigate} className="flex-1 h-10">
              Continuar
              <ArrowRight size={16} className="ml-1.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
