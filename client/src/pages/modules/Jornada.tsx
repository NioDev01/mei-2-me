import { useEffect, useState } from "react"
import { getJornadaSummary } from "@/pages/modules/jornada/services/jornada.service"

import { JornadaOverview } from "@/pages/modules/jornada/pages/JornadaOverview"
import { JornadaStep } from "@/pages/modules/jornada/pages/JornadaStep"
import { JornadaFinal } from "@/pages/modules/jornada/pages/JornadaFinal"

type View = "overview" | "step" | "final"

export function Jornada() {
  const [summary, setSummary] = useState<any>(null)
  const [view, setView] = useState<View>("overview")
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  useEffect(() => {
    init()
  }, [])

  async function loadSummary() {
    const data = await getJornadaSummary()
    setSummary(data)
    return data
  }

  async function init() {
    const data = await loadSummary()

    if (data.progress === 100) {
      setView("final")
    } else {
      setView("overview")
    }
  }

  // 🔹 Próxima etapa automática
  async function handleNextStep() {
    const data = await loadSummary()

    if (data.progress === 100) {
      setView("final")
      return
    }

    const next = data.nextStep || data.currentStep
    setSelectedStep(next)
    setView("step")
  }

  // 🔹 Atualização ao alterar checklist
  async function handleRefresh() {
    const data = await loadSummary()

    // Se o fluxo voltou para etapa anterior, reposiciona
    if (data.currentStep !== selectedStep) {
      setSelectedStep(data.currentStep)
    }
  }

  if (!summary) return <div>Carregando...</div>

  const stepToRender = selectedStep || summary.currentStep

  // 🔹 STEP
  if (view === "step") {
    return (
      <JornadaStep
        step={stepToRender}
        onBack={() => setView("overview")}
        onComplete={handleNextStep}
        onRefresh={handleRefresh}
      />
    )
  }

  // 🔹 FINAL
  if (view === "final") {
    return <JornadaFinal />
  }

  // 🔹 OVERVIEW
  return (
    <JornadaOverview
      data={summary}
      onStart={(step: string) => {
        setSelectedStep(step)
        setView("step")
      }}
    />
  )
}