import { useMemo } from "react"

type Props = {
  data: any
  onStart: () => void
}

export function JornadaOverview({ data, onStart }: Props) {
  const canContinue = !!data.nextStep

  const stepLabel = useMemo(() => {
    const map: Record<string, string> = {
      desenquadramento: "Desenquadramento do MEI",
      definicao_empresa: "Definição da Empresa",
      contrato_social: "Contrato Social",
      junta_comercial: "Junta Comercial",
      cnpj: "Atualização do CNPJ",
      licenciamento: "Licenciamento",
      regime_tributario: "Regime Tributário",
      obrigacoes_fiscais: "Obrigações Fiscais",
    }

    return map
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">
          Processo de formalização
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe sua jornada de MEI para ME
        </p>
      </div>

      {/* PROGRESSO */}
      <div>
        <div className="h-2 bg-muted rounded">
          <div
            className="h-2 bg-primary rounded transition-all"
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <p className="text-sm mt-2">
          {data.progress}% concluído
        </p>
      </div>

      {/* ETAPAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.steps.map((step: any, index: number) => (
          <div
            key={step.step}
            className={`p-4 rounded-lg border transition
              ${
                step.status === "completed"
                  ? "border-green-500"
                  : step.status === "in_progress"
                  ? "border-yellow-500"
                  : step.status === "available"
                  ? "border-blue-500"
                  : "border-muted opacity-50"
              }
            `}
          >
            <p className="text-sm font-medium">
              {index + 1}. {stepLabel[step.step] || step.step}
            </p>

            <p className="text-xs mt-1 capitalize text-muted-foreground">
              {step.status}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div>
        <button
          onClick={onStart}
          disabled={!canContinue}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {data.progress === 0
            ? "Iniciar jornada"
            : "Continuar jornada"}
        </button>
      </div>
    </div>
  )
}