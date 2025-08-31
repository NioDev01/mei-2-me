import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ArrowLeft, Smile, Frown } from 'lucide-react'
import { NavBarMain } from "@/features/NavBarMain"

export function TelaApto() {
  const [isEligible, setIsEligible] = useState(true)

  const toggleEligibility = () => {
    setIsEligible(!isEligible)
  }

  return (
    <div className="min-h-screen ">
      <NavBarMain />

        

      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <button className="flex items-center  hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="underline">Voltar para a página inicial</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">RESULTADO - DIAGNÓSTICO INICIAL</h1>
          <p className=" mb-2">
            Entenda se é viável fazer ou não a transição e porquê.
          </p>
          <p className="">
            Abaixo explicaremos mais detalhadamente os motivos pelos quais a transição deve ser feita ou não, 
            baseada em seu caso.
          </p>
        </div>

        
        <Card className=" border-gray-700">
          <CardContent className="p-8">
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <h2 className={`text-xl font-bold mr-3 ${
                  isEligible ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isEligible 
                    ? 'VOCÊ ESTÁ APTO PARA FAZER A TRANSIÇÃO' 
                    : 'VOCÊ NÃO ESTÁ APTO PARA FAZER A TRANSIÇÃO'
                  }
                </h2>
                {isEligible ? (
                  <Smile className="w-8 h-8 text-green-400" />
                ) : (
                  <Frown className="w-8 h-8 text-red-400" />
                )}
              </div>
              
              <p className=" mb-6">
                {isEligible 
                  ? 'Com base nos dados preenchidos anteriormente, notamos que sua situação se enquadra nas circunstâncias requeridas para a transição de MEI para ME, pois:'
                  : 'Com base nos dados preenchidos anteriormente, infelizmente notamos que sua situação não se enquadra nas circunstâncias requeridas para a transição de MEI para ME, pois:'
                }
              </p>
            </div>

            {/* Details List */}
            <div className="mb-6">
              <ul className="space-y-2 ">
                {isEligible ? (
                  <>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Notas fiscais são geradas para Pessoas Jurídicas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Seu faturamento anual é superior a R$81.000,00</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Você possui papel de sócio, administrador ou titular em outra empresa</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Seu faturamento anual é menor que R$81.000,00</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Não há emissão de notas fiscais para Pessoas Jurídicas (outras empresas)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Você não possui um papel de sócio, administrador ou titular em outra empresa</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            
            <div className="">
              {isEligible ? (
                <p>
                  Com base em seu perfil, é possível afirmar que o prazo em que a transição poderá ser feita seria:{' '}
                  <span className="font-bold text-lg">IMEDIATO</span>, visto que todos os dados preenchidos estão de acordo com o esperado e nada está 
                  pendente. Cadastre-se em nossa plataforma e veja o que mais será necessário para a transição.
                </p>
              ) : (
                <p>
                  Recomendamos que busque a orientação de um contador para entender o melhor momento e o processo 
                  ideal para a transição. Em caso de dúvidas, nosso chat bot está à sua disposição.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}



