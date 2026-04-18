import { useEffect, useState } from "react"
import {
  getChecklist,
  toggleItem,
  completeStep,
  startStep,
} from "@/pages/modules/jornada/services/jornada.service"

type Props = {
  step: string
  onBack: () => void
}

export function JornadaStep({ step, onBack }: Props) {
  const [checklist, setChecklist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [step])

  async function load() {
    setLoading(true)

    await startStep(step) // inicia automaticamente

    const data = await getChecklist(step)
    setChecklist(data)

    setLoading(false)
  }

  async function handleToggle(id: string) {
    await toggleItem(step, id)

    setChecklist(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isChecked: !item.isChecked }
          : item,
      ),
    )
  }

  async function handleComplete() {
    await completeStep(step)
    onBack()
  }

  const canComplete = checklist.every(
    item => !item.required || item.isChecked,
  )

  if (loading) return <div>Carregando...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">
        Etapa: {step}
      </h1>

      {/* CHECKLIST */}
      <div className="space-y-2">
        {checklist.map(item => (
          <label
            key={item.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => handleToggle(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      {/* AÇÕES */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded"
        >
          Voltar
        </button>

        <button
          disabled={!canComplete}
          onClick={handleComplete}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Concluir etapa
        </button>
      </div>
    </div>
  )
}