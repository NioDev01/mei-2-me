import { useEffect, useState } from "react"
import { StepTemplate } from "./StepTemplate"

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

  function getTipoDocumento() {
    if (!data) return null

    if (data.naturezaJuridica === "EI") {
        return {
        titulo: "Requerimento de Empresário",
        descricao:
            "Documento utilizado para formalizar empresas do tipo Empresário Individual.",
        }
    }

    return {
        titulo: "Contrato Social",
        descricao:
        "Documento utilizado para formalizar empresas do tipo LTDA ou SLU.",
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

  const tipoDocumento = getTipoDocumento()

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

      {tipoDocumento && (
          <Card className="border-primary">
              <CardContent className="p-4 space-y-1">
              <p className="text-sm text-muted-foreground">
                  Documento que será gerado:
              </p>
  
              <p className="font-semibold text-lg">
                  {tipoDocumento.titulo}
              </p>
  
              <p className="text-sm text-muted-foreground">
                  {tipoDocumento.descricao}
              </p>
              </CardContent>
          </Card>
      )}
  
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
            Gerar {tipoDocumento ? tipoDocumento?.titulo : "Ato Constitutivo"}
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
        sections={{
            whatIs: {
            title: "O que é o Ato Constitutivo?",
            content: (
                <>
                <p>
                    O <b>Ato Constitutivo</b> é o documento que formaliza a criação da sua nova empresa.
                </p>

                <div className="mt-3 text-muted-foreground space-y-2">
                    <p>Dependendo do tipo de empresa escolhido, será gerado automaticamente:</p>

                    <ul className="list-disc pl-5">
                    <li>
                        <b>Empresário Individual (EI):</b> Requerimento de Empresário
                    </li>
                    <li>
                        <b>LTDA ou SLU:</b> Contrato Social
                    </li>
                    </ul>
                </div>

                <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                    Esse documento reúne informações como natureza jurídica, capital social,
                    dados do titular e estrutura societária.
                </div>
                </>
            ),
            },

            why: {
            title: "Por que é importante?",
            content: (
                <>
                <p>
                    Esse documento é <b>essencial para a formalização da sua empresa</b>.
                </p>

                <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="border rounded-md p-3">
                    <p className="font-medium text-foreground">Uso legal</p>
                    <ul className="list-disc pl-4 mt-1">
                        <li>registro na Junta Comercial</li>
                        <li>regularização da empresa</li>
                    </ul>
                    </div>

                    <div className="border rounded-md p-3">
                    <p className="font-medium text-foreground">Uso prático</p>
                    <ul className="list-disc pl-4 mt-1">
                        <li>abertura de conta bancária</li>
                        <li>contratação de serviços</li>
                    </ul>
                    </div>
                </div>
                </>
            ),
            },

            when: {
            title: "Quando gerar?",
            content: (
                <>
                <p>
                    Após definir todos os dados da nova empresa na etapa anterior.
                </p>

                <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                    Recomendamos gerar o documento somente após revisar todas as informações.
                </div>
                </>
            ),
            },

            requirements: {
            title: "O que você precisa?",
            content: (
                <>
                <p>Para gerar o documento, você precisa já ter definido:</p>

                <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                    <li>natureza jurídica</li>
                    <li>capital social</li>
                    <li>dados do titular</li>
                    <li>sócios (se for LTDA)</li>
                </ul>

                <div className="mt-3 text-sm text-muted-foreground">
                    💡 Essas informações são obtidas automaticamente da etapa anterior.
                </div>
                </>
            ),
            },

            form: {
            title: "Gerar documento",
            content: howToContent,
            },
        }}

        howTo={{
            title: "Como funciona?",
            content: (
            <>
                <p>
                Revise os dados da sua empresa e clique no botão para gerar o documento.
                </p>

                <div className="mt-3 border rounded-md p-3 text-sm text-muted-foreground">
                <p>
                    O arquivo será gerado automaticamente em formato <b>.docx</b> e baixado no seu dispositivo.
                </p>
                </div>
            </>
            ),
        }}

        tips={{
            title: "Dicas importantes",
            content: (
            <div className="space-y-2 text-muted-foreground">
                <p>✔ Revise todos os dados antes de gerar o documento</p>
                <p>✔ O documento será utilizado em processos oficiais</p>
                <p>✔ Você pode editar o arquivo posteriormente, se necessário</p>

                <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
                Em caso de dúvida, valide o documento com um contador antes de utilizá-lo.
                </div>
            </div>
            ),
        }}
    />
  )
}