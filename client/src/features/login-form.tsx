import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// Schema de validação
const loginSchema = z.object({
  loginType: z.enum(["cnpj", "email", "telefone"]),
  cnpj: z.string().refine(val => val.length === 0 || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val), {
    message: "CNPJ inválido",
  }),
  email: z.string().email("E-mail inválido").optional(),
  telefone: z.string().refine(val => val.length === 0 || /^\(\d{2}\) \d{5}-\d{4}$/.test(val), {
    message: "Telefone inválido",
  }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginType: "cnpj",
      cnpj: "",
      email: "",
      telefone: "",
      password: "",
    },
    mode: "onChange",
  });

  const loginType = form.watch("loginType");

  const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const onSubmit = (data: LoginFormValues) => {
    console.log("Dados do login:", data);
    // Lógica de autenticação aqui
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <Tabs 
              value={loginType} 
              onValueChange={(value) => form.setValue("loginType", value as "cnpj" | "email" | "telefone")} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cnpj">CNPJ</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="telefone">Telefone</TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <TabsContent value="cnpj">
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00.000.000/0000-00"
                            value={field.value}
                            onChange={(e) => field.onChange(formatCnpj(e.target.value))}
                            maxLength={18}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="email">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="seu@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="telefone">
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 00000-0000"
                            value={field.value}
                            onChange={(e) => field.onChange(formatTelefone(e.target.value))}
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <div className="text-right text-sm">
                  <a href="#" className="text-blue-600 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4 text-right text-sm">
                  <a>Não possui uma conta? </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    Crie uma conta
                  </a>
                </div>

                <Button type="submit" className="w-full hover:bg-chart-2">
                  Entrar
                </Button>
              </form>
            </Tabs>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}