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

      {/* HERO */}
      <Card className="border-primary border-l-4">
        <CardContent className="p-6 flex gap-4 items-start">
          <PartyPopper className="text-primary w-8 h-8 mt-1" />

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              Parabéns! Sua jornada foi concluída 🚀
            </h1>

            <p className="text-muted-foreground">
              Você finalizou todas as etapas da transição de <b>MEI para Microempresa</b>.
              Agora sua empresa está pronta para operar com uma estrutura mais completa.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* RESUMO */}
      <Card>
        <CardHeader>
          <CardTitle>O que você conquistou</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          {[
            "Entendeu o processo de desenquadramento do MEI",
            "Definiu a estrutura da sua nova empresa",
            "Gerou o ato constitutivo",
            "Realizou o registro na Junta Comercial",
            "Verificou a atualização do CNPJ",
            "Avaliou a necessidade de licenciamento",
            "Analisou o melhor regime tributário",
            "Compreendeu suas obrigações fiscais",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PRÓXIMOS PASSOS */}
      <Card>
        <CardHeader>
          <CardTitle>O que fazer agora?</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">

          <div className="grid md:grid-cols-2 gap-4">

            <div className="border rounded-md p-3">
              <p className="font-medium">Operação da empresa</p>
              <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                <li>Iniciar suas atividades</li>
                <li>Emitir notas fiscais corretamente</li>
              </ul>
            </div>

            <div className="border rounded-md p-3">
              <p className="font-medium">Organização financeira</p>
              <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                <li>Controlar receitas e despesas</li>
                <li>Acompanhar fluxo de caixa</li>
              </ul>
            </div>

            <div className="border rounded-md p-3">
              <p className="font-medium">Obrigações fiscais</p>
              <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                <li>Pagar impostos em dia</li>
                <li>Enviar declarações obrigatórias</li>
              </ul>
            </div>

            <div className="border rounded-md p-3 border-yellow-500">
              <p className="font-medium">Apoio contábil</p>
              <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                <li>Avaliar suporte de um contador</li>
                <li>Evitar erros fiscais</li>
              </ul>
            </div>

          </div>

          <div className="border-l-4 border-primary pl-3 text-sm text-muted-foreground">
            A fase mais importante começa agora: manter sua empresa organizada e regular para crescer com segurança.
          </div>
        </CardContent>
      </Card>

      {/* AÇÕES */}
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-2">

        <Button
          variant="outline"
          onClick={onBackToDashboard}
          className="w-full md:w-auto"
        >
          Voltar ao início
        </Button>

        <div className="flex gap-3 w-full md:w-auto">

          <Button
            variant="secondary"
            onClick={onReviewSteps}
            className="flex-1 md:flex-none"
          >
            Revisar etapas
          </Button>

        </div>
      </div>

    </div>
  )
}