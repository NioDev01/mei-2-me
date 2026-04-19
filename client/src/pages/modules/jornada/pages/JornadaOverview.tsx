import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Route,
  Building2,
  FileText,
  Landmark,
  RefreshCcw,
  ClipboardList,
  Coins,
  FileCheck,
} from "lucide-react"

type Props = {
  data: any
  onStart: (step: string) => void
}

const stepConfig: Record<
  string,
  { label: string; description: string; icon: any }
> = {
  desenquadramento: {
    label: "Desenquadramento do MEI",
    description: "Transição do MEI para ME",
    icon: Route,
  },
  definicao_empresa: {
    label: "Definição da empresa",
    description: "Informações da empresa",
    icon: Building2,
  },
  contrato_social: {
    label: "Contrato Social",
    description: "Base legal da empresa",
    icon: FileText,
  },
  junta_comercial: {
    label: "Junta Comercial",
    description: "Registro da empresa",
    icon: Landmark,
  },
  cnpj: {
    label: "Atualização do CNPJ",
    description: "Alterações cadastrais",
    icon: RefreshCcw,
  },
  licenciamento: {
    label: "Licenciamento",
    description: "Autorizações legais",
    icon: ClipboardList,
  },
  regime_tributario: {
    label: "Regime Tributário",
    description: "Definição de impostos",
    icon: Coins,
  },
  obrigacoes_fiscais: {
    label: "Obrigações Fiscais",
    description: "Compromissos legais",
    icon: FileCheck,
  },
}

// function getStatusIcon(status: string) {
//   switch (status) {
//     case "completed":
//       return <CheckCircle className="text-green-500 w-5 h-5" />
//     case "in_progress":
//       return <PlayCircle className="text-yellow-500 w-5 h-5" />
//     case "available":
//       return <Circle className="text-blue-500 w-5 h-5" />
//     default:
//       return <Lock className="text-muted-foreground w-5 h-5" />
//   }
// }

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
      <Card className="sticky top-0 z-10 bg-card">
        <CardContent className="py-4">

          <div className="flex items-center justify-between relative">

            {/* 🔵 INÍCIO — MEI */}
            <div className="flex flex-col items-center z-10">
              <div className="w-13 h-13 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-l font-bold">
                MEI
              </div>
            </div>

            {/* 🔗 LINHA BASE */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-card-foreground -translate-y-1/2 z-0" />

            {/* 🔄 ETAPAS */}
            {data.steps.map((step: any) => {
              const config = stepConfig[step.step]
              const Icon = config.icon

              const isCurrent = step.step === data.currentStep
              const isCompleted = step.status === "completed"
              const isClickable = step.status !== "locked"

              return (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center z-10 group"
                >

                  {/* 🔹 ÍCONE */}
                  <div
                    onClick={() => {
                      if (isClickable) onStart(step.step)
                    }}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border
                      transition 
                      
                      ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}
                      
                      group-hover:scale-125

                      ${isCompleted ? "bg-green-500 text-muted border-card" : ""}
                      ${isCurrent ? "bg-accent-foreground text-muted border-card scale-110" : ""}
                      ${
                        !isCompleted && !isCurrent
                          ? "bg-muted-foreground text-muted border-card"
                          : ""
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* 🔹 TOOLTIP */}
                  <div
                    className="
                      absolute top-12
                      opacity-0 group-hover:opacity-100
                      transition
                      text-xs bg-black text-white px-2 py-1 rounded
                      whitespace-nowrap
                    "
                  >
                    {config.label}
                  </div>

                </div>
              )
            })}

            {/* 🟢 FINAL — ME */}
            <div className="flex flex-col items-center z-10">
              <div className="w-13 h-13 rounded-full bg-green-500 text-white flex items-center justify-center text-l font-bold">
                ME
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

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