import { useState } from "react"
import { StepTemplate } from "./StepTemplate"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function RegimeTributarioStep() {
  const [checklist, setChecklist] = useState({
    entendeuRegime: false,
    analisouOpcoes: false,
    utilizouSimulador: false,
    avaliouRegime: false,
    realizouEscolha: false,
  })

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <Card className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 text-white font-bold text-lg">
            7
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-red-900 dark:text-red-100">
              Regime Tributário
            </p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">
              Atenção, você ainda não iniciou esta etapa.
            </p>
            <p className="text-xs text-red-700 dark:text-red-300 mt-2">
              O regime tributário define como a sua empresa irá pagar impostos. No Brasil, existem diferentes opções, sendo o Simples Nacional uma das mais comuns para microempresas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <StepTemplate
      header={header}

      sections={{
        whatIs: {
          title: "Por que isso é necessário?",
          content: (
            <div className="space-y-3">
              <p>
                A escolha do regime tributário impacta diretamente no valor dos impostos pagos pela empresa e nas obrigações legais.
              </p>
              <p className="font-medium text-foreground">Motivos importantes:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Economia Real:</span> Garantir que você pague a menor alíquota possível sem deixar de cumprir as obrigações.
                </li>
                <li>
                  <span className="font-medium">Segurança Fiscal:</span> Evita erros de cálculo que podem gerar multas pesadas ou problemas com a Receita.
                </li>
                <li>
                  <span className="font-medium">Preços Melhores:</span> Com impostos menores, seu produto ou serviço fica mais barato e competitivo para os clientes.
                </li>
              </ul>
            </div>
          ),
        },

        why: {
          title: "Quando isso irá se aplicar?",
          content: (
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">Quando passa a valer:</span> Após a formalização da empresa e antes do início das atividades operacionais.
              </li>
              <li>
                <span className="font-medium">No seu caso (Migração ou Faturamento):</span> A mudança depende do "pulo" que o faturamento deu:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Vendeu até R$(X) 2025: Você continua pagando o boleto fixo do MEI até dezembro. O novo regime é os impostos se começam em 1º de janeiro do ano que vem.</li>
                </ul>
              </li>
            </ul>
          ),
        },

        when: {
          title: "Qual é o processo?",
          content: (
            <div className="space-y-3">
              <p className="font-medium text-foreground">Para escolher o regime tributário:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Analise as opções disponíveis (ex: Simples Nacional, Lucro Presumido)</li>
                <li>Utilize o simulador para comparar os regimes</li>
                <li>Verifique qual opção melhor se aplica à sua empresa</li>
                <li>Realize a opção pelo regime escolhido dentro do prazo legal</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-2">
                Observação: A opção pelo Simples Nacional deve ser feita dentro do prazo estabelecido após a abertura da empresa.
              </p>
            </div>
          ),
        },

        requirements: {
          title: "Do que você irá precisar?",
          content: (
            <div className="space-y-2">
              <p className="font-medium text-foreground">Para definir o regime tributário, você precisará considerar:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Faturamento estimado da empresa</li>
                <li>Atividades exercidas (CNAE)</li>
                <li>Estrutura da empresa</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Observação: Recomendamos consultar um contador para tomar a melhor decisão.
              </p>
            </div>
          ),
        },
      }}

      howTo={{
        title: "Como fazer?",
        content: (
          <div className="space-y-5">

            {/* Seção esquerda e direita */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Coluna Esquerda */}
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-sm text-foreground mb-3">
                    Do que você irá precisar:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>Faturamento estimado da empresa</li>
                    <li>Atividades exercidas (CNAE)</li>
                    <li>Estrutura da empresa</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-sm text-foreground mb-3">
                    Recomendações e pontos de atenção
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      O Simples Nacional é comum para microempresas, mas nem sempre é a melhor opção
                    </li>
                    <li>
                      O prazo para escolha do regime é limitado
                    </li>
                    <li>
                      A escolha incorreta pode aumentar a carga tributária
                    </li>
                    <li>
                      Em caso de dúvida, considere o apoio de um contador
                    </li>
                  </ul>
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="space-y-4">
                <Card className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-2">
                        Apoio do Simulador
                      </p>
                      <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
                        Para te ajudar na escolha do regime tributário, recomendamos utilizar o simulador disponível na plataforma.
                      </p>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Ir para o Simulador
                    </Button>
                  </CardContent>
                </Card>

               
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <div>
                <p className="font-medium text-sm text-foreground mb-3">
                  Checklist desta etapa:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="entendeu-regime"
                      checked={checklist.entendeuRegime}
                      onCheckedChange={() => handleChecklistChange("entendeuRegime")}
                    />
                    <label
                      htmlFor="entendeu-regime"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Entendi o que é o regime tributário
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="analisou-opcoes"
                      checked={checklist.analisouOpcoes}
                      onCheckedChange={() => handleChecklistChange("analisouOpcoes")}
                    />
                    <label
                      htmlFor="analisou-opcoes"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Analisei as opções disponíveis
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="utilizou-simulador"
                      checked={checklist.utilizouSimulador}
                      onCheckedChange={() => handleChecklistChange("utilizouSimulador")}
                    />
                    <label
                      htmlFor="utilizou-simulador"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Utilizei o simulador (se necessário)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="avaliou-regime"
                      checked={checklist.avaliouRegime}
                      onCheckedChange={() => handleChecklistChange("avaliouRegime")}
                    />
                    <label
                      htmlFor="avaliou-regime"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Avaliei qual seria o regime mais adequado ao meu caso
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="realizou-escolha"
                      checked={checklist.realizouEscolha}
                      onCheckedChange={() => handleChecklistChange("realizouEscolha")}
                    />
                    <label
                      htmlFor="realizou-escolha"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Realizei minha escolha dentro do prazo
                    </label>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Observação: O preenchimento de todos os itens acima indica que você está pronto para seguir para a próxima etapa.
              </p>
            </div>

          </div>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              O Simples Nacional é comum para microempresas, mas nem sempre é a melhor opção. Analise bem antes de tomar a decisão.
            </p>
            <p>
              O prazo para escolha do regime é limitado — não deixe para a última hora. Consulte um contador se tiver dúvidas.
            </p>
            <p>
              A escolha incorreta pode aumentar significativamente a carga tributária. Utilize o simulador para comparar as opções disponíveis.
            </p>
          </div>
        ),
      }}
    />
  )
}
