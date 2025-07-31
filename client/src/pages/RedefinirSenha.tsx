import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Link } from 'react-router-dom'
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from '@/components/ui/card.jsx'
import { Eye, EyeOff, Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react'

interface FormData {
  novaSenha: string
  confirmarSenha: string
}

interface FormErrors {
  novaSenha?: string
  confirmarSenha?: string
}

interface ValidFields {
  novaSenha?: boolean
  confirmarSenha?: boolean
}

type FieldName = keyof FormData

export function RedefinirSenha() {
  const [formData, setFormData] = useState<FormData>({
    novaSenha: '',
    confirmarSenha: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [validFields, setValidFields] = useState<ValidFields>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateField = (name: FieldName, value: string): string | null => {
    switch (name) {
      case 'novaSenha':
        if (!value) return 'A nova senha é obrigatória.'
        if (value.length < 6) return 'A senha deve ter mais de seis caracteres.'
        if (!/[a-z]/.test(value)) return 'A senha deve conter letras minúsculas.'
        if (!/[A-Z]/.test(value)) return 'A senha deve conter letras maiúsculas.'
        if (!/[0-9]/.test(value)) return 'A senha deve conter números.'
        if (!/[!@#$%^&*(),.?:{}|<>]/.test(value)) return 'A senha deve conter caracteres especiais.'
        return null
      case 'confirmarSenha':
        if (!value) return 'A confirmação da senha é obrigatória.'
        if (value !== formData.novaSenha) return 'As senhas não coincidem.'
        return null
      default:
        return null
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const newValidFields: ValidFields = {}
    let formIsValid = true

    Object.keys(formData).forEach((field) => {
      const fieldName = field as FieldName
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        formIsValid = false
      } else {
        newValidFields[fieldName] = true
      }
    })

    setErrors(newErrors)
    setValidFields(newValidFields)
    return formIsValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const fieldName = name as FieldName

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))

    const error = validateField(fieldName, value)
    if (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }))
      setValidFields(prev => ({
        ...prev,
        [fieldName]: false
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }))
      setValidFields(prev => ({
        ...prev,
        [fieldName]: true
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Nova senha definida:', formData)
      // Lógica para redefinir a senha
    } else {
      console.log('Formulário contém erros. Por favor, corrija-os.')
    }
  }

  const getFieldClassName = (fieldName: FieldName): string => {
    const baseClass = 'pl-10 pr-10'
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500`
    }
    if (validFields[fieldName]) {
      return `${baseClass} border-green-500 focus:border-green-500`
    }
    return baseClass
  }

  const getFieldIcon = (fieldName: FieldName) => {
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
          <CardTitle className="text-2xl font-bold">Redefinir Senha</CardTitle>
          <CardDescription>
            Digite sua nova senha e confirme para finalizar a recuperação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nova Senha */}
            <div className="space-y-2">
              <Label htmlFor="novaSenha" className="text-sm font-medium">
                Nova Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="novaSenha"
                  name="novaSenha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua nova senha"
                  value={formData.novaSenha}
                  onChange={handleInputChange}
                  className={getFieldClassName('novaSenha')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <div className="absolute right-3 top-3">
                  {getFieldIcon('novaSenha')}
                </div>
                {errors.novaSenha && <p className="text-red-500 text-xs mt-1">{errors.novaSenha}</p>}
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-sm font-medium">
                Confirmar Nova Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua nova senha"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  className={getFieldClassName('confirmarSenha')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-10 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <div className="absolute right-3 top-3">
                  {getFieldIcon('confirmarSenha')}
                </div>
                {errors.confirmarSenha && <p className="text-red-500 text-xs mt-1">{errors.confirmarSenha}</p>}
              </div>
            </div>

            {/* Requisitos de Senha */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-2">Para sua segurança, a senha deve conter:</p>
                <ul className="space-y-1">
                  <li>• Letras minúsculas (a, b, c, d, e...)</li>
                  <li>• Letras maiúsculas (A, B, C, D, E...)</li>
                  <li>• Números (1, 2, 3, 4, 5...)</li>
                  <li>• Mais de seis caracteres</li>
                  <li>• Caracteres especiais ou símbolos (!, @, #, $, %...)</li>
                </ul>
              </div>
            </div>

            {/* Botão Submeter */}
            <Button type="submit" className="w-full" size="lg" disabled={!Object.keys(validFields).length || Object.keys(errors).length > 0}>
              Redefinir Senha
            </Button>

            {/* Voltar para login */}
            <div className="text-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                    Voltar para o login
                </Link>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}