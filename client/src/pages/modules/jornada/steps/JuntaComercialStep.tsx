import { useState } from "react"
import { StepTemplate } from "./StepTemplate"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// ─── DADOS POR ESTADO ────────────────────────────────────────────────────────

type JuntaInfo = {
  nome: string
  site: string
  telefone: string
}

const JUNTAS: Record<string, JuntaInfo> = {
  AC: { nome: "JUCEAC – Acre",             site: "https://www.juceac.ac.gov.br",          telefone: "(68) 3223-1937" },
  AL: { nome: "JUCEAL – Alagoas",           site: "https://www.juceal.al.gov.br",          telefone: "(82) 3315-4900" },
  AP: { nome: "JUCAP – Amapá",             site: "https://www.jucap.ap.gov.br",           telefone: "(96) 3212-6200" },
  AM: { nome: "JUCEA – Amazonas",           site: "https://www.jucea.am.gov.br",           telefone: "(92) 3182-4600" },
  BA: { nome: "JUCEB – Bahia",             site: "https://www.juceb.ba.gov.br",           telefone: "(71) 3116-9600" },
  CE: { nome: "JUCEC – Ceará",             site: "https://www.jucec.ce.gov.br",           telefone: "(85) 3101-4600" },
  DF: { nome: "JUCDF – Distrito Federal",  site: "https://www.jucdf.df.gov.br",           telefone: "(61) 3362-2700" },
  ES: { nome: "JUCEES – Espírito Santo",   site: "https://www.jucees.es.gov.br",          telefone: "(27) 3636-1700" },
  GO: { nome: "JUCEG – Goiás",             site: "https://www.juceg.go.gov.br",           telefone: "(62) 3201-8800" },
  MA: { nome: "JUCEMA – Maranhão",         site: "https://www.jucema.ma.gov.br",          telefone: "(98) 3219-6900" },
  MT: { nome: "JUCEMAT – Mato Grosso",     site: "https://www.jucemat.mt.gov.br",         telefone: "(65) 3613-8000" },
  MS: { nome: "JUCEMS – Mato Grosso do Sul", site: "https://www.jucems.ms.gov.br",        telefone: "(67) 3318-1900" },
  MG: { nome: "JUCEMG – Minas Gerais",    site: "https://www.jucemg.mg.gov.br",          telefone: "(31) 3915-9900" },
  PA: { nome: "JUCEPA – Pará",             site: "https://www.jucepa.pa.gov.br",          telefone: "(91) 3202-0600" },
  PB: { nome: "JUCEP – Paraíba",           site: "https://www.jucep.pb.gov.br",           telefone: "(83) 3208-7800" },
  PR: { nome: "JUCEPAR – Paraná",          site: "https://www.jucepar.pr.gov.br",         telefone: "(41) 3200-4800" },
  PE: { nome: "JUCEPE – Pernambuco",       site: "https://www.jucepe.pe.gov.br",          telefone: "(81) 3182-0900" },
  PI: { nome: "JUCEPI – Piauí",            site: "https://www.jucepi.pi.gov.br",          telefone: "(86) 3216-3600" },
  RJ: { nome: "JUCERJA – Rio de Janeiro", site: "https://www.jucerja.rj.gov.br",         telefone: "(21) 2332-9000" },
  RN: { nome: "JUCERN – Rio Grande do Norte", site: "https://www.jucern.rn.gov.br",      telefone: "(84) 3232-0200" },
  RS: { nome: "JUCERGS – Rio Grande do Sul", site: "https://www.jucergs.rs.gov.br",      telefone: "(51) 3210-2000" },
  RO: { nome: "JUCER – Rondônia",          site: "https://www.jucer.ro.gov.br",           telefone: "(69) 3216-5400" },
  RR: { nome: "JUCERR – Roraima",          site: "https://www.jucerr.rr.gov.br",          telefone: "(95) 3623-3200" },
  SC: { nome: "JUCESC – Santa Catarina",   site: "https://www.jucesc.sc.gov.br",          telefone: "(48) 3665-2900" },
  SP: { nome: "JUCESP – São Paulo",        site: "https://www.institucional.jucesp.sp.gov.br", telefone: "(11) 3241-5000" },
  SE: { nome: "JUCESE – Sergipe",          site: "https://www.jucese.se.gov.br",          telefone: "(79) 3226-3200" },
  TO: { nome: "JUCETO – Tocantins",        site: "https://www.juceto.to.gov.br",          telefone: "(63) 3218-3500" },
}

const ESTADOS_LABEL: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
  CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás",
  MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
  PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
  RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul",
  RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo",
  SE: "Sergipe", TO: "Tocantins",
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function JuntaComercialStep() {
  const [estado, setEstado] = useState("SP")
  const [checklist, setChecklist] = useState({
    acessouPortal: false,
    preencheuDados: false,
    enviouDocumentos: false,
    realizouPagamentos: false,
    acompanhouStatus: false,
  })

  const junta = JUNTAS[estado]

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-900 text-white font-bold text-lg">
            4
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-green-900 dark:text-green-100">
              Registro na Junta Comercial
            </p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              Parabéns! Esta etapa foi concluída!
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-2">
              O registro na Junta Comercial é o processo que formaliza legalmente a existência da empresa. Em São Paulo, esse registro é realizado pela JUCESP (Junta Comercial do Estado de São Paulo).
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
                Somente após o registro na Junta Comercial sua empresa passa a existir legalmente. Esse registro é necessário para obter o CNPJ e dar continuidade ao processo de formalização. E uma empresa sem registro é inválida legalmente.
              </p>
              <p className="font-medium text-foreground">Por que é importante?</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Proteção do Nome:</span> Garante que nenhuma outra empresa no seu estado possa usar o mesmo nome.
                </li>
                <li>
                  <span className="font-medium">Credibilidade e Bancos:</span> Com o registro em mãos, você libera acesso a contas bancárias, benefícios empresariais e crédito para fornecedores.
                </li>
                <li>
                  <span className="font-medium">Segurança Jurídica:</span> Protege você e seus sócios legalmente, transferindo responsabilidades para a empresa.
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
                <span className="font-medium">Quando passa a valer:</span> As novas definições da sua empresa (o novo Nome Empresarial e Capital Social) passam a valer imediatamente após a aprovação do processo pela Junta Comercial.
              </li>
              <li>
                <span className="font-medium">No seu caso:</span> A mudança de "Cambio" na Junta é imediata, mas o impacto nos seus impostos segue a regra de faturamento que você já conhece.
              </li>
              <li>
                <span className="font-medium">Até 20% de excesso:</span> Você terá o documento de ME em mãos, mas o pagará os impostos de Microempresa em 1º de janeiro do ano que vem.
              </li>
            </ul>
          ),
        },

        when: {
          title: "Qual é o processo?",
          content: (
            <div className="space-y-3">
              <p className="font-medium text-foreground">Para registrar sua empresa na Junta Comercial de São Paulo:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Acesse o portal da JUCESP</li>
                <li>Realize o cadastro (se necessário)</li>
                <li>Preencha os dados da empresa</li>
                <li>Anexe o contrato social e demais documentos</li>
                <li>Efetue o pagamento das taxas</li>
                <li>Acompanhe o status do processo</li>
              </ol>
            </div>
          ),
        },

        requirements: {
          title: "Do que você irá precisar?",
          content: (
            <div className="space-y-2">
              <p className="font-medium text-foreground">Para realizar o registro da empresa, você precisará:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Contrato social assinado</li>
                <li>Dados dos sócios (se houver)</li>
                <li>Dados da empresa</li>
                <li>Pagamento das taxas de registro</li>
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
          <div className="space-y-5">

            {/* SELEÇÃO DE ESTADO E INFORMAÇÕES DE CONTATO */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Selecione seu Estado:</Label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {Object.entries(ESTADOS_LABEL).map(([uf, nome]) => (
                    <option key={uf} value={uf}>{nome}</option>
                  ))}
                </select>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-3">
                <p className="font-medium text-sm text-foreground">Informações de contato:</p>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">🏛</span>
                  <span className="text-foreground">{junta.nome}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">🔗</span>
                  <a
                    href={junta.site}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80 break-all"
                  >
                    {junta.site.replace("https://", "")}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">📞</span>
                  <span className="text-foreground">{junta.telefone}</span>
                </div>
              </div>
            </div>

            {/* CHECKLIST E RECOMENDAÇÕES */}
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
                        id="acessou-portal"
                        checked={checklist.acessouPortal}
                        onCheckedChange={() => handleChecklistChange("acessouPortal")}
                      />
                      <label
                        htmlFor="acessou-portal"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Fiz o acesso ao Portal da Junta Comercial
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="preencheu-dados"
                        checked={checklist.preencheuDados}
                        onCheckedChange={() => handleChecklistChange("preencheuDados")}
                      />
                      <label
                        htmlFor="preencheu-dados"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Fiz o preenchimento de dados da empresa
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="enviou-documentos"
                        checked={checklist.enviouDocumentos}
                        onCheckedChange={() => handleChecklistChange("enviouDocumentos")}
                      />
                      <label
                        htmlFor="enviou-documentos"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Enviei os documentos necessários
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="realizou-pagamentos"
                        checked={checklist.realizouPagamentos}
                        onCheckedChange={() => handleChecklistChange("realizouPagamentos")}
                      />
                      <label
                        htmlFor="realizou-pagamentos"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Realizei os pagamentos das taxas
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="acompanhou-status"
                        checked={checklist.acompanhouStatus}
                        onCheckedChange={() => handleChecklistChange("acompanhouStatus")}
                      />
                      <label
                        htmlFor="acompanhou-status"
                        className="text-sm cursor-pointer text-muted-foreground"
                      >
                        Acompanhei o status do registro
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
                      Verifique se todos os dados estão corretos antes de enviar
                    </li>
                    <li>
                      Erros no contrato social podem impedir a aprovação
                    </li>
                    <li>
                      O prazo de análise pode variar
                    </li>
                    <li>
                      Guarde o número do protocolo para acompanhamento
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
              Após a aprovação, você receberá o <strong className="text-foreground">NIRE</strong> (Número de Identificação do Registro de Empresa), necessário para a próxima etapa: Atualização do CNPJ na Receita Federal.
            </p>
          </div>
        ),
      }}
    />
  )
}
