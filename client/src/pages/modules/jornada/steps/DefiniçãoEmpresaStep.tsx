import { useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function DefinicaoEmpresaStep() {
  const [checklist, setChecklist] = useState({
    tipoEmpresa: false,
    possuidorSocios: false,
    atividadesCnae: false,
    informacoesSocios: false,
    endereco: false,
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
            2
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-green-900 dark:text-green-100">
              Definição da Nova Empresa
            </p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              Muito bom! Os dados da nova empresa estão definidos!
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-2">
              Nesta etapa, você irá definir as informações básicas da sua nova empresa, como tipo jurídico, atividades exercidas e capital social. Esses dados serão utilizados nas próximas etapas do processo.
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
                As informações definidas aqui impactam diretamente na formalização da empresa. Elas são essenciais para as obrigações legais.
              </p>
              <p className="font-medium text-foreground">Por que cada é crucial?</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Tipo de Empresa:</span> Determina como sua empresa será constituída (SLU ou ME com sócios). Isso determinará como seu patrimônio pessoal está protegido.
                </li>
                <li>
                  <span className="font-medium">Enquadramento Tributário:</span> Você poderá optar pelo Simples Nacional, garantindo alíquotas reduzidas, mas com regras diferentes das MEI.
                </li>
                <li>
                  <span className="font-medium">Planejamento de Custos:</span> Cada escolha aqui influencia o valor dos impostos mensais e a necessidade de contáveis especializados.
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
                <span className="font-medium">Quando passa a valer:</span> A nova definição (nome empresarial, capital social, sócios) passa a valer a partir do registro na Junta Comercial do seu estado.
              </li>
              <li>
                <span className="font-medium">No seu caso:</span> Você deve um desenquadramento por quê? Enquanto isso, até 20% de excesso: a definição da nova empresa e os novos impostos passam a valer em 1º de janeiro do seguinte.
              </li>
              <li>
                <span className="font-medium">Até 20% de excesso:</span> A validade é retroativa a 1º de janeiro do ano atual. O usuário "virá" ME retroativamente e precisa ajustar as contas do passado.
              </li>
            </ul>
          ),
        },

        when: {
          title: "Qual é o processo?",
          content: (
            <div className="space-y-3">
              <p className="font-medium text-foreground">Para definir sua nova empresa, siga os passos abaixo:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Escolha o tipo jurídico da empresa.</li>
                <li>Defina se haverá sócios.</li>
                <li>Determine o capital social.</li>
                <li>Selecione as atividades que a empresa irá exercer (CNAE).</li>
                <li>Informe o endereço da empresa.</li>
              </ol>
            </div>
          ),
        },

        requirements: {
          title: "Do que você irá precisar?",
          content: (
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Dados pessoais</li>
              <li>Endereço da empresa (atualizado).</li>
              <li>Atividades exercidas (CNAE) que sejam válidas.</li>
              <li>Informações sobre sócios (se houver).</li>
            </ul>
          ),
        },
      }}

      howTo={{
        title: "Recomendações e pontos de atenção",
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
                        id="tipo-empresa"
                        checked={checklist.tipoEmpresa}
                        onCheckedChange={() => handleChecklistChange("tipoEmpresa")}
                      />
                      <label
                        htmlFor="tipo-empresa"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        A definição do tipo de empresa foi feita.
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="possuidor-socios"
                        checked={checklist.possuidorSocios}
                        onCheckedChange={() => handleChecklistChange("possuidorSocios")}
                      />
                      <label
                        htmlFor="possuidor-socios"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        A definição de possuir sócios ou não foi feita.
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="atividades-cnae"
                        checked={checklist.atividadesCnae}
                        onCheckedChange={() => handleChecklistChange("atividadesCnae")}
                      />
                      <label
                        htmlFor="atividades-cnae"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        As atividades (CNAE) foram definidas.
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="informacoes-socios"
                        checked={checklist.informacoesSocios}
                        onCheckedChange={() => handleChecklistChange("informacoesSocios")}
                      />
                      <label
                        htmlFor="informacoes-socios"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        O endereço atualizado foi definido.
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="endereco"
                        checked={checklist.endereco}
                        onCheckedChange={() => handleChecklistChange("endereco")}
                      />
                      <label
                        htmlFor="endereco"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        O endereço atualizado foi definido.
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
                      <span className="font-medium text-foreground">CNAE:</span> Escolha com atenção para evitar multas fiscais.
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Tipo Jurídico:</span> Define responsabilidades legais. Se estiver sozinho, a SLU é a melhor opção para proteger seus bens pessoais.
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Capital Social:</span> Defina um valor real e compatível com seu investimento e atividades escolhidas.
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Contador:</span> É obrigatório por lei. Um bom profissional evita que você pague impostos desnecessários.
                    </li>
                  </ul>
                </div>
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
