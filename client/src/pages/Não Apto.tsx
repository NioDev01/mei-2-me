import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ArrowLeft, Smile, Frown } from 'lucide-react'
import { NavBarMain } from "@/features/NavBarMain"

export function TelaApto() {
  const [isEligible, setIsEligible] = useState(true)

  // funções para trocar de tela
  const setApto = () => setIsEligible(true)
  const setNaoApto = () => setIsEligible(false)

  return (
    <div className="min-h-screen">
      <NavBarMain />

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Botão de voltar */}
        <div className="mb-8">
          <button className="flex items-center hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="underline">Voltar para a página inicial</span>
          </button>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">RESULTADO - DIAGNÓSTICO INICIAL</h1>
          <p className="mb-2">Entenda se é viável fazer ou não a transição e porquê.</p>
          <p>Abaixo explicaremos mais detalhadamente os motivos...</p>
        </div>

        <Card className="border-gray-700">
          <CardContent className="p-8">

            {/* Cabeçalho */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <h2 className={`text-xl font-bold mr-3 ${isEligible ? 'text-green-400' : 'text-red-400'}`}>
                  {isEligible
                    ? 'VOCÊ ESTÁ APTO PARA FAZER A TRANSIÇÃO'
                    : 'VOCÊ NÃO ESTÁ APTO PARA FAZER A TRANSIÇÃO'}
                </h2>
                {isEligible
                  ? <Smile className="w-8 h-8 text-green-400" />
                  : <Frown className="w-8 h-8 text-red-400" />}
              </div>

              <p className="mb-6">
                {isEligible
                  ? 'Com base nos dados preenchidos anteriormente, notamos que sua situação se enquadra...'
                  : 'Com base nos dados preenchidos anteriormente, infelizmente sua situação não se enquadra...'}
              </p>
            </div>

            {/* Lista */}
            <div className="mb-6">
              <ul className="space-y-2">
                {isEligible ? (
                  <>
                    <li>Notas fiscais são geradas para Pessoas Jurídicas</li>
                    <li>Seu faturamento anual é superior a R$81.000,00</li>
                    <li>Você possui papel de sócio ou administrador em outra empresa</li>
                  </>
                ) : (
                  <>
                    <li>Seu faturamento anual é menor que R$81.000,00</li>
                    <li>Não há emissão de notas fiscais para Pessoas Jurídicas</li>
                    <li>Você não possui papel de sócio ou administrador em outra empresa</li>
                  </>
                )}
              </ul>
            </div>

            {/* Mensagem final */}
            <div>
              {isEligible ? (
                <p>
                  A transição pode ser feita de forma <span className="font-bold text-lg">IMEDIATA</span>.
                </p>
              ) : (
                <p>
                  Recomendamos que busque orientação de um contador para entender o melhor momento.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Botões de teste */}
        <div className="flex gap-4 mt-6">
          <button onClick={setApto} className="px-4 py-2 bg-green-500 text-white rounded-lg">Ver tela Apto</button>
          <button onClick={setNaoApto} className="px-4 py-2 bg-red-500 text-white rounded-lg">Ver tela Não Apto</button>
        </div>

      </main>
    </div>
  )
}
