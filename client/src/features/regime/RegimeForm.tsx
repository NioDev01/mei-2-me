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
} from "@/components/ui/form"
import { Calculator, BanknoteArrowUp, BanknoteArrowDown } from 'lucide-react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
import { toast, Toaster } from "sonner";

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

const faturamento = 81000; // Exemplo de faturamento anual

const primeiraSimulacao = true

export function RegimeForm() {

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await axios.post(`${import.meta.env.VITE_API_URL}/simulador-regimes`, data)
    .then((response) => {
      toast.success('Simulação realizada com sucesso!')
      console.log(response.data)
    })
    .catch((error) => {
      toast.error('Erro ao realizar simulação. Tente novamente.')
      console.error(error)
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        receitas_financeiras: 0,
        receitas_nao_operacionais: 0,
        despesas_financeiras: 0
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div>
      <Toaster position="top-center" />
      <p className="mb-4">Faturamento: <b>R$ {faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ano</b></p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <FormField
                control={form.control}
                name='receitas_financeiras'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receitas Financeiras (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <BanknoteArrowUp className="absolute left-3 top-3 h-4 w-4 text-green-600"/>
                        <Input 
                          {...field} 
                          type='number' 
                          placeholder='0.00' 
                          className="pl-10"
                          step="1"
                          onChange={(e) => {
                              let value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                // 🔹 garante que o valor fique sempre positivo
                                value = Math.abs(value) * 1;
                                field.onChange(value);
                              } else {
                                field.onChange(0);
                              }
                          }}
                          onBlur={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                              e.target.value = value.toFixed(2);
                              }
                          }} 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Rendimentos de aplicações, juros recebidos
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='receitas_nao_operacionais'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receitas Não Operacionais (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <BanknoteArrowUp className="absolute left-3 top-3 h-4 w-4 text-green-600"/>
                        <Input 
                          {...field} 
                          type='number' 
                          placeholder='0.00' 
                          className="pl-10"
                          step="1"
                          onChange={(e) => {
                              let value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                // 🔹 garante que o valor fique sempre positivo
                                value = Math.abs(value) * 1;
                                field.onChange(value);
                              } else {
                                field.onChange(0);
                              }
                          }}
                          onBlur={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                              e.target.value = value.toFixed(2);
                              }
                          }} 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Vendas de ativos, ganhos eventuais
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='despesas_financeiras'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despesas Financeiras (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <BanknoteArrowDown className="absolute left-3 top-3 h-4 w-4 text-red-600"/>
                        <Input 
                          {...field} 
                          type='number' 
                          placeholder='0.00' 
                          className="pl-10"
                          step="1"
                          onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              // 🔹 garante que o valor fique sempre positivo
                              value = Math.abs(value) * 1;
                              field.onChange(value);
                            } else {
                              field.onChange(0);
                            }
                          }}
                          onBlur={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                              e.target.value = value.toFixed(2);
                              }
                          }} 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Juros pagos, multas, despesas bancárias
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size='lg' className="w-full text-lg"><Calculator/>Calcular</Button>
        </form>
      </Form>
    </div>
  )
}