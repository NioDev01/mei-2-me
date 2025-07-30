import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
} from "lucide-react"

const formSchema = z
  .object({
    nome: z.string().min(1, "Nome completo é obrigatório."),
    cnpj: z
      .string()
      .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido."),
    email: z.string().email("E-mail inválido."),
    telefone: z
      .string()
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido."),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmacaoSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmacaoSenha"],
  })

type FormValues = z.infer<typeof formSchema>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      senha: "",
      confirmacaoSenha: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const formatCNPJ = (value: string) =>
    value.replace(/\D/g, "").replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    )

  const formatPhone = (value: string) =>
    value.replace(/\D/g, "").replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")

  const getFieldClassName = (name: keyof FormValues) => {
    const hasError = form.formState.errors[name]
    const value = form.watch(name)
    // const isTouched = form.getFieldState(name).isTouched

    if (hasError) return "border-red-500 focus-visible:ring-red-500"
    if (!hasError && value) return "border-green-500 focus-visible:ring-green-500"
    return ""
  }

  const getFieldIcon = (name: keyof FormValues) => {
    const hasError = form.formState.errors[name]
    const value = form.watch(name)
    // const isTouched = form.getFieldState(name).isTouched

    if (hasError ) {
      return <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
    }
    if (!hasError && value) {
      return <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
    }
    return null
  }

  const onSubmit = (data: FormValues) => {
    console.log("Dados do cadastro:", data)
  }

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center p-4 bg-background">
      <Card className="w-full h-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>Preencha os dados abaixo para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent className="overflow-y-auto px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* Nome */}
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          className={`pl-10 pr-10 ${getFieldClassName("nome")}`}
                          placeholder="Digite seu nome completo"
                          onKeyDown={(e) => {
                            if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]$/.test(e.key) && e.key.length === 1) {
                              e.preventDefault()
                            }
                          }}
                        />
                        {getFieldIcon("nome")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CNPJ */}
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          maxLength={18}
                          className={`pl-10 pr-10 ${getFieldClassName("cnpj")}`}
                          placeholder="00.000.000/0000-00"
                          onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                        />
                        {getFieldIcon("cnpj")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          className={`pl-10 pr-10 ${getFieldClassName("email")}`}
                          placeholder="seu@email.com"
                        />
                        {getFieldIcon("email")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Telefone */}
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          maxLength={15}
                          className={`pl-10 pr-10 ${getFieldClassName("telefone")}`}
                          placeholder="(00) 00000-0000"
                          onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        />
                        {getFieldIcon("telefone")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Senha */}
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className={`pl-10 pr-16 ${getFieldClassName("senha")}`}
                          placeholder="Digite sua senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                        </button>
                        {getFieldIcon("senha")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmar Senha */}
              <FormField
                control={form.control}
                name="confirmacaoSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          className={`pl-10 pr-16 ${getFieldClassName("confirmacaoSenha")}`}
                          placeholder="Confirme sua senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                        </button>
                        {getFieldIcon("confirmacaoSenha")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6" size="lg">
                Criar Conta
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Faça login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
