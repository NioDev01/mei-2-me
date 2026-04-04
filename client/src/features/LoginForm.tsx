import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { api } from "@/lib/api";
import { setAccessToken } from "@/lib/auth";

// Schema de validação
const loginSchema = z.object({
  loginType: z.enum(["cnpj", "email", "telefone"]),

  cnpj: z.string()
    .refine(val => val.length === 0 || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val), {
      message: "CNPJ inválido",
    })
    .optional(),

  email: z.string()
    .email("E-mail inválido")
    .or(z.literal(""))
    .optional(),

  telefone: z.string()
    .refine(val => val.length === 0 || /^\(\d{2}\) \d{5}-\d{4}$/.test(val), {
      message: "Telefone inválido",
    })
    .optional(),

  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();

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

  const onSubmit = async (data: LoginFormValues) => {
    try {
      let identificador = "";

      if (data.loginType === "cnpj") {
        identificador = data.cnpj.replace(/\D/g, "");
      }

      if (data.loginType === "email") {
        identificador = data.email || "";
      }

      if (data.loginType === "telefone") {
        identificador = data.telefone.replace(/\D/g, "");
      }

      if (!identificador) {
        alert("Preencha o campo corretamente.");
        return;
      }

      const res = await api.post("/auth/login", {
        identificador,
        senha: data.password,
      });

      // salva token em memória
      setAccessToken(res.data.accessToken);

      // redireciona (ajuste conforme sua rota)
      navigate("/app");

    } catch (error) {
      console.error(error);
      alert("Credenciais inválidas");
    }
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
              onValueChange={(value) =>
                form.setValue(
                  "loginType",
                  value as "cnpj" | "email" | "telefone"
                )
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cnpj">CNPJ</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="telefone">Telefone</TabsTrigger>
              </TabsList>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
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
                            onChange={(e) =>
                              field.onChange(formatCnpj(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(formatTelefone(e.target.value))
                            }
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <div className="text-right text-sm">
                  <a
                    href="/RecuperarSenha"
                    className="text-blue-600 hover:underline"
                  >
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4 text-right text-sm">
                  <span>Não possui uma conta? </span>
                  <a
                    href="/SignIn"
                    className="text-blue-600 hover:underline"
                  >
                    Crie uma conta
                  </a>
                </div>

                <Button type="submit" className="w-full">
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