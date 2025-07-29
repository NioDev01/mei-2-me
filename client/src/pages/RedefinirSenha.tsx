import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from '@/components/ui/card.jsx'
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'

export function RedefinirSenha() {
  const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarSenha: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Nova senha definida:', formData)
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
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
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
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
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
                  <li>• Mais de dez caracteres</li>
                  <li>• Caracteres especiais ou símbolos (!, @, #, $, %...)</li>
                </ul>
              </div>
            </div>

            {/* Botão Submeter */}
            <Button type="submit" className="w-full" size="lg">
              Redefinir Senha
            </Button>

            {/* Voltar para login */}
            <div className="text-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para o login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
