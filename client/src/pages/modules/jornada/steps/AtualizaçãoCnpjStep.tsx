import { useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function AtualizacaoCnpjStep() {
  const [protocolo, setProtocolo] = useState("")
  const [protocoloSalvo, setProtocoloSalvo] = useState("")

  // ── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <Card className="border-l-4 border-primary">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <p className="font-medium text-sm">Atualização do CNPJ</p>
            <p className="text-xs text-muted-foreground">
              Atualize os dados da sua empresa na Receita Federal
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
          title: "O que é?",
          content: (
            <>
              A atualização do CNPJ na Receita Federal é um procedimento obrigatório
              para empresas que mudam de regime tributário ou alteram dados cadastrais.
              Este processo garante que seus dados estejam sempre atualizados no sistema federal.
            </>
          ),
        },

        why: {
          title: "Por que isso é necessário?",
          content: (
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Cumprir obrigações legais</li>
              <li>Evitar multas e penalidades</li>
              <li>Facilitar transações comerciais</li>
              <li>Manter credibilidade junto a órgãos públicos</li>
            </ul>
          ),
        },

        when: {
          title: "Quando fazer?",
          content: (
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Mudar de regime tributário</li>
              <li>Alterar dados da empresa</li>
              <li>Mudar endereço</li>
              <li>Modificar atividade econômica</li>
            </ul>
          ),
        },

        requirements: {
          title: "O que você vai precisar?",
          content: (
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Dados atualizados da empresa</li>
              <li>Comprovante de endereço</li>
              <li>Documentos de identificação</li>
              <li>Acesso ao portal da Receita Federal</li>
            </ul>
          ),
        },
      }}

      howTo={{
        title: "Como fazer?",
        content: (
          <div className="space-y-5">

            {/* Documentos Necessários */}
            <div>
              <p className="font-medium text-sm mb-3">Documentos Necessários</p>
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-blue-500">📁</span>
                  <span>Pendências fiscais estão impedindo a atualização</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-blue-500">📁</span>
                  <span>A documentação se encontra incompleta ou desatualizada</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-blue-500">📁</span>
                  <span>Pendências fiscais estão impedindo a atualização</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-blue-500">📁</span>
                  <span>A documentação se encontra incompleta ou desatualizada</span>
                </div>
              </div>
            </div>

            {/* Erros Mais Comuns */}
            <div>
              <p className="font-medium text-sm mb-3">Erros mais comuns</p>
              <Card className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-amber-600">⚠️</span>
                    <span>CNPJ não encontrado no sistema da Receita Federal</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-amber-600">⚠️</span>
                    <span>Os Dados se encontram inconsistentes entre a Junta Comercial e a Receita Federal</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-amber-600">⚠️</span>
                    <span>Pendências fiscais estão impedindo a atualização</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-amber-600">⚠️</span>
                    <span>A Documentação se encontra incompleta ou desatualizada</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status da Atualização */}
            <div>
              <p className="font-medium text-sm mb-3">Status da Atualização</p>
              <Card className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-3 flex gap-2 items-start">
                  <span className="text-amber-600 text-base">⏳</span>
                  <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      Aguardando processamento
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-500">
                      Tempo estimado: 24 - 48 horas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registrar Protocolo */}
            <div className="space-y-2">
              <p className="font-medium text-sm">Registrar protocolo:</p>
              <Label className="text-xs text-muted-foreground">Número do protocolo:</Label>
              <Input
                placeholder="Exemplo: 2025123456789"
                value={protocolo}
                onChange={(e) => setProtocolo(e.target.value)}
              />
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white mt-1"
                onClick={() => {
                  if (protocolo.trim()) {
                    setProtocoloSalvo(protocolo.trim())
                  }
                }}
              >
                Registrar Protocolo
              </Button>
              {protocoloSalvo && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  ✓ Protocolo {protocoloSalvo} registrado com sucesso.
                </p>
              )}
            </div>

          </div>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-2 text-muted-foreground">
            <p>
              Verifique os dados antes de enviar — revise todas as informações para
              evitar erros que possam atrasar o processo.
            </p>
            <p>
              Guarde os comprovantes de todos os documentos enviados para futuras
              consultas e acompanhamento do processo.
            </p>
            <p>
              Você receberá notificações sobre o status da atualização. Acompanhe
              regularmente o portal da Receita Federal para verificar o andamento.
            </p>
          </div>
        ),
      }}
    />
  )
}
