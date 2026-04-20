import { useEffect, useState } from "react"

import {
  getChecklist,
  toggleItem,
  completeStep,
  startStep,
} from "@/pages/modules/jornada/services/jornada.service"

import { stepComponentMap } from "@/pages/modules/jornada/steps"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JornadaHeader } from "../components/JornadaHeader"

type Props = {
  step: string
  summary: any
  onBack: () => void
  onComplete: () => void
  onRefresh: () => void
  onNavigateStep: (step: string) => void
}

export function JornadaStep({
  step,
  summary,
  onBack,
  onComplete,
  onRefresh,
  onNavigateStep,
}: Props) {
  const [checklist, setChecklist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const StepComponent = stepComponentMap[step]

  useEffect(() => {
    load()
  }, [step])

  async function load() {
    setLoading(true)

    await startStep(step)

    const data = await getChecklist(step)
    setChecklist(data)

    setLoading(false)
  }

  async function handleToggle(id: string) {
    await toggleItem(step, id)

    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    )

    await onRefresh()
  }

  async function handleComplete() {
    await completeStep(step)
    onComplete()
  }

  const canComplete = checklist.every(
    (item) => !item.required || item.isChecked
  )

  if (loading) return <div>Carregando...</div>

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER GLOBAL */}
      <JornadaHeader
        data={summary}
        onStepClick={onNavigateStep}
      />

      <div className="p-6 space-y-6">

        {/* 🔹 CONTEÚDO DINÂMICO */}
        {StepComponent ? (
          <StepComponent />
        ) : (
          <Card>
            <CardContent className="p-4 text-sm text-muted-foreground">
              Conteúdo não disponível para esta etapa.
            </CardContent>
          </Card>
        )}

        {/* 🔹 CHECKLIST */}
        <div className="space-y-3">
          {checklist.map((item) => (
            <label
              key={item.id}
              className="
                flex items-center gap-3
                p-3 rounded-lg border
                hover:bg-muted transition cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={() => handleToggle(item.id)}
              />

              <span
                className={`
                  text-sm
                  ${item.isChecked ? "line-through opacity-60" : ""}
                `}
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>

        {/* 🔹 AÇÕES */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>

          <Button
            disabled={!canComplete}
            onClick={handleComplete}
          >
            Concluir etapa
          </Button>
        </div>
      </div>
    </div>
  )
}