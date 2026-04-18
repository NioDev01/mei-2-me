import { useEffect, useState } from "react"
import { getJornadaSummary } from "@/pages/modules/jornada/services/jornada.service"

import { JornadaOverview } from "@/pages/modules/jornada/pages/JornadaOverview"
import { JornadaStep } from "@/pages/modules/jornada/pages/JornadaStep"
import { JornadaFinal } from "@/pages/modules/jornada/pages/JornadaFinal"

export function Jornada() {
  const [summary, setSummary] = useState<any>(null)
  const [view, setView] = useState<'overview' | 'step' | 'final'>('overview')

  useEffect(() => {
    loadSummary()
  }, [])

  async function loadSummary() {
    const data = await getJornadaSummary()
    setSummary(data)

    if (data.progress === 100) {
      setView('final')
    } else {
      setView('overview')
    }
  }

  if (!summary) return <div>Carregando...</div>

  // 🔥 Controle de telas
  if (view === 'final') {
    return <JornadaFinal />
  }

  if (view === 'step' && summary.currentStep) {
    return (
      <JornadaStep
        step={summary.currentStep}
        onBack={loadSummary}
      />
    )
  }

  return (
    <JornadaOverview
      data={summary}
      onStart={() => setView('step')}
    />
  )
}