import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Trash2, User, ArrowLeft, UserLock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleTemas } from "@/features/ToggleTemas";
import mei2me from "@/assets/mei2me.png";
import type { ContaData } from "@/interfaces/account";
import type { MeiData } from "@/interfaces/mei";

type Tab = "informacoes" | "seguranca";

const senhaSchema = z
  .object({
    senhaAtual: z.string().min(1, "Informe a senha atual"),
    novaSenha: z
      .string()
      .min(6, "A nova senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string().min(1, "Confirme a nova senha"),
  })
  .refine((d) => d.novaSenha === d.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type SenhaForm = z.infer<typeof senhaSchema>;

const fmt = (n?: number) =>
  n?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }) ?? "—";

const fmtCnpj = (cnpj?: string) =>
  cnpj?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") ?? "—";

const fmtCelular = (value?: string) => {
  if (!value) return "—";

  const digits = value.replace(/\D/g, "").slice(0, 11);

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

interface FieldProps {
  label: string;
  value?: string | number;
  readOnly?: boolean;
}

function Field({ label, value, readOnly }: FieldProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <p className='text-xs font-medium text-muted-foreground'>{label}</p>
      <div
        className={`h-10 flex items-center px-3 rounded-md border text-sm ${
          readOnly
            ? "bg-muted/30 text-muted-foreground border-border/50"
            : "bg-muted/50 text-foreground border-border"
        }`}
      >
        {value ?? "—"}
      </div>
    </div>
  );
}

