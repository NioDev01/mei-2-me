import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { toast } from "sonner"
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

const passwordSchema = z
  .string()
  .min(6, "A senha deve ter pelo menos 6 caracteres.")
  .regex(/[a-z]/, "Deve conter letra minúscula.")
  .regex(/[A-Z]/, "Deve conter letra maiúscula.")
  .regex(/[0-9]/, "Deve conter número.")
  .regex(/[!@#$%^&*(),.?:{}|<>]/, "Deve conter caractere especial.")

const validatePassword = (senha: string) => {
  const result = passwordSchema.safeParse(senha)

  if (result.success) {
    return {
      isValid: true,
      errors: [],
    }
  }

  return {
    isValid: false,
    errors: result.error.errors.map((err) => err.message),
  }
}

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
    senha: passwordSchema,
    confirmacaoSenha: z.string(),
    termos: z.boolean().refine(val => val, {
      message: "Você precisa aceitar os termos de uso.",
    }),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmacaoSenha"],
  })

type FormValues = z.infer<typeof formSchema>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      senha: "",
      confirmacaoSenha: "",
      termos: false,
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


  const senha = form.watch("senha")
  const passwordValidation = validatePassword(senha)

  const onSubmit = async (data: FormValues) => {
  setIsSubmitting(true)
  try {
    // normalizar dados
    const payload = {
      nome: data.nome,
      email: data.email,
      cnpj: data.cnpj.replace(/\D/g, ""),
      celular: data.telefone.replace(/\D/g, ""),
      senha: data.senha,
    }

      // 1. Cadastro
      await api.post("/auth/register", payload)

      // 2. Login automático
      const loginRes = await api.post("/auth/login", {
        identificador: payload.email,
        senha: payload.senha,
      })

      // 3. atualizar contexto
      await login(loginRes.data.accessToken)

      toast.success("Conta criada com sucesso!")

      // 4. Redirecionamento
      navigate("/app")

    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Não foi possível realizar o cadastro")
      } else {
        console.error(error)
        toast.error("Erro ao criar conta")
      }
    } finally {
      setIsSubmitting(false)
    }
  }
    const senhaStrength = 5 - passwordValidation.errors.length


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
                    
                    <div className="h-2 mt-1 rounded bg-accent overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          senhaStrength <= 2
                            ? "bg-red-500"
                            : senhaStrength <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${(senhaStrength / 5) * 100}%` }}
                      />
                    </div>
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

              {/* Checkbox termos */}
              <FormField
                control={form.control}
                name="termos"
                render={({ field }) => (
                    <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="leading-none text-sm">
                        <FormLabel className="font-normal">
                        Li e aceito os{" "}
                        <Dialog>
                            <DialogTrigger asChild>
                            <button
                                type="button"
                                className="text-primary underline hover:opacity-80"
                            >
                                termos de uso
                            </button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Termos de Uso</DialogTitle>
                                <DialogDescription>
                                Por favor, leia atentamente os termos antes de continuar.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                                <h1>Termos de Uso – MEI2ME</h1>
                                <h2>1. Aceitação dos Termos</h2>
                                <p>
                                  Ao acessar e utilizar o sistema <strong>MEI2ME – Assistente Facilitador MEI → ME</strong>, 
                                  o usuário declara ter lido, compreendido e concordado com os presentes Termos de Uso.
                                </p>
                                <p>
                                  Caso não concorde com qualquer condição aqui estabelecida, o usuário não deverá utilizar a aplicação.
                                </p>

                                <h2>2. Sobre o Sistema</h2>
                                <p>
                                  O MEI2ME é uma aplicação desenvolvida com o objetivo de auxiliar Microempreendedores Individuais (MEIs) 
                                  no processo de transição para Microempresa (ME), fornecendo orientações, simulações e apoio informativo.
                                </p>
                                <p>
                                  O sistema possui caráter <strong>educacional e informativo</strong>, não substituindo a orientação 
                                  de profissionais especializados, como contadores ou advogados.
                                </p>

                                <h2>3. Cadastro e Responsabilidade do Usuário</h2>
                                <p>
                                  Para utilizar determinadas funcionalidades, o usuário deverá realizar cadastro, fornecendo informações 
                                  verdadeiras, completas e atualizadas.
                                </p>
                                <ul>
                                  <li>Manter a confidencialidade de suas credenciais de acesso;</li>
                                  <li>Não compartilhar sua conta com terceiros;</li>
                                  <li>Informar dados verídicos durante o uso do sistema.</li>
                                </ul>
                                <p>
                                  O uso indevido da conta é de inteira responsabilidade do usuário.
                                </p>

                                <h2>4. Segurança e Proteção de Dados</h2>
                                <p>
                                  O sistema adota boas práticas de segurança para proteção das informações dos usuários, incluindo:
                                </p>
                                <ul>
                                  <li>Criptografia de senhas;</li>
                                  <li>Controle de autenticação e sessão;</li>
                                  <li>Validação de dados.</li>
                                </ul>
                                <p>
                                  Apesar dos esforços, não é possível garantir segurança absoluta em ambientes digitais.
                                </p>

                                <h2>5. Limitações de Responsabilidade</h2>
                                <p>
                                  O MEI2ME não se responsabiliza por:
                                </p>
                                <ul>
                                  <li>Decisões tomadas pelo usuário com base nas informações fornecidas;</li>
                                  <li>Eventuais erros ou omissões nas informações apresentadas;</li>
                                  <li>Indisponibilidade temporária do sistema.</li>
                                </ul>
                                <p>
                                  O uso das informações disponibilizadas é de responsabilidade exclusiva do usuário.
                                </p>

                                <h2>6. Uso Adequado</h2>
                                <p>
                                  O usuário compromete-se a utilizar o sistema de forma ética e legal, sendo proibido:
                                </p>
                                <ul>
                                  <li>Utilizar o sistema para fins ilícitos;</li>
                                  <li>Tentar acessar áreas restritas sem autorização;</li>
                                  <li>Inserir dados falsos ou maliciosos.</li>
                                </ul>

                                <h2>7. Alterações nos Termos</h2>
                                <p>
                                  Estes Termos de Uso podem ser atualizados a qualquer momento, visando melhorias no sistema 
                                  ou adequações legais.
                                </p>
                                <p>
                                  Recomenda-se que o usuário revise este documento periodicamente.
                                </p>

                                <h2>8. Disposições Gerais</h2>
                                <p>
                                  Este sistema foi desenvolvido para fins acadêmicos como Trabalho de Conclusão de Curso (TCC), 
                                  podendo não contemplar todos os requisitos de um sistema comercial em produção.
                                </p>

                                <h2>9. Contato</h2>
                                <p>
                                  Em caso de dúvidas, sugestões ou problemas, o usuário poderá entrar em contato por meio dos 
                                  canais disponibilizados na aplicação.
                                </p>

                                <p style={{ marginTop: 24, fontSize: 12, color: "#888" }}>
                                  Última atualização: Abril de 2026
                                </p>
                            </div>
                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                <Button type="button">Fechar</Button>
                                </DialogClose>
                            </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </FormLabel>
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Criando conta..." : "Criar Conta"}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                Já tem conta?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Entrar
                </Link>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
