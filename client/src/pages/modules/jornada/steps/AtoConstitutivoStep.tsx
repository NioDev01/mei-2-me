"use client"

import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"
import { stepConfig } from "./stepConfig"

import { getEmpresaTransicao } from "@/services/ato-constitutivo.service"
import { generateAtoConstitutivo } from "@/services/ato-constitutivo.service"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { toast } from "sonner"
import { FileDown, Loader2 } from "lucide-react"

// ===============================
// TYPES
// ===============================

type EmpresaTransicao = {
  naturezaJuridica: "EI" | "LTDA" | "SLU"
  eiData?: {
    capitalSocial: number
  }
  ltdaData?: {
    capitalSocial: number
    titular: {
      nome: string
      cpf: string
    }
    socios: { nome: string; cpf: string }[]
  }
}

// ===============================
// COMPONENT
// ===============================

export function AtoConstitutivoStep() {
  const [data, setData] = useState<EmpresaTransicao | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  // ===============================
  // LOAD
  // ===============================

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const res = await getEmpresaTransicao()
      setData(res)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // HELPERS
  // ===============================

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function getResumo() {
    if (!data) return null

    if (data.naturezaJuridica === "EI") {
      return {
        natureza: "Empresário Individual (EI)",
        capital: formatCurrency(data.eiData?.capitalSocial || 0),
      }
    }

    return {
      natureza:
        data.naturezaJuridica === "LTDA"
          ? "Sociedade Limitada (LTDA)"
          : "Sociedade Limitada Unipessoal (SLU)",
      capital: formatCurrency(data.ltdaData?.capitalSocial || 0),
      titular: data.ltdaData?.titular,
      socios: data.ltdaData?.socios || [],
    }
  }

  // ===============================
  // ACTION
  // ===============================

  async function handleGenerate() {
    setIsGenerating(true)

    try {
      const blob = await generateAtoConstitutivo()

      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = "ato-constitutivo.docx"

      link.click()

      toast.success("Documento gerado com sucesso!")
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Erro ao gerar documento"
      )
    } finally {
      setIsGenerating(false)
    }
  }

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return <div>Carregando dados...</div>
  }

  // ===============================
  // SEM DADOS
  // ===============================

  const resumo = getResumo()

  const howToContent = !data ? (
    <Card className="border-yellow-500">
      <CardContent className="p-4 space-y-2">
        <p className="text-sm font-medium">
          Você ainda não definiu os dados da nova empresa.
        </p>
        <p className="text-sm text-muted-foreground">
          Vá até a etapa anterior para preencher as informações antes de gerar o documento.
        </p>
      </CardContent>
    </Card>
  ) : (
    <div className="space-y-4">

      {/* 🔹 RESUMO */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <p className="font-medium">Resumo da Empresa</p>

          <div className="text-sm text-muted-foreground space-y-1">
            <p><b>Natureza Jurídica:</b> {resumo?.natureza}</p>
            <p><b>Capital Social:</b> {resumo?.capital}</p>

            {"titular" in resumo && resumo.titular && (
              <>
                <p><b>Titular:</b> {resumo.titular.nome}</p>
                <p><b>CPF:</b> {resumo.titular.cpf}</p>
              </>
            )}

            {"socios" in resumo && resumo.socios?.length > 0 && (
              <div>
                <p className="font-medium mt-2">Sócios:</p>
                <ul className="list-disc pl-5">
                  {resumo.socios.map((s, i) => (
                    <li key={i}>
                      {s.nome} — {s.cpf}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔹 BOTÃO */}
      <Button
        onClick={handleGenerate}
        className="w-full"
        size="lg"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            Gerando documento...
          </>
        ) : (
          <>
            <FileDown className="mr-2" />
            Gerar Ato Constitutivo
          </>
        )}
      </Button>
    </div>
  )

  // ===============================
  // TEMPLATE
  // ===============================

  return (
    <StepTemplate
      header={
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {stepConfig.ato_constitutivo.label}
          </h2>
          <p className="text-sm text-muted-foreground">
            {stepConfig.ato_constitutivo.description}
          </p>
        </div>
      }

      sections={{
        whatIs: {
          title: "O que é o Ato Constitutivo?",
          content:
            "É o documento que formaliza a criação da sua nova empresa, contendo informações como natureza jurídica, capital social e estrutura societária.",
        },
        why: {
          title: "Por que é importante?",
          content:
            "Esse documento é essencial para registrar sua empresa e será exigido em diversos processos legais e operacionais.",
        },
        when: {
          title: "Quando gerar?",
          content:
            "Após definir todos os dados da nova empresa na etapa anterior.",
        },
        requirements: {
          title: "O que você precisa?",
          content:
            "As informações da nova empresa já definidas corretamente (natureza jurídica, capital e sócios, se houver).",
        },

        form: {
          title: "Gerar documento",
          content: howToContent,
        },
      }}

      howTo={{
        title: "Como funciona?",
        content:
          "Revise os dados da sua empresa e clique no botão para gerar o documento. O download será iniciado automaticamente.",
      }}

      tips={{
        title: "Dicas",
        content: (
          <ul className="list-disc pl-5">
            <li>Revise os dados antes de gerar o documento</li>
            <li>O documento pode ser solicitado por órgãos oficiais</li>
            <li>Considere validar com um contador</li>
          </ul>
        ),
      }}
    />
  )
}