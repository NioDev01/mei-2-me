import { useState } from "react"
import { StepTemplate } from "./StepTemplate"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function ObrigacoesFiscaisStep() {
  const [checklist, setChecklist] = useState({
    entendeuObrigacoes: false,
    sabeEmitirNotas: false,
    estouCiente: false,
    organizouControle: false,
    considerouContador: false,
  })

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-900 text-white font-bold text-lg">
            8
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-green-900 dark:text-green-100">
              Obrigações Fiscais
            </p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              Parabéns! Esta etapa foi concluída!
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-2">
              As obrigações fiscais são os compromissos que a empresa deve cumprir regularmente após a sua formalização, como pagamento de impostos, emissão de notas fiscais e envio de declarações.
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
                O cumprimento das obrigações fiscais é essencial para manter a empresa regular. O não cumprimento pode gerar multas, impedimentos e outros problemas legais.
              </p>
              <p className="font-medium text-foreground">Motivos importantes:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">CNPJ Ativo:</span> Manter as declarações em dia evita que seu CNPJ seja suspenso ou bloqueado.
                </li>
                <li>
                  <span className="font-medium">Livre de Multas:</span> Evita cobranças automáticas que o governo aplica sempre que um prazo é perdido.
                </li>
                <li>
                  <span className="font-medium">Comprovação de Renda:</span> A atuação desses documentos que você processa empresarialmente e aluguel.
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
                <span className="font-medium">Quando passa a valer:</span> Após a definição do regime tributário e durante toda a operação da empresa.
              </li>
              <li>
                <span className="font-medium">No seu caso (Migração ou Faturamento):</span> O calendário de entrega depende de quanto é sua divisão de impostos.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Vendeu até R$97.2025: Você continua com as obrigações simples do MEI até dezembro. As novas obrigações começam em janeiro do ano que vem.</li>
                </ul>
              </li>
            </ul>
          ),
        },

        when: {
          title: "Qual é o processo?",
          content: (
            <div className="space-y-3">
              <p className="font-medium text-foreground">Para manter sua empresa em dia com as obrigações fiscais:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Emitir notas fiscais para as atividades realizadas</li>
                <li>Apurar e pagar os impostos de acordo com o regime tributário</li>
                <li>Enviar declarações obrigatórias nos prazos estabelecidos</li>
                <li>Manter controle das receitas e despesas</li>
                <li>Acompanhar possíveis mudanças na legislação</li>
              </ol>
            </div>
          ),
        },

        requirements: {
          title: "Do que você irá precisar?",
          content: (
            <div className="space-y-2">
              <p className="font-medium text-foreground">Para cumprir suas obrigações fiscais, você precisará:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Acesso aos sistemas fiscais (municipais, estaduais ou federais)</li>
                <li>Dados da empresa atualizados</li>
                <li>Organização financeira básica</li>
                <li>Apoio contábil (recomendado)</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Observação: O preenchimento de todos os itens acima indica que você está pronto para seguir para a próxima etapa.
              </p>
            </div>
          ),
        },
      }}

      howTo={{
        title: "Como fazer?",
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Coluna Esquerda */}
            <div className="space-y-4">
              <div>
                <p className="font-medium text-sm text-foreground mb-3">
                  Checklist desta etapa:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="entendeu-obrigacoes"
                      checked={checklist.entendeuObrigacoes}
                      onCheckedChange={() => handleChecklistChange("entendeuObrigacoes")}
                    />
                    <label
                      htmlFor="entendeu-obrigacoes"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Entendi minhas obrigações fiscais
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="sabe-emitir"
                      checked={checklist.sabeEmitirNotas}
                      onCheckedChange={() => handleChecklistChange("sabeEmitirNotas")}
                    />
                    <label
                      htmlFor="sabe-emitir"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Sei como emitir notas fiscais
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="estou-ciente"
                      checked={checklist.estouCiente}
                      onCheckedChange={() => handleChecklistChange("estouCiente")}
                    />
                    <label
                      htmlFor="estou-ciente"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Estou ciente dos prazos de pagamento de impostos
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="organizou-controle"
                      checked={checklist.organizouControle}
                      onCheckedChange={() => handleChecklistChange("organizouControle")}
                    />
                    <label
                      htmlFor="organizou-controle"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Organizei o controle financeiro básico
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="considerou-contador"
                      checked={checklist.considerouContador}
                      onCheckedChange={() => handleChecklistChange("considerouContador")}
                    />
                    <label
                      htmlFor="considerou-contador"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Considerei o apoio de um contador
                    </label>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Observação: O preenchimento de todos os itens acima indica que você está pronto para seguir para a próxima etapa.
              </p>
            </div>

            {/* Coluna Direita */}
            <div className="space-y-4">
              <div>
                <p className="font-medium text-sm text-foreground mb-3">
                  Recomendações e pontos de atenção
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="font-medium">Ore cuidados:</span>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>O apoio de um contador é altamente recomendado</li>
                      <li>O atraso no pagamento de impostos gera multa e juros</li>
                      <li>A organização financeira facilita o cumprimento das obrigações</li>
                      <li>Fique atento aos prazos fiscais</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              O apoio de um contador é altamente recomendado para garantir o cumprimento correto de todas as obrigações fiscais.
            </p>
            <p>
              O atraso no pagamento de impostos gera multa e juros. Mantenha um calendário atualizado com os prazos.
            </p>
            <p>
              A organização financeira desde o início é essencial para evitar problemas e garantir crescimento sustentável.
            </p>
          </div>
        ),
      }}
    />
  )
}
