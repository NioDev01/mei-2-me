import { useEffect, useState } from "react"
import { NavBarMain } from "@/features/NavBarMain"
import { ArrowLeft, Smile, Frown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card.jsx"

export function NaoApto() {
  const [isEligible, setIsEligible] = useState<boolean | null>(null) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  async function fetchElegibilidade() {
    try {
      setLoading(true)
      setError(null)


      await new Promise(resolve => setTimeout(resolve, 1000))
      const fakeResponse = { elegivel: false } 

      setIsEligible(fakeResponse.elegivel)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchElegibilidade()
  }, [])

  // 🔹 Decide o conteúdo de acordo com isEligible
  function renderResultado() {
    if (loading) return <p>Carregando resultado...</p>
    if (error) return <p className="text-red-500">Erro: {error}</p>
    if (isEligible === null) return null

    return (
      <Card className="border-gray-700">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <h2
                className={`text-xl font-bold mr-3 ${
                  isEligible ? "text-green-400" : "text-red-400"
                }`}
              >
                {isEligible
                  ? "VOCÊ ESTÁ APTO PARA FAZER A TRANSIÇÃO"
                  : "VOCÊ NÃO ESTÁ APTO PARA FAZER A TRANSIÇÃO"}
              </h2>
              {isEligible ? (
                <Smile className="w-8 h-8 text-green-400" />
              ) : (
                <Frown className="w-8 h-8 text-red-400" />
              )}
            </div>

            <p className="mb-6">
              {isEligible
                ? "Com base nos dados preenchidos anteriormente, notamos que sua situação se enquadra nas circunstâncias requeridas para a transição de MEI para ME, pois:"
                : "Com base nos dados preenchidos anteriormente, infelizmente notamos que sua situação não se enquadra nas circunstâncias requeridas para a transição de MEI para ME, pois:"}
            </p>
          </div>

          {/* Lista condicional */}
          <ul className="space-y-2 mb-6">
            {isEligible ? (
              <>
                <li>Notas fiscais são geradas para Pessoas Jurídicas</li>
                <li>Seu faturamento anual é superior a R$81.000,00</li>
                <li>Você possui papel de sócio, administrador ou titular em outra empresa</li>
              </>
            ) : (
              <>
                <li>Seu faturamento anual é menor que R$81.000,00</li>
                <li>Não há emissão de notas fiscais para Pessoas Jurídicas</li>
                <li>Você não possui papel de sócio, administrador ou titular em outra empresa</li>
              </>
            )}
          </ul>

          {/* Texto final */}
          {isEligible ? (
            <p>
              Com base em seu perfil, é possível afirmar que o prazo em que a
              transição poderá ser feita seria:{" "}
              <span className="font-bold text-lg">IMEDIATO</span>. Cadastre-se em
              nossa plataforma e veja o que mais será necessário para a transição.
            </p>
          ) : (
            <p>
              Recomendamos que busque a orientação de um contador para entender o
              melhor momento e o processo ideal para a transição. Em caso de dúvidas,
              nosso chat bot está à sua disposição.
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen">
      <NavBarMain />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Botão voltar */}
        <div className="mb-8">
          <button className="flex items-center hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="underline">Voltar para a página inicial</span>
          </button>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">
            RESULTADO - DIAGNÓSTICO INICIAL
          </h1>
          <p>Entenda se é viável fazer ou não a transição e porquê.</p>
        </div>

 
        {renderResultado()}
      </main>
    </div>
  )
}