export function DadosConta() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("informacoes");
  const [conta, setConta] = useState<ContaData | null>(null);
  const [mei, setMei] = useState<MeiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletando, setIsDeletando] = useState(false);
  const [isSalvandoSenha, setIsSalvandoSenha] = useState(false);

  const form = useForm<SenhaForm>({
    resolver: zodResolver(senhaSchema),
    defaultValues: { senhaAtual: "", novaSenha: "", confirmarSenha: "" },
  });

  useEffect(() => {
    Promise.all([
      api
        .get("/auth/me")
        .then((r) => setConta(r.data))
        .catch(() => null),

      api
        .get("diagnostico-inicial")
        .then((r) => setMei(r.data?.mei ?? null))
        .catch(() => null),
    ]).finally(() => setIsLoading(false));
  }, []);

  const handleSalvarSenha = async (data: SenhaForm) => {
    setIsSalvandoSenha(true);
    try {
      await api.patch("/auth/senha", {
        senhaAtual: data.senhaAtual,
        novaSenha: data.novaSenha,
      });
      toast.success("Senha atualizada com sucesso.");
      form.reset();
    } catch {
      toast.error("Erro ao atualizar a senha. Verifique a senha atual.");
    } finally {
      setIsSalvandoSenha(false);
    }
  };

  const handleDeletarConta = async () => {
    setIsDeletando(true);
    try {
      await api.delete("/auth/me");
      toast.success("Conta deletada com sucesso.");
      await logout();
      navigate("/");
    } catch {
      toast.error("Erro ao deletar a conta. Tente novamente.");
    } finally {
      setIsDeletando(false);
    }
  };

  const iniciais =
    conta?.nome
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("") ?? "?";

  if (isLoading) {
    return (
      <div className='space-y-4 pt-3'>
        <Skeleton className='h-24 w-full rounded-xl' />
        <Skeleton className='h-48 w-full rounded-xl' />
        <Skeleton className='h-48 w-full rounded-xl' />
      </div>
    );
  }

  return (
    <div className='min-h-screen p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate("/app")}
            className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
          <p className='select-none text-muted-foreground'>|</p>
          <h1 className='text-sm font-bold'>Minha Conta</h1>
        </div>
        <div className='flex items-center gap-4'>
          <Link
            to='/'
            className='h-8 w-8 hover:scale-110 transition-transform duration-300'
          >
            <img className='h-full w-full' src={mei2me} alt='Logo' />
          </Link>
          <ToggleTemas />
        </div>
      </div>

      <div className='space-y-6 max-w-2xl mx-auto'>
        {/* Tabs */}
        <div className='flex border-b border-border'>
          {(
            [
              { key: "informacoes", label: "Informações" },
              { key: "seguranca", label: "Segurança" },
            ] as { key: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === t.key
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Informações */}
        {tab === "informacoes" && (
          <div className='bg-background border border-border/50 rounded-xl p-8 space-y-6'>
            {/* Perfil */}
            <div className='flex items-center gap-5 pb-6 border-b border-border/50'>
              <div className='w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-medium text-xl shrink-0'>
                {iniciais}
              </div>
              <div>
                <p className='font-medium text-base'>{conta?.nome ?? "—"}</p>
                <p className='text-sm text-muted-foreground mt-0.5'>
                  {conta?.email ?? "—"}
                </p>
              </div>
            </div>

            {/* Dados cadastrais */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300/10'>
                  <User size={14} className='text-blue-700' />
                </div>
                <p className='text-sm font-medium'>Dados cadastrais</p>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <Field label='Nome completo' value={conta?.nome} readOnly />
                <Field label='E-mail' value={conta?.email} readOnly />
                <Field
                  label='Celular'
                  value={fmtCelular(conta?.celular)}
                  readOnly
                />
                <Field label='CNPJ' value={fmtCnpj(conta?.cnpj)} readOnly />
              </div>
            </div>

            <Separator />

            {mei && (
              <div>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300/10'>
                    <Building size={14} className='text-blue-700' />
                  </div>
                  <p className=' text-sm font-medium'>Dados do MEI</p>
                </div>

                <div className='grid grid-cols-2 gap-5'>
                  <Field
                    label='Razão social'
                    value={mei.razao_social}
                    readOnly
                  />
                  <Field label='CNPJ' value={fmtCnpj(mei.cnpj_mei)} readOnly />
                  <Field
                    label='Cidade / UF'
                    value={`${mei.municipio_mei} / ${mei.uf_mei}`}
                    readOnly
                  />
                  <Field
                    label='Funcionários'
                    value={mei.qtd_funcionario}
                    readOnly
                  />
                  <Field
                    label='Faturamento anual'
                    value={fmt(mei.faturamento_12m)}
                    readOnly
                  />
                  <Field
                    label='Compras anuais'
                    value={fmt(mei.compras_12m)}
                    readOnly
                  />
                </div>
                <div className='flex justify-end pt-4 border-border/50'>
                  <Button
                    variant='default'
                    size='sm'
                    onClick={() => navigate("/diagnostico")}
                  >
                    Refazer diagnóstico
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Segurança */}
        {tab === "seguranca" && (
          <div className='space-y-6'>
            <div className='bg-background border border-border/50 rounded-xl p-8'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300/10'>
                  <UserLock size={14} className='text-blue-700' />
                </div>
                <p className=' text-sm font-medium'>Redefinir senha</p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSalvarSenha)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='senhaAtual'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha atual</FormLabel>
                        <FormControl>
                          <Input type='password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='novaSenha'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova senha</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='confirmarSenha'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar nova senha</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex justify-end pt-2 mt-6'>
                    <Button
                      type='submit'
                      variant='default'
                      disabled={isSalvandoSenha}
                    >
                      {isSalvandoSenha ? "Salvando..." : "Redefinir senha"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <Separator />

            <div>
              <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3'>
                Zona de perigo
              </p>
              <Card className='border-2 border-red-700/20'>
                <CardContent className='flex items-center justify-between p-4'>
                  <div>
                    <p className='text-sm font-medium'>Deletar conta</p>
                    <p className='text-xs text-muted-foreground mt-0.5'>
                      Essa ação é irreversível e removerá todos os seus dados.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='destructive'
                        size='sm'
                        className='shrink-0'
                      >
                        <Trash2 size={14} className='mr-1' />
                        Deletar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deletar conta</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja deletar sua conta? Todos os
                          seus dados serão removidos permanentemente e essa ação
                          não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeletarConta}
                          disabled={isDeletando}
                          className='bg-red-600 hover:bg-red-700'
                        >
                          {isDeletando
                            ? "Deletando..."
                            : "Sim, deletar minha conta"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
