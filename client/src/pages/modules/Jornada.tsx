import { useEffect, useState } from "react"
import { getJornadaSummary } from "@/services/jornada.service"

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

  useEffect(() => {
    function handleExternalNavigation(event: any) {
      const step = event.detail?.step

      if (!step) return

      setSelectedStep(step)
      setView("step")
    }

    window.addEventListener("navigate-step", handleExternalNavigation)

    return () => {
      window.removeEventListener("navigate-step", handleExternalNavigation)
    }
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

    if (data.currentStep !== selectedStep) {
      setSelectedStep(data.currentStep)
    }
  }

  // 🔹 Navegação manual pelo header
  function handleNavigateStep(step: string) {
    setSelectedStep(step)
    setView("step")
  }

  if (!summary) return <div>Carregando...</div>

  const stepToRender = selectedStep || summary.currentStep

  // 🔹 STEP
  if (view === "step") {
    return (
      <JornadaStep
        step={stepToRender}
        summary={summary}
        onBack={() => setView("overview")}
        onComplete={handleNextStep}
        onRefresh={handleRefresh}
        onNavigateStep={handleNavigateStep}
      />
    )
  }

  // 🔹 FINAL
  if (view === "final") {
    return <JornadaFinal 
      onBackToDashboard={() => setView("overview")}
      onReviewSteps={() => setView("step")}
    />
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