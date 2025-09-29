import { useEffect, useState } from "react"
import { NavBarMain } from "@/features/NavBarMain"
import { ArrowLeft } from "lucide-react"
import { TelaApto } from "./modules/TelaApto"
import { TelaNaoApto } from "./modules/TelaNaoApto"

export function DiagnosticoInicial() {
  const [isEligible, setIsEligible] = useState<boolean | null>(null) // null = carregando
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔥 Função que busca a elegibilidade na API
  async function fetchElegibilidade() {
    try {
      setLoading(true)
      setError(null)

      // Exemplo de chamada (substitua pela sua API real)
      const response = await fetch("https://api.meusistema.com/elegibilidade/usuario/123")
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API")
      }

      const data = await response.json()

      // Supondo que a API retorna { elegivel: true } ou { elegivel: false }
      setIsEligible(data.elegivel)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Chama a API assim que a tela abre
  useEffect(() => {
    fetchElegibilidade()
  }, [])

  // 🔹 Decide qual tela mostrar
  function renderResultado() {
    if (loading) {
      return <p>Carregando resultado...</p>
    }

    if (error) {
      return <p className="text-red-500">Erro: {error}</p>
    }

    if (isEligible === true) {
      return <TelaApto />
    }

    if (isEligible === false) {
      return <TelaNaoApto />
    }

    return null
  }

  return (
    <div className="min-h-screen">
      <NavBarMain />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Voltar */}
        <div className="mb-8">
          <button className="flex items-center hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="underline">Voltar para a página inicial</span>
          </button>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">RESULTADO - DIAGNÓSTICO INICIAL</h1>
          <p>Entenda se é viável fazer ou não a transição e porquê.</p>
        </div>

        {/* Resultado vindo da API */}
        {renderResultado()}
      </main>
    </div>
  )
}
