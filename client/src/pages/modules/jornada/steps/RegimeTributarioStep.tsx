import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { getSimulador } from "@/services/simulador.service"

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const res = await getSimulador()
      setData(res)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function formatPercent(value: number) {
    return `${(value * 100).toFixed(2)}%`
  }

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return <div>Carregando simulação...</div>
  }

  // ===============================
  // SEM SIMULAÇÃO (CTA)
  // ===============================

  if (!data) {
    return (
      <StepTemplate
        sections={{
          whatIs: {
            title: "O que é o regime tributário?",
            content: (
              <>
                <p>
                  O regime tributário define <b>como sua empresa paga impostos</b>,
                  impactando diretamente nos custos e no lucro do negócio.
                </p>
              </>
            ),
          },

          why: {
            title: "Por que isso é importante?",
            content: (
              <>
                <p>
                  Escolher o regime correto pode reduzir significativamente a carga tributária
                  e evitar prejuízos desnecessários.
                </p>
              </>
            ),
          },

          when: {
            title: "Quando escolher?",
            content: (
              <>
                <p>
                  Essa decisão é feita no momento da formalização da empresa e pode ser revisada anualmente.
                </p>
              </>
            ),
          },

          requirements: {
            title: "O que você precisa fazer agora?",
            content: (
              <>
                <div className="border rounded-md p-4 space-y-3">
                  <p className="font-medium">
                    Você ainda não realizou a simulação tributária
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Para recomendar o melhor regime, precisamos simular os impostos com base no seu faturamento e custos.
                  </p>

                  <Button
                    className="w-full"
                    onClick={() => window.location.href = "/app#simulador"}
                  >
                    Ir para o simulador
                  </Button>
                </div>
              </>
            ),
          },
        }}

        howTo={{
          title: "Como funciona?",
          content: (
            <>
              <p>
                No simulador, você informa os dados da sua empresa e o sistema calcula automaticamente:
              </p>

              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>impostos estimados</li>
                <li>alíquota efetiva</li>
                <li>lucro líquido</li>
                <li>melhor regime tributário</li>
              </ul>
            </>
          ),
        }}

        tips={{
          title: "Dica importante",
          content: (
            <p className="text-muted-foreground">
              Quanto mais precisos forem os dados informados, mais confiável será a recomendação.
            </p>
          ),
        }}
      />
    )
  }

  // ===============================
  // COM SIMULAÇÃO
  // ===============================

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

  return (
    <StepTemplate
      header={header}

      sections={{
        whatIs: {
          title: "O que é o regime tributário?",
          content: (
            <>
              <p>
                O regime tributário define <b>como sua empresa paga impostos</b>.
              </p>

              <div className="mt-3 border rounded-md p-3 text-sm text-muted-foreground">
                Ele impacta diretamente:
                <ul className="list-disc pl-5 mt-1">
                  <li>valor dos impostos</li>
                  <li>lucro da empresa</li>
                  <li>obrigações fiscais</li>
                </ul>
              </div>
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              <p>
                A escolha do regime pode aumentar ou reduzir significativamente seus custos.
              </p>

              <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                Um regime inadequado pode fazer você pagar mais imposto do que deveria.
              </div>
            </>
          ),
        },

        when: {
          title: "Quando essa escolha acontece?",
          content: (
            <>
              <p>
                A escolha ocorre na abertura da empresa e pode ser alterada anualmente.
              </p>
            </>
          ),
        },

        requirements: {
          title: "Dados utilizados na simulação",
          content: (
            <>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><b>Faturamento:</b> {formatCurrency(data.faturamento_12m)}</p>
                <p>Receitas e despesas informadas no simulador</p>
              </div>
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
            <Card className="border-l-4 border-blue-500">
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
          <div className="space-y-2 text-muted-foreground">
            <p>
              ✔ Utilize essa simulação como base para sua decisão
            </p>
            <p>
              ✔ Revise os dados informados antes de tomar a decisão final
            </p>
            <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm text-muted-foreground">
                ⚠ Se optar pelo Simples Nacional, fique atento ao prazo:
                a solicitação deve ser feita em até 30 dias após o registro da nova empresa,
                respeitando o limite de 60 dias da abertura do CNPJ.
            </div>
            <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
              Um contador pode validar a melhor escolha para o seu caso específico.
            </div>
          </div>
        ),
      }}
    />
  )
}