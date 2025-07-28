import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from '@/components/ui/card.jsx'
import {
  Eye,
  EyeOff,
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  Check,
  AlertCircle
} from 'lucide-react'

export function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: ''
  })

  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [validFields, setValidFields] = useState<Record<string, boolean>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateField = (name: string, value: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/

    switch (name) {
      case 'nome':
        return value.trim() ? null : 'Nome completo é obrigatório.'
      case 'cnpj':
        if (!value) return 'CNPJ é obrigatório.'
        if (!cnpjRegex.test(value)) return 'CNPJ inválido. Formato esperado: 00.000.000/0000-00'
        return null
      case 'email':
        if (!value) return 'E-mail é obrigatório.'
        if (!emailRegex.test(value)) return 'E-mail inválido.'
        return null
      case 'telefone':
        if (!value) return 'Telefone é obrigatório.'
        if (!phoneRegex.test(value)) return 'Telefone inválido. Formato esperado: (00) 00000-0000'
        return null
      case 'senha':
        if (!value) return 'Senha é obrigatória.'
        if (value.length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
        return null
      case 'confirmacaoSenha':
        if (!value) return 'Confirmação de senha é obrigatória.'
        if (value !== formData.senha) return 'As senhas não coincidem.'
        return null
      default:
        return null
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const newValidFields: Record<string, boolean> = {}

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData])
      if (error) {
        newErrors[field] = error
      } else {
        newValidFields[field] = true
      }
    })

    setErrors(newErrors)
    setValidFields(newValidFields)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
      setValidFields(prev => ({
        ...prev,
        [name]: false
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
      setValidFields(prev => ({
        ...prev,
        [name]: true
      }))
    }
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value)
    setFormData(prev => ({
      ...prev,
      cnpj: formatted
    }))

    const error = validateField('cnpj', formatted)
    if (error) {
      setErrors(prev => ({
        ...prev,
        cnpj: error
      }))
      setValidFields(prev => ({
        ...prev,
        cnpj: false
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        cnpj: undefined
      }))
      setValidFields(prev => ({
        ...prev,
        cnpj: true
      }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }))

    const error = validateField('telefone', formatted)
    if (error) {
      setErrors(prev => ({
        ...prev,
        telefone: error
      }))
      setValidFields(prev => ({
        ...prev,
        telefone: false
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        telefone: undefined
      }))
      setValidFields(prev => ({
        ...prev,
        telefone: true
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Dados do cadastro:', formData)
    } else {
      console.log('Formulário contém erros.')
    }
  }

  const getFieldClassName = (fieldName: string) => {
    const baseClass = 'pl-10'
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500`
    }
    if (validFields[fieldName]) {
      return `${baseClass} border-green-500 focus:border-green-500`
    }
    return baseClass
  }

  const getFieldIcon = (fieldName: string) => {
    if (errors[fieldName]) {
      return <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
    }
    if (validFields[fieldName]) {
      return <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
    }
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
           <div className="space-y-2">
  <Label htmlFor="nome">Nome Completo</Label>
      <div className="relative">
    <     User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                const key = e.key
                if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]$/.test(key) && key.length === 1) {
                  e.preventDefault()
                }
              }}
              className={getFieldClassName('nome')}
              placeholder="Digite seu nome completo"
              required
            />
            {getFieldIcon('nome')}
            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
          </div>
          </div>

            {/* CNPJ */}
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleCNPJChange}
                  className={getFieldClassName('cnpj')}
                  maxLength={18}
                  placeholder="00.000.000/0000-00"
                  required
                />
                {getFieldIcon('cnpj')}
                {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={getFieldClassName('email')}
                  placeholder="seu@email.com"
                  required
                />
                {getFieldIcon('email')}
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  className={getFieldClassName('telefone')}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  required
                />
                {getFieldIcon('telefone')}
                {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={handleInputChange}
                  className={`${getFieldClassName('senha')} pr-16`}
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <div className="absolute right-3 top-3">{getFieldIcon('senha')}</div>
                {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmacaoSenha">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmacaoSenha"
                  name="confirmacaoSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmacaoSenha}
                  onChange={handleInputChange}
                  className={`${getFieldClassName('confirmacaoSenha')} pr-16`}
                  placeholder="Confirme sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <div className="absolute right-3 top-3">
                  {getFieldIcon('confirmacaoSenha')}
                </div>  
                {errors.confirmacaoSenha && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmacaoSenha}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">
              Criar Conta
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Já tem uma conta?{' '}
              <button type="button" className="text-primary hover:underline font-medium">
                Fazer login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
