import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

import { Mail, ArrowLeft, AlertCircle, Check } from "lucide-react"

// Validação com Zod
const formSchema = z.object({
  email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido."),
})

type FormValues = z.infer<typeof formSchema>

export function RecuperarSenha() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  })

  const onSubmit = (data: FormValues) => {
    console.log("E-mail para recuperação:", data.email)
    setSubmitted(true)
  }

  const getFieldClassName = (name: keyof FormValues) => {
    const hasError = form.formState.errors[name]
    const value = form.watch(name)

    if (hasError) return "pl-10 pr-10 border-red-500 focus-visible:ring-red-500"
    if (!hasError && value) return "pl-10 pr-10 border-green-500 focus-visible:ring-green-500"
    return "pl-10 pr-10"
  }

  const getFieldIcon = (name: keyof FormValues) => {
    const hasError = form.formState.errors[name]
    const value = form.watch(name)

    if (hasError) return <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
    if (!hasError && value) return <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
          <CardDescription>
            Digite seu e-mail para receber as instruções de recuperação de senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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
                          className={getFieldClassName("email")}
                          placeholder="Digite seu e-mail cadastrado"
                        />
                        {getFieldIcon("email")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={!form.formState.isValid}>
                Confirmar
              </Button>

              {submitted && (
                <p className="text-green-600 text-sm text-center">
                  E-mail de recuperação enviado, verifique sua caixa de entrada.
                </p>
              )}

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
