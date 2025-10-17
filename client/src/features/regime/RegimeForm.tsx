import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calculator, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast, Toaster } from "sonner";
import type { ResultadoSimulador } from "./types/ResultadoSimulador";

const formSchema = z.object({
  receitas_financeiras: z.coerce.number().nonnegative({
    message: "Receitas não podem ser negativas.",
  }),
  receitas_nao_operacionais: z.coerce.number().nonnegative({
    message: "Receitas não podem ser negativas.",
  }),
  despesas_financeiras: z.coerce.number().nonnegative({
    message: "Despesas não podem ser negativas.",
  }),
});

const FALLBACK_FATURAMENTO = 81000; // fallback caso backend não envie faturamento_12m

interface RegimeFormProps {
  id_mei: number;
  dadosIniciais?: Partial<{
    faturamento_12m: number | string;
    receitas_financeiras: number | string;
    receitas_nao_operacionais: number | string;
    despesas_financeiras: number | string;
    [key: string]: number | string | undefined;
  }> | null;
  onResultadoChange?: (resultado: ResultadoSimulador) => void;
}

export function RegimeForm({ id_mei, dadosIniciais, onResultadoChange }: RegimeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receitas_financeiras: 0,
      receitas_nao_operacionais: 0,
      despesas_financeiras: 0,
    },
    mode: "onChange",
  });

  // Preenche o form quando o pai passar dados iniciais (ex.: retorno do GET)
  useEffect(() => {
    if (!dadosIniciais) return;

    const mapped = {
      receitas_financeiras: Number(dadosIniciais.receitas_financeiras ?? 0),
      receitas_nao_operacionais: Number(dadosIniciais.receitas_nao_operacionais ?? 0),
      despesas_financeiras: Number(dadosIniciais.despesas_financeiras ?? 0),
    };

    form.reset(mapped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dadosIniciais]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const payload = { id_mei, ...data };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/simulador-regimes`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Simulação realizada com sucesso!");

      // avisa o pai (Simulador) que há um novo resultado para atualizar tela
      onResultadoChange?.(response.data);

      // se o backend retornou inputs (por ex. para confirmar), atualiza o form com esses valores
      if (
        response.data?.receitas_financeiras !== undefined ||
        response.data?.receitas_nao_operacionais !== undefined ||
        response.data?.despesas_financeiras !== undefined
      ) {
        form.reset({
          receitas_financeiras: Number(response.data.receitas_financeiras ?? 0),
          receitas_nao_operacionais: Number(response.data.receitas_nao_operacionais ?? 0),
          despesas_financeiras: Number(response.data.despesas_financeiras ?? 0),
        });
      }
    } catch (error) {
      toast.error("Erro ao realizar simulação. Tente novamente.");
    }
  }

  // usa faturamento vindo do backend quando houver, senão fallback
  const faturamentoDisplay = Number(dadosIniciais?.faturamento_12m ?? FALLBACK_FATURAMENTO);

  return (
    <div>
      <Toaster position="top-center" />
      <p className="mb-4">
        Faturamento:{" "}
        <b>
          R$
          {faturamentoDisplay.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          / ano
        </b>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Receitas Financeiras */}
            <FormField
              control={form.control}
              name="receitas_financeiras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receitas Financeiras (R$)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BanknoteArrowUp className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        step="1"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) field.onChange(Math.abs(value));
                          else field.onChange(0);
                        }}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) e.target.value = value.toFixed(2);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Rendimentos de aplicações, juros recebidos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receitas Não Operacionais */}
            <FormField
              control={form.control}
              name="receitas_nao_operacionais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receitas Não Operacionais (R$)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BanknoteArrowUp className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        step="1"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) field.onChange(Math.abs(value));
                          else field.onChange(0);
                        }}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) e.target.value = value.toFixed(2);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Vendas de ativos, ganhos eventuais
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Despesas Financeiras */}
            <FormField
              control={form.control}
              name="despesas_financeiras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Despesas Financeiras (R$)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BanknoteArrowDown className="absolute left-3 top-3 h-4 w-4 text-red-600" />
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        step="1"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) field.onChange(Math.abs(value));
                          else field.onChange(0);
                        }}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) e.target.value = value.toFixed(2);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Juros pagos, multas, despesas bancárias
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="w-full text-lg">
            <Calculator className="mr-2" />
            Calcular
          </Button>
        </form>
      </Form>
    </div>
  );
}
