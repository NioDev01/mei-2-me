import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Mail, ArrowLeft, Check, AlertCircle } from 'lucide-react'

interface FormErrors {
  email: string
}

export function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Partial<FormErrors>>({})
  const [isValid, setIsValid] = useState(false)


  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    if (!email) {
      return 'E-mail é obrigatório.'
    }
    
    if (!emailRegex.test(email)) {
      return 'E-mail inválido.'
    }
    
    return null
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    
    // Validate email on change
    const error = validateEmail(value)
    if (error) {
      setErrors({ email: error })
      setIsValid(false)
    } else {
      setErrors({})
      setIsValid(true)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const error = validateEmail(email)
    if (error) {
      setErrors({ email: error })
      setIsValid(false)
      return
    }
    
    console.log('E-mail para recuperação:', email)
    // Aqui você pode adicionar a lógica para enviar o e-mail de recuperação
  }

  const getFieldClassName = (): string => {
    const baseClass = "pl-10"
    if (errors.email) {
      return `${baseClass} border-red-500 focus:border-red-500`
    }
    if (isValid && email) {
      return `${baseClass} border-green-500 focus:border-green-500`
    }
    return baseClass
  }

  const getFieldIcon = () => {
    if (!email) {
      return <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    }
    if (errors.email) {
      return <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
    }
    if (isValid && email) {
      return <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail cadastrado"
                  value={email}
                  onChange={handleEmailChange}
                  className={getFieldClassName()}
                  required
                />
                {getFieldIcon()}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!isValid || !email}
            >
              Confirmar
            </Button>

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

