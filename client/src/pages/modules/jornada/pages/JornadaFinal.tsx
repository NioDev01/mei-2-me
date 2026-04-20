import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, PartyPopper } from "lucide-react"

type Props = {
  onBackToDashboard?: () => void
  onReviewSteps?: () => void
}

export function JornadaFinal({
  onBackToDashboard,
  onReviewSteps,
}: Props) {
  return (
    <div className="w-full space-y-8 pt-3">

      {/* 🎉 HEADER */}
      <div className="flex items-center gap-4">
        <PartyPopper className="text-primary w-8 h-8" />
        <div>
          <h1 className="text-2xl font-bold">Parabéns!!!</h1>
          <p className="text-muted-foreground">
            Você concluiu todas as etapas da transição de MEI para Microempresa.
          </p>
        </div>
      </div>

      {/* 📊 RESUMO */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da sua jornada</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-4">
          
          {/* Linha lateral */}
          <div className="w-1 bg-green-500 rounded-full" />

          {/* Lista */}
          <div className="space-y-2 text-sm">
            {[
              "Entendeu o processo de desenquadramento",
              "Definiu as informações da sua empresa",
              "Elaborou o contrato social",
              "Realizou o registro na Junta Comercial",
              "Atualizou o CNPJ",
              "Verificou o licenciamento necessário",
              "Definiu o regime tributário",
              "Compreendeu suas obrigações fiscais",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🚀 PRÓXIMOS PASSOS */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos passos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-1">
            <li>Iniciar as atividades da empresa.</li>
            <li>Manter as obrigações fiscais em dia.</li>
            <li>Buscar apoio contábil, caso necessário.</li>
            <li>Acompanhar o crescimento do negócio.</li>
          </ul>

          <p className="text-muted-foreground pt-2">
            <strong>Dica:</strong> A gestão correta da sua empresa desde o início
            é essencial para evitar problemas e garantir crescimento sustentável.
          </p>
        </CardContent>
      </Card>

      {/* 🔘 AÇÕES */}
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-2">

        <Button
          variant="outline"
          onClick={onBackToDashboard}
          className="w-full md:w-auto"
        >
          Voltar
        </Button>

        <div className="flex gap-3 w-full md:w-auto">
          <Button
            variant="secondary"
            onClick={onReviewSteps}
            className="flex-1 md:flex-none"
          >
            Revisar Etapas
          </Button>
        </div>
      </div>
    </div>
  )
}