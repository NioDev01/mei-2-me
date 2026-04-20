import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { getDiagnostico } from "@/pages/modules/jornada/services/diagnostico.service"
import { useAuth } from "@/context/AuthContext";

type Motivo = {
  regra: string
  razoes: string[]
  riscos?: string[]
  referenciasLegais: string[]
}

type Diagnostico = {
  status?: string
  analise?: string
  motivos?: Motivo[]
  razaoSocial: string
}

export function DesenquadramentoStep() {
  const [data, setData] = useState<Diagnostico | null>(null)

  const { user } = useAuth()
  const cnpj = user?.cnpj

  useEffect(() => {
    load()
  }, [])

  async function load() {
    if (!cnpj) return

    const res = await getDiagnostico(cnpj)
    setData(res)
  }

  if (!cnpj) return <div>Carregando usuário...</div>
  if (!data) return <div>Carregando diagnóstico...</div>

  // STATUS → SEMÁFORO
  function mapStatus(status?: string) {
    if (!status) return "warning"

    if (status === "NÃO APTO") return "success"
    if (status === "APTO") return "danger"

    return "success"
  }

  const status = mapStatus(data.status)

  const statusConfig = {
    danger: {
        label: "Você precisa se desenquadrar do MEI imediatamente",
        color: "red",
        borderClass: "border-red-500",
        bgClass: "bg-red-500",
    },
    warning: {
        label: "Você está próximo do limite ou possui pendências",
        color: "yellow",
        borderClass: "border-yellow-500",
        bgClass: "bg-yellow-500",
    },
    success: {
        label: "Você está regular como MEI",
        color: "green",
        borderClass: "border-green-500",
        bgClass: "bg-green-500",
    },
  }[status]

  const motivos: Motivo[] = data.motivos ?? []

  // 🔹 DEDUPLICAÇÃO DE RISCOS
  const riscosUnicos = Array.from(
    new Set(motivos.flatMap((m) => m.riscos ?? []))
  )

  // 🔹 HEADER (SEMÁFORO)
  const header = (
    <Card className={`border-l-4 ${statusConfig.borderClass}`}>
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`w-3 h-3 rounded-full ${statusConfig.bgClass}`} />
        <p className="text-sm font-medium">
          {data.razaoSocial} — {statusConfig.label}
        </p>
      </CardContent>
    </Card>
  )

  return (
    <StepTemplate
      header={header}
      sections={{
        whatIs: {
          title: "O que é o desenquadramento",
          content: (
            <>
              O desenquadramento é o processo de saída do regime MEI para outro tipo de empresa, como Microempresa (ME). 
              Após isso, sua empresa passa a ter novas obrigações fiscais e tributárias.
            </>
          ),
        },

        why: {
          title: "Por que isso é necessário?",
          content: (
            <>
              <p>{data.analise}</p>

              <div className="space-y-3 mt-3">
                {motivos.map((m, i: number) => (
                  <div key={i} className="border-l-2 pl-3">
                    <p className="font-medium text-foreground">
                      {m.regra}
                    </p>

                    <ul className="list-disc pl-4 text-muted-foreground text-sm mt-1">
                      {m.razoes.map((r, j: number) => (
                        <li key={j}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ),
        },

        when: {
          title: "Quando isso acontece?",
          content: (
            <>
              O desenquadramento pode ocorrer automaticamente ou por solicitação.

              <ul className="list-disc pl-4 mt-2">
                {motivos.map((m, i: number) => (
                  <li key={i}>{m.regra}</li>
                ))}
              </ul>
            </>
          ),
        },

        requirements: {
          title: "O que você vai precisar?",
          content: (
            <>
            <ul className="list-disc pl-5 mt-1 text-muted-foreground">
              <li>CNPJ.</li>
              <li>Possuir uma conta gov.br (o nível básico já é suficiente).</li>
              <li>Ter acesso ao Portal do Simples Nacional.</li>
              <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                <li>Observação: lembre-se de marcar os documentos necessários no menu de Checklist de Documentos.</li>
              </ul>
            </ul>
            </>
          ),
        },
      }}

      howTo={{
        title: "Como fazer?",
        content: (
          <>
            <p>Passo a passo:</p>
            <ol className="list-decimal pl-5 mt-2 text-muted-foreground">
              <li>Acesse o Portal do Simples Nacional com sua conta gov.br.</li>
              <li>Vá em “Desenquadramento do SIMEI”.</li>
              <li>Selecione o motivo do desenquadramento.</li>
              <li>Confirme e envie a solicitação.</li>
            </ol>

            <Button variant="secondary" className="mt-2" onClick={() => window.open('https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2', '_blank')}>
              Acessar Portal
            </Button>
          </>
        ),
      }}

      tips={{
        title: "Dicas, riscos e base legal",
        content: (
          <>
            {/* 🔴 RISCOS */}
            <div className="space-y-2">
              {riscosUnicos.map((r: string, i: number) => (
                <p key={i}>{r}</p>
              ))}
            </div>

            {/* 📜 REFERÊNCIAS LEGAIS */}
            <div className="mt-4 space-y-2">
              <p className="font-medium text-foreground">
                Referências legais:
              </p>

              {motivos.map((m, i: number) => (
                <details key={i} className="text-sm">
                  <summary className="cursor-pointer hover:underline">
                    {m.regra}
                  </summary>

                  <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                    {m.referenciasLegais.map((ref, j: number) => (
                      <li key={j}>{ref}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </>
        ),
      }}
    />
  )
}