import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, RotateCcw } from "lucide-react"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function ConclusaoJornada() {
  return (
    <div className="w-full space-y-8 pt-3">
      
      {/* ─── HEADER ─────────────────────────────────────────────────────────────────── */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="text-6xl">🎉</div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Parabéns!!!
        </h1>
        <p className="text-lg text-muted-foreground">
          Você concluiu todas as etapas da transição de MEI para Microempresa.
        </p>
      </div>

      {/* ─── RESUMO DA JORNADA ──────────────────────────────────────────────────────── */}
      <Card className="border-l-4 border-green-500">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Resumo da sua jornada
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                O que você realizou:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Entendeu o processo de desenquadramento
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Definiu as informações da sua empresa
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Elaborou o contrato social
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Realizou o registro na Junta Comercial
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Atualizou o CNPJ
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Verificou o licenciamento necessário
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Definiu o regime tributário
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Compreendeu suas obrigações fiscais
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── PRÓXIMOS PASSOS ────────────────────────────────────────────────────────── */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Próximos passos
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                O que fazer agora:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Iniciar as atividades da empresa.</li>
                <li>• Manter as obrigações fiscais em dia.</li>
                <li>• Buscar apoio contábil, caso necessário.</li>
                <li>• Acompanhar o crescimento do negócio.</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">
                <span className="font-medium">Dica:</span> A gestão correta da sua empresa desde o início é essencial para evitar problemas e garantir crescimento sustentável.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── BOTÕES DE AÇÃO ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button 
          variant="outline" 
          className="flex-1 sm:flex-none"
        >
          <Home className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 sm:flex-none"
        >
          Revisar Etapas
        </Button>
        <Button 
          className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retornar ao Simulador
        </Button>
      </div>

    </div>
  )
}
