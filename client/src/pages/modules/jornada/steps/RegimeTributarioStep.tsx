import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { getSimulador } from "@/pages/modules/jornada/services/simulador.service"

type Simulador = {
  faturamento_12m: number
  tributos_simples: number
  aliq_efetiva_simples: number
  lucro_liq_simples: number
  tributos_lucrop: number
  aliq_efetiva_lucrop: number
  lucro_liq_lucrop: number
  recomendacao: "SN" | "LP" | "ID"
}

export function RegimeTributarioStep() {
  const [data, setData] = useState<Simulador | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await getSimulador()
    setData(res)
  }

  if (!data) return <div>Carregando simulação...</div>

  // 🧠 MAPEAMENTO RECOMENDAÇÃO
  const recomendacaoMap = {
    SN: {
      label: "Simples Nacional é o mais vantajoso",
      color: "border-green-500",
    },
    LP: {
      label: "Lucro Presumido é o mais vantajoso",
      color: "border-blue-500",
    },
    ID: {
      label: "Não foi possível determinar o melhor regime",
      color: "border-yellow-500",
    },
  }[data.recomendacao]

  const header = (
    <Card className={`border-l-4 ${recomendacaoMap.color}`}>
      <CardContent className="p-4">
        <p className="text-sm font-medium">
          {recomendacaoMap.label}
        </p>
      </CardContent>
    </Card>
  )

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function formatPercent(value: number) {
    return `${(value * 100).toFixed(2)}%`
  }

  return (
    <StepTemplate
      header={header}
      sections={{
        whatIs: {
          title: "O que é o regime tributário",
          content: (
            <>
              O regime tributário define como sua empresa irá pagar impostos,
              impactando diretamente seus custos e lucro.
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              A escolha correta pode reduzir significativamente a carga tributária
              e aumentar a lucratividade do negócio.
            </>
          ),
        },

        when: {
          title: "Quando escolher o regime?",
          content: (
            <>
              A escolha ocorre no momento da formalização como ME e pode ser revisada
              anualmente.
            </>
          ),
        },

        requirements: {
          title: "Dados considerados na simulação",
          content: (
            <>
              <p>Faturamento 12 meses: {formatCurrency(data.faturamento_12m)}</p>
              <p>Receitas financeiras e operacionais</p>
              <p>Despesas financeiras</p>
            </>
          ),
        },
      }}

      howTo={{
        title: "Comparação entre regimes",
        content: (
          <div className="grid md:grid-cols-2 gap-4">

            {/* SIMPLES */}
            <Card className="border-l-4 border-green-500">
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">Simples Nacional</p>
                <p>Tributos: {formatCurrency(data.tributos_simples)}</p>
                <p>Alíquota: {formatPercent(data.aliq_efetiva_simples)}</p>
                <p>Lucro: {formatCurrency(data.lucro_liq_simples)}</p>
              </CardContent>
            </Card>

            {/* LUCRO PRESUMIDO */}
            <Card className="border-l-4 border-blue-600">
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">Lucro Presumido</p>
                <p>Tributos: {formatCurrency(data.tributos_lucrop)}</p>
                <p>Alíquota: {formatPercent(data.aliq_efetiva_lucrop)}</p>
                <p>Lucro: {formatCurrency(data.lucro_liq_lucrop)}</p>
              </CardContent>
            </Card>

          </div>
        ),
      }}

      tips={{
        title: "Recomendação",
        content: (
          <>
            <p className="text-muted-foreground">
              Consulte um contador para uma análise mais detalhada.
            </p>    
          </>
        ),
      }}
    />
  )
}