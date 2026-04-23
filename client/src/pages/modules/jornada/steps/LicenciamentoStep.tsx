import { useState } from "react"
import { StepTemplate } from "./StepTemplate"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function LicenciamentoStep() {
  const [checklist, setChecklist] = useState({
    verificouAtividade: false,
    consultouOrgaos: false,
    solicitouLicencas: false,
    separouDocumentos: false,
    acompanhouAndamento: false,
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
            6
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-amber-900 dark:text-amber-100">
              Licenciamento
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Atenção, você apenas iniciou esta etapa, mas não concluiu ela.
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
              O licenciamento é o processo de obtenção das autorizações necessárias para que a empresa possa exercer suas atividades de forma legal, de acordo com sua área de atuação e localização.
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
                Algumas atividades exigem licenças específicas para funcionamento. A ausência dessas autorizações pode resultar em multas, impedimentos ou até no fechamento do estabelecimento.
              </p>
              <p className="font-medium text-foreground">Motivos importantes:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Permissão de Uso:</span> Garante que seu negócio cumpre as normas de segurança e higiene da sua cidade.
                </li>
                <li>
                  <span className="font-medium">Proteção Ambiental:</span> Se aplicável, você consegue emitir Notas Fiscais de Serviço apoio o licenciamento.
                </li>
                <li>
                  <span className="font-medium">Proteção contra Multas:</span> Evita fiscalizações e penalidades por falta de licenciamento.
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
                <span className="font-medium">Quando passa a valer:</span> Após a atualização do CNPJ e antes do início das atividades operacionais da empresa.
              </li>
              <li>
                <span className="font-medium">Fique atento:</span> Algumas atividades exigem licenças antes do CNPJ, o licenciamento geralmente tem um prazo de validade (anual ou bienal, dependendo da sua cidade).
              </li>
              <li>
                <span className="font-medium">Até 20% de excesso:</span> Você terá a documentação de ME em mãos, mas o pagará os impostos de Microempresa em 1º de janeiro do ano que vem.
              </li>
            </ul>
          ),
        },

        when: {
          title: "Qual é o processo?",
          content: (
            <div className="space-y-3">
              <p className="font-medium text-foreground">Para verificar e obter as licenças necessárias:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Identifique as licenças exigidas para sua atividade</li>
                <li>Consulte a prefeitura do seu município</li>
                <li>Verifique a necessidade de licenças estaduais ou sanitárias</li>
                <li>Solicite as autorizações junto aos órgãos responsáveis</li>
                <li>Acompanhe o andamento das solicitações</li>
                <p className="text-xs text-muted-foreground mt-2">
                  Observação: As exigências podem variar de acordo com a cidade e tipo de atividade exercida.
                </p>
              </ol>
            </div>
          ),
        },

        requirements: {
          title: "Do que você irá precisar?",
          content: (
            <div className="space-y-2">
              <p className="font-medium text-foreground">O licenciamento varia de acordo com o tipo de atividade e localização da empresa. Em geral, você pode precisar de:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Endereço do estabelecimento</li>
                <li>Atividades exercidas (CNAE)</li>
                <li>Documentos específicos exigidos por cada órgão</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Observação: estes documentos são os mesmos definidos anteriormente.
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
                      id="verificou-atividade"
                      checked={checklist.verificouAtividade}
                      onCheckedChange={() => handleChecklistChange("verificouAtividade")}
                    />
                    <label
                      htmlFor="verificou-atividade"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Verifiquei se minha atividade exige licenciamento
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="consultou-orgaos"
                      checked={checklist.consultouOrgaos}
                      onCheckedChange={() => handleChecklistChange("consultouOrgaos")}
                    />
                    <label
                      htmlFor="consultou-orgaos"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Consultei os órgãos responsáveis no meu município
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="solicitou-licencas"
                      checked={checklist.solicitouLicencas}
                      onCheckedChange={() => handleChecklistChange("solicitouLicencas")}
                    />
                    <label
                      htmlFor="solicitou-licencas"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Solicitei as licenças necessárias
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="separou-documentos"
                      checked={checklist.separouDocumentos}
                      onCheckedChange={() => handleChecklistChange("separouDocumentos")}
                    />
                    <label
                      htmlFor="separou-documentos"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Separei os documentos exigidos
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="acompanhou-andamento"
                      checked={checklist.acompanhouAndamento}
                      onCheckedChange={() => handleChecklistChange("acompanhouAndamento")}
                    />
                    <label
                      htmlFor="acompanhou-andamento"
                      className="text-sm cursor-pointer text-muted-foreground"
                    >
                      Acompanhei o andamento das solicitações
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
                    Nem todas as empresas precisam de licenciamento específico
                  </li>
                  <li>
                    Atividades relacionadas a alimentos, saúde ou produtos químicos costumam exigir autorizações
                  </li>
                  <li>
                    Verifique sempre as exigências do seu município
                  </li>
                  <li>
                    Mantenha as licenças em dia e essencial para evitar problemas legais
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
              Nem todas as empresas precisam de licenciamento específico. Verifique com a prefeitura da sua cidade se sua atividade exige alguma autorização.
            </p>
            <p>
              Atividades relacionadas a alimentos, saúde ou produtos químicos costumam exigir autorizações. Sempre consulte os órgãos responsáveis.
            </p>
            <p>
              Mantenha as licenças em dia e essencial para evitar problemas legais e garantir o funcionamento regular do seu negócio.
            </p>
          </div>
        ),
      }}
    />
  )
}
