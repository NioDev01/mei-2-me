import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { stepConfig } from "@/pages/modules/jornada/steps/stepConfig"
import { JornadaHeader } from "../components/JornadaHeader"

type Props = {
  data: any
  onStart: (step: string) => void
}

export function JornadaOverview({ data, onStart }: Props) {
  return (
    <div className="w-full space-y-8 pt-3">

      {/* 🟦 HEADER */}
      <div>
        <h2 className="text-1xl text-muted-foreground">
          Acompanhe sua jornada de transição de MEI para Microempresa (ME)
        </h2>
      </div>

      {/* 📍 LINHA DO TEMPO */}
      <JornadaHeader data={data} onStepClick={onStart} />

      {/* 🧠 DIFERENÇA MEI x ME */}
      <Card>
        <CardHeader>
          <CardTitle>Diferenças entre MEI e ME</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            A transição de MEI para ME permite crescimento do negócio,
            maior faturamento e mais possibilidades de atuação.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Maior limite de faturamento</li>
            <li>Possibilidade de contratar mais funcionários</li>
            <li>Mais opções de atividades (CNAE)</li>
            <li>Maior flexibilidade operacional</li>
          </ul>
        </CardContent>
      </Card>

      {/* 🧩 CARDS DAS ETAPAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.steps.map((step: any) => {
          const config = stepConfig[step.step]
          const Icon = config.icon

          const isCurrent = step.step === data.currentStep
          const isClickable = step.status !== "locked"

          return (
            <Card
              key={step.step}
              onClick={() => {
                if (isClickable) onStart(step.step)
              }}
              className={`
                transition cursor-pointer group

                ${isClickable ? "transform hover:scale-102 transition-all duration-300" : "opacity-50 cursor-not-allowed"}
                ${isCurrent ? "border-primary border-2 shadow-sm" : ""}
              `}
            >
              <CardContent className="p-4 flex flex-col gap-3">

                {/* 🔹 HEADER */}
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />

                  <span className="text-xs">
                    {step.status === "completed" && "Concluído"}
                    {step.status === "in_progress" && "Em andamento"}
                    {step.status === "available" && "Disponível"}
                    {step.status === "locked" && "Bloqueado"}
                  </span>
                </div>

                {/* 🔹 TÍTULO */}
                <div>
                  <p className="text-sm font-medium leading-tight">
                    {config.label}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    {config.description}
                  </p>
                </div>

                {/* 🔹 INDICADOR ATUAL */}
                {isCurrent && (
                  <div className="text-xs text-primary font-medium">
                    Etapa atual
                  </div>
                )}

              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 🚀 CTA */}
      <div>
        <Button
          onClick={() => {
            if (data.nextStep) {
              onStart(data.nextStep)
            }
          }}
        >
          {data.progress === 0
            ? "Iniciar jornada"
            : "Continuar jornada"}
        </Button>
      </div>
    </div>
  )
}