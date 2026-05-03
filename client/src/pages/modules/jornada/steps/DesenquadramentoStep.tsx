import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { getDiagnostico } from "@/services/diagnostico.service"
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

  // DEDUPLICAÇÃO DE RISCOS
  const riscosUnicos = Array.from(
    new Set(motivos.flatMap((m) => m.riscos ?? []))
  )

  // HEADER (SEMÁFORO)
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
      title: "O que é o Desenquadramento do MEI?",
      content: (
        <>
          <p>
            O <b>desenquadramento</b> é o processo em que sua empresa deixa de ser
            MEI (Microempreendedor Individual) e passa a atuar como outro tipo de empresa,
            como uma <b>Microempresa (ME)</b>.
          </p>

          <div className="mt-3 border rounded-md p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Na prática, isso significa:</p>
            <ul className="list-disc pl-5">
              <li>mudança na forma de pagamento de impostos</li>
              <li>novas obrigações fiscais</li>
              <li>possível necessidade de contador</li>
            </ul>
          </div>
        </>
      ),
    },

    why: {
      title: "Por que isso está acontecendo com você?",
      content: (
        <>
          <p>{data.analise}</p>

          <div className="mt-4 space-y-3">
            {motivos.map((m, i: number) => (
              <div key={i} className="border rounded-md p-3">
                <p className="font-medium">{m.regra}</p>

                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
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
      title: "Quando o desenquadramento acontece?",
      content: (
        <>
          <p>
            O desenquadramento pode ocorrer de forma <b>automática</b> ou
            <b> manual</b>, dependendo da situação.
          </p>

          <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">

            <div className="border rounded-md p-3">
              <p className="font-medium text-foreground">Automático</p>
              <p className="text-muted-foreground mt-1">
                A Receita Federal realiza o desenquadramento sem ação sua.
              </p>
            </div>

            <div className="border rounded-md p-3">
              <p className="font-medium text-foreground">Manual</p>
              <p className="text-muted-foreground mt-1">
                Você precisa solicitar o desenquadramento no sistema.
              </p>
            </div>

          </div>
        </>
      ),
    },

    requirements: {
      title: "O que você precisa?",
      content: (
        <>
          <p>Para realizar o desenquadramento manual, você precisa de:</p>

          <ul className="list-disc pl-5 mt-2 text-muted-foreground">
            <li>CNPJ da empresa</li>
            <li>Conta gov.br (nível básico já funciona)</li>
            <li>Acesso ao Portal do Simples Nacional</li>
          </ul>

          <div className="mt-4 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
            Em muitos casos, não é necessário enviar documentos — apenas informar o motivo dentro do sistema.
          </div>
        </>
      ),
    },
  }}

  howTo={{
    title: "O que você precisa fazer agora?",
    content: (
      <>
        <div className="space-y-4">

          {/* AUTOMÁTICO */}
          <div className="border rounded-md p-3">
            <p className="font-medium text-foreground">
              ✔ Caso automático
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              Se sua situação se enquadrar em regras da Receita, o desenquadramento
              já será feito automaticamente.
            </p>

            <p className="text-sm mt-2">
              👉 <b>Você não precisa fazer nada.</b>
            </p>
          </div>

          {/* MANUAL */}
          <div className="border rounded-md p-3">
            <p className="font-medium text-foreground">
              ⚠ Caso manual
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              Se não for automático, siga este passo a passo:
            </p>

            <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
              <li>Acesse o Portal do Simples Nacional</li>
              <li>Entre em “Desenquadramento do SIMEI”</li>
              <li>Informe o motivo</li>
              <li>Confirme a solicitação</li>
            </ul>

            <Button
              variant="secondary"
              className="mt-3"
              onClick={() =>
                window.open(
                  "https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2",
                  "_blank"
                )
              }
            >
              Acessar Portal
            </Button>
          </div>

        </div>
      </>
    ),
  }}

  tips={{
    title: "Dicas e cuidados importantes",
    content: (
      <>
        {/* RISCOS */}
        <div className="space-y-2 text-muted-foreground">
          <p className="font-medium text-foreground mb-2">
            Riscos de acordo com sua situação atual:
          </p>
          {riscosUnicos.map((r: string, i: number) => (
            <p key={i}>⚠ {r}</p>
          ))}
        </div>

        {/* LEGAL */}
        <div className="mt-5">
          <p className="font-medium text-foreground mb-2">
            Base legal (opcional para consulta)
          </p>

          <div className="space-y-2">
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
        </div>
      </>
    ),
  }}
/>
  )
}