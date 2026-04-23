import { useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function DesenquadramentoStep() {
  const [checklist, setChecklist] = useState({
    entendeuMotivo: false,
    acessouPortal: false,
    solicitouProcesso: false,
  })

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <Card className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-900 text-white font-bold text-lg">
            1
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-amber-900 dark:text-amber-100">
              Desenquadramento do MEI
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Atenção, você está próximo do limite do MEI!
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
              O desenquadramento é o processo de saída do regime MEI para outro tipo de empresa, como Microempresa (ME). Após isso, sua empresa passa a ter novas obrigações fiscais e tributárias.
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
                Você está próximo do limite de MEI. Mesmo com o CNAE válido, seu faturamento anual no MEI (R$81.000), a lei exige a migração para Microempresa (ME).
              </p>
              <p className="font-medium text-foreground">Por que mudar agora?</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Segurança:</span> Evita multas e impostos retroativos
                </li>
                <li>
                  <span className="font-medium">Crescimento:</span> Permite continuar expandindo seu faturamento
                </li>
                <li>
                  <span className="font-medium">Regularidade:</span> Mantém seu CNPJ em dia com a Receita Federal
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
                <span className="font-medium">Quando passa a valer:</span> A partir de 1º de janeiro do ano seguinte.
              </li>
              <li>
                <span className="font-medium">O que esperar:</span> A Junta será necessário continuar pagando o boleto DAS MEI normalmente até dezembro.
              </li>
              <li>
                <span className="font-medium">A partir de 1º de janeiro do ano seguinte:</span> Para uma guia complementar (imposto sobre o lucro excedente), é partir daí, pagar como Microempresa (ME).
              </li>
            </ul>
          ),
        },

        when: {
          title: "Qual é o processo?",
          content: (
            <div className="space-y-3">
              <p className="font-medium text-foreground">Passo a passo:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Acesse o Portal do Simples Nacional.</li>
                <li>Vá em "Desenquadramento de SIMEI".</li>
                <li>Informe o motivo.</li>
                <li>Confirme a solicitação.</li>
              </ol>
            </div>
          ),
        },

        requirements: {
          title: "Do que você irá precisar?",
          content: (
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>CNPJ</li>
              <li>Possuir uma conta gov.br (o nível básico já é suficiente).</li>
              <li>
                Ter acesso ao Portal do Simples Nacional.
                <ul className="list-disc pl-5 mt-1">
                  <li className="text-xs text-muted-foreground">
                    Observação: lembre-se de marcar os documentos necessários no menu de Checklist de Documentos.
                  </li>
                </ul>
              </li>
            </ul>
          ),
        },
      }}

      howTo={{
        title: "Como fazer?",
        content: (
          <div className="space-y-5">
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
                        id="entendeu-motivo"
                        checked={checklist.entendeuMotivo}
                        onCheckedChange={() => handleChecklistChange("entendeuMotivo")}
                      />
                      <label
                        htmlFor="entendeu-motivo"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Entendi o motivo do desenquadramento.
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="acessou-portal"
                        checked={checklist.acessouPortal}
                        onCheckedChange={() => handleChecklistChange("acessouPortal")}
                      />
                      <label
                        htmlFor="acessou-portal"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Acessei o Portal do Simples Nacional.
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="solicitou-processo"
                        checked={checklist.solicitouProcesso}
                        onCheckedChange={() => handleChecklistChange("solicitouProcesso")}
                      />
                      <label
                        htmlFor="solicitou-processo"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Solicitei meu processo de desenquadramento.
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
                      Acompanhe o processo: O desenquadramento pode gerar impostos retroativos
                    </li>
                    <li>
                      Você terá novas obrigações fiscais
                    </li>
                    <li>
                      É recomendado o acompanhamento de um contador
                    </li>
                  </ul>
                </div>

                {/* Botão de ação */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Acessar o Portal
                </Button>
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
              Verifique se o nome empresarial está disponível antes de protocolar — consulte o sistema de viabilidade da Junta do seu estado.
            </p>
            <p>
              Guarde o número do protocolo gerado após o envio; ele é necessário para acompanhar o andamento do registro.
            </p>
            <p>
              Após a aprovação, você receberá o <strong className="text-foreground">NIRE</strong> (Número de Identificação do Registro de Empresa), necessário para a próxima etapa: Geração do Contrato Social.
            </p>
          </div>
        ),
      }}
    />
  )
}
