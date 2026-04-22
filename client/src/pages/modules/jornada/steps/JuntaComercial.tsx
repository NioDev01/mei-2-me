import { useState } from "react"
import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── DADOS POR ESTADO ────────────────────────────────────────────────────────

type JuntaInfo = {
  nome: string
  site: string
  telefone: string
  instrucao: string
}

const JUNTAS: Record<string, JuntaInfo> = {
  AC: { nome: "JUCEAC – Acre",             site: "https://www.juceac.ac.gov.br",          telefone: "(68) 3223-1937", instrucao: "Acesse o site da JUCEAC e faça o cadastro online" },
  AL: { nome: "JUCEAL – Alagoas",           site: "https://www.juceal.al.gov.br",          telefone: "(82) 3315-4900", instrucao: "Acesse o site da JUCEAL e faça o cadastro online" },
  AP: { nome: "JUCAP – Amapá",             site: "https://www.jucap.ap.gov.br",           telefone: "(96) 3212-6200", instrucao: "Acesse o site da JUCAP e faça o cadastro online" },
  AM: { nome: "JUCEA – Amazonas",           site: "https://www.jucea.am.gov.br",           telefone: "(92) 3182-4600", instrucao: "Acesse o site da JUCEA e faça o cadastro online" },
  BA: { nome: "JUCEB – Bahia",             site: "https://www.juceb.ba.gov.br",           telefone: "(71) 3116-9600", instrucao: "Acesse o site da JUCEB e faça o cadastro online" },
  CE: { nome: "JUCEC – Ceará",             site: "https://www.jucec.ce.gov.br",           telefone: "(85) 3101-4600", instrucao: "Acesse o site da JUCEC e faça o cadastro online" },
  DF: { nome: "JUCDF – Distrito Federal",  site: "https://www.jucdf.df.gov.br",           telefone: "(61) 3362-2700", instrucao: "Acesse o site da JUCDF e faça o cadastro online" },
  ES: { nome: "JUCEES – Espírito Santo",   site: "https://www.jucees.es.gov.br",          telefone: "(27) 3636-1700", instrucao: "Acesse o site da JUCEES e faça o cadastro online" },
  GO: { nome: "JUCEG – Goiás",             site: "https://www.juceg.go.gov.br",           telefone: "(62) 3201-8800", instrucao: "Acesse o site da JUCEG e faça o cadastro online" },
  MA: { nome: "JUCEMA – Maranhão",         site: "https://www.jucema.ma.gov.br",          telefone: "(98) 3219-6900", instrucao: "Acesse o site da JUCEMA e faça o cadastro online" },
  MT: { nome: "JUCEMAT – Mato Grosso",     site: "https://www.jucemat.mt.gov.br",         telefone: "(65) 3613-8000", instrucao: "Acesse o site da JUCEMAT e faça o cadastro online" },
  MS: { nome: "JUCEMS – Mato Grosso do Sul", site: "https://www.jucems.ms.gov.br",        telefone: "(67) 3318-1900", instrucao: "Acesse o site da JUCEMS e faça o cadastro online" },
  MG: { nome: "JUCEMG – Minas Gerais",    site: "https://www.jucemg.mg.gov.br",          telefone: "(31) 3915-9900", instrucao: "Acesse o site da JUCEMG e faça o cadastro online" },
  PA: { nome: "JUCEPA – Pará",             site: "https://www.jucepa.pa.gov.br",          telefone: "(91) 3202-0600", instrucao: "Acesse o site da JUCEPA e faça o cadastro online" },
  PB: { nome: "JUCEP – Paraíba",           site: "https://www.jucep.pb.gov.br",           telefone: "(83) 3208-7800", instrucao: "Acesse o site da JUCEP e faça o cadastro online" },
  PR: { nome: "JUCEPAR – Paraná",          site: "https://www.jucepar.pr.gov.br",         telefone: "(41) 3200-4800", instrucao: "Acesse o site da JUCEPAR e faça o cadastro online" },
  PE: { nome: "JUCEPE – Pernambuco",       site: "https://www.jucepe.pe.gov.br",          telefone: "(81) 3182-0900", instrucao: "Acesse o site da JUCEPE e faça o cadastro online" },
  PI: { nome: "JUCEPI – Piauí",            site: "https://www.jucepi.pi.gov.br",          telefone: "(86) 3216-3600", instrucao: "Acesse o site da JUCEPI e faça o cadastro online" },
  RJ: { nome: "JUCERJA – Rio de Janeiro", site: "https://www.jucerja.rj.gov.br",         telefone: "(21) 2332-9000", instrucao: "Acesse o site da JUCERJA e faça o cadastro online" },
  RN: { nome: "JUCERN – Rio Grande do Norte", site: "https://www.jucern.rn.gov.br",      telefone: "(84) 3232-0200", instrucao: "Acesse o site da JUCERN e faça o cadastro online" },
  RS: { nome: "JUCERGS – Rio Grande do Sul", site: "https://www.jucergs.rs.gov.br",      telefone: "(51) 3210-2000", instrucao: "Acesse o site da JUCERGS e faça o cadastro online" },
  RO: { nome: "JUCER – Rondônia",          site: "https://www.jucer.ro.gov.br",           telefone: "(69) 3216-5400", instrucao: "Acesse o site da JUCER e faça o cadastro online" },
  RR: { nome: "JUCERR – Roraima",          site: "https://www.jucerr.rr.gov.br",          telefone: "(95) 3623-3200", instrucao: "Acesse o site da JUCERR e faça o cadastro online" },
  SC: { nome: "JUCESC – Santa Catarina",   site: "https://www.jucesc.sc.gov.br",          telefone: "(48) 3665-2900", instrucao: "Acesse o site da JUCESC e faça o cadastro online" },
  SP: { nome: "JUCESP – São Paulo",        site: "https://www.institucional.jucesp.sp.gov.br", telefone: "(11) 3241-5000", instrucao: "Acesse o site da JUCESP e faça o cadastro online" },
  SE: { nome: "JUCESE – Sergipe",          site: "https://www.jucese.se.gov.br",          telefone: "(79) 3226-3200", instrucao: "Acesse o site da JUCESE e faça o cadastro online" },
  TO: { nome: "JUCETO – Tocantins",        site: "https://www.juceto.to.gov.br",          telefone: "(63) 3218-3500", instrucao: "Acesse o site da JUCETO e faça o cadastro online" },
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
  const [protocolo, setProtocolo] = useState("")
  const [protocoloSalvo, setProtocoloSalvo] = useState("")

  const junta = JUNTAS[estado]

  // ── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <Card className="border-l-4 border-primary">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏛</span>
          <div>
            <p className="font-medium text-sm">Registro na Junta Comercial</p>
            <p className="text-xs text-muted-foreground">
              Registre sua empresa na Junta Comercial do seu estado
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
          title: "O que é a Junta Comercial?",
          content: (
            <>
              A Junta Comercial é o órgão estadual responsável pelo registro e
              legalização de empresas. É obrigatório registrar sua empresa na Junta
              do estado onde ela irá operar para que ela tenha existência legal.
            </>
          ),
        },

        why: {
          title: "Por que isso é necessário?",
          content: (
            <>
              Sem o registro na Junta Comercial, sua empresa não possui CNPJ ativo
              como Microempresa (ME) e não pode emitir notas fiscais, abrir conta
              bancária empresarial ou celebrar contratos formais.
            </>
          ),
        },

        when: {
          title: "Quando fazer?",
          content: (
            <>
              O registro deve ser feito logo após a elaboração do Contrato Social.
              O prazo de análise varia por estado — geralmente entre 3 e 15 dias úteis.
              Após aprovado, você receberá o NIRE (Número de Identificação do Registro
              de Empresa).
            </>
          ),
        },

        requirements: {
          title: "O que você vai precisar?",
          content: (
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Contrato Social assinado por todos os sócios</li>
              <li>RG e CPF de todos os sócios</li>
              <li>Comprovante de endereço da sede da empresa</li>
              <li>Requerimento de empresário (para empresário individual)</li>
              <li>Declaração de desimpedimento dos sócios</li>
            </ul>
          ),
        },
      }}

      howTo={{
        title: "Registro na Junta Comercial",
        content: (
          <div className="space-y-5">

            {/* Seletor de estado + instruções */}
            <div className="grid md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label>Instruções Específicas:</Label>
                <div className="flex h-10 items-center rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground">
                  {junta.instrucao}
                </div>
              </div>
            </div>

            {/* Informações de contato */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="font-medium text-sm">Informações de contato:</p>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">🏛</span>
                  <span>{junta.nome}</span>
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
                  <span>{junta.telefone}</span>
                </div>

                {/* Lembrete automático */}
                <Card className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 mt-2">
                  <CardContent className="p-3 flex gap-2 items-start">
                    <span className="text-yellow-500 text-base">🕐</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                        Lembrete Automático
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-500">
                        Você receberá um lembrete 3 dias antes do prazo de vencimento.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Registrar protocolo */}
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

          </div>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-2 text-muted-foreground">
            <p>
              Verifique se o nome empresarial está disponível antes de protocolar —
              consulte o sistema de viabilidade da Junta do seu estado.
            </p>
            <p>
              Guarde o número do protocolo gerado após o envio; ele é necessário para
              acompanhar o andamento do registro.
            </p>
            <p>
              Após a aprovação, você receberá o <strong className="text-foreground">NIRE</strong> (Número de
              Identificação do Registro de Empresa), necessário para a próxima etapa:
              Atualização do CNPJ na Receita Federal.
            </p>
          </div>
        ),
      }}
    />
  )
}