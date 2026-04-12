"use client";

import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calculator,
  BanknoteArrowUp,
  BanknoteArrowDown,
} from "lucide-react";
import { NumericFormat } from "react-number-format";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/lib/api";
import { toast, Toaster } from "sonner";
import type { ResultadoSimulador } from "./types/ResultadoSimulador";

const formSchema = z.object({
  receitas_financeiras: z.coerce.number().nonnegative(),
  receitas_nao_operacionais: z.coerce.number().nonnegative(),
  despesas_financeiras: z.coerce.number().nonnegative(),
});

const FALLBACK_FATURAMENTO = "Aguardando cálculo...";

// function handleMoneyChange(
//   value: string,
//   onChange: (v: number) => void
// ) {
//   const parsed = parseFloat(value);
//   if (!isNaN(parsed)) onChange(Math.abs(parsed));
//   else onChange(0);
// }

interface RegimeFormProps {
  dadosIniciais?: any;
  onResultadoChange?: (resultado: ResultadoSimulador) => void;
}

export function RegimeForm({
  dadosIniciais,
  onResultadoChange,
}: RegimeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receitas_financeiras: 0,
      receitas_nao_operacionais: 0,
      despesas_financeiras: 0,
    },
  });

  useEffect(() => {
    if (!dadosIniciais) return;

    form.reset({
      receitas_financeiras: Number(dadosIniciais.receitas_financeiras ?? 0),
      receitas_nao_operacionais: Number(dadosIniciais.receitas_nao_operacionais ?? 0),
      despesas_financeiras: Number(dadosIniciais.despesas_financeiras ?? 0),
    });
  }, [dadosIniciais, form]);

  async function onSubmit(data: any) {
    setIsSubmitting(true);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/simulador-regimes`,
        data
      );

      toast.success("Simulação realizada com sucesso!");

      onResultadoChange?.(response.data);

      form.reset({
        receitas_financeiras: Number(response.data.receitas_financeiras ?? 0),
        receitas_nao_operacionais: Number(response.data.receitas_nao_operacionais ?? 0),
        despesas_financeiras: Number(response.data.despesas_financeiras ?? 0),
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Erro ao realizar simulação.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const faturamento = dadosIniciais?.faturamento_12m ? Number(dadosIniciais.faturamento_12m) : FALLBACK_FATURAMENTO;

  return (
    <div>
      <Toaster position="top-center" />

      <p className="mb-4">
        Faturamento:{" "}
        <b>
          R$ {faturamento.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
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
                  <FormLabel>Receitas Financeiras</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BanknoteArrowUp className="absolute left-3 top-3 h-4 w-4 text-green-600" />

                      <NumericFormat
                        value={field.value ?? 0}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        className="pl-10 border rounded-md h-10 w-full"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue ?? 0);
                        }}
                      />
                    </div>
                  </FormControl>
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
                  <FormLabel>Receitas Não Operacionais</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BanknoteArrowUp className="absolute left-3 top-3 h-4 w-4 text-green-600" />

                      <NumericFormat
                        value={field.value ?? 0}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        className="pl-10 border rounded-md h-10 w-full"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue ?? 0);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Despesas */}
            <FormField
              control={form.control}
              name="despesas_financeiras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Despesas Financeiras</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BanknoteArrowDown className="absolute left-3 top-3 h-4 w-4 text-red-600" />

                      <NumericFormat
                        value={field.value ?? 0}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        className="pl-10 border rounded-md h-10 w-full"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue ?? 0);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            <Calculator className="mr-2" />
            {isSubmitting ? "Calculando..." : "Calcular"}
          </Button>
        </form>
      </Form>
    </div>
  );
}