import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Eye, EyeOff, Lock, ArrowLeft, Check, AlertCircle } from "lucide-react"

const passwordSchema = z
  .string()
  .min(6, "A senha deve ter mais de seis caracteres.")
  .regex(/[a-z]/, "A senha deve conter letras minúsculas.")
  .regex(/[A-Z]/, "A senha deve conter letras maiúsculas.")
  .regex(/[0-9]/, "A senha deve conter números.")
  .regex(/[!@#$%^&*(),.?:{}|<>]/, "A senha deve conter caracteres especiais.")

const formSchema = z
  .object({
    novaSenha: passwordSchema,
    confirmarSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    path: ["confirmarSenha"],
    message: "As senhas não coincidem.",
  })

type FormValues = z.infer<typeof formSchema>

export function RedefinirSenha() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      novaSenha: "",
      confirmarSenha: "",
    },
    mode: "onChange",
  })

  const onSubmit = (data: FormValues) => {
    console.log("Nova senha definida:", data)
    // Lógica para redefinir senha
  }

  const getFieldClassName = (name: keyof FormValues) => {
    const error = form.formState.errors[name]
    const value = form.watch(name)
    if (error) return "pl-10 pr-10 border-red-500 focus-visible:ring-red-500"
    if (!error && value) return "pl-10 pr-10 border-green-500 focus-visible:ring-green-500"
    return "pl-10 pr-10"
  }

  const getFieldIcon = (name: keyof FormValues) => {
    const error = form.formState.errors[name]
    const value = form.watch(name)
    if (error) return <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
    if (!error && value) return <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Redefinir Senha</CardTitle>
          <CardDescription>
            Digite sua nova senha e confirme para finalizar a recuperação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Nova Senha */}
              <FormField
                control={form.control}
                name="novaSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className={getFieldClassName("novaSenha")}
                          placeholder="Digite sua nova senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        {getFieldIcon("novaSenha")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmar Senha */}
              <FormField
                control={form.control}
                name="confirmarSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          className={getFieldClassName("confirmarSenha")}
                          placeholder="Confirme sua nova senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        {getFieldIcon("confirmarSenha")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Requisitos de senha */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium">Para sua segurança, a senha deve conter:</p>
                <ul className="list-disc pl-4">
                  <li>Letras minúsculas (a, b, c...)</li>
                  <li>Letras maiúsculas (A, B, C...)</li>
                  <li>Números (1, 2, 3...)</li>
                  <li>Mais de seis caracteres</li>
                  <li>Caracteres especiais (!, @, #...)</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={!form.formState.isValid}>
                Redefinir Senha
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para o login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
