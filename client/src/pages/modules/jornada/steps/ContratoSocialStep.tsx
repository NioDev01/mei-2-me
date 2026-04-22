import { useState, useRef } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// ─── TIPOS ───────────────────────────────────────────────────────────────────

type Socio = {
  nome: string
  cpf: string
  participacao: string
  funcao: string
}

type ContratoData = {
  razaoSocial: string
  nomeFantasia: string
  descricaoAtividade: string
  codigoCnae: string
  capitalSocial: string
  socios: Socio[]
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
}

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO",
]

const ABA_LABELS = [
  "1.1 Informações Básicas",
  "1.2 Atividade Econômica",
  "1.3 Capital Social",
  "1.4 Endereço",
  "1.5 Revisão e Geração",
]

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────

export function ContratoSocialStep() {
  const [abaAtiva, setAbaAtiva] = useState(0)
  const [modoImportar, setModoImportar] = useState(false)
  const [arquivoImportado, setArquivoImportado] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState<ContratoData>({
    razaoSocial: "",
    nomeFantasia: "",
    descricaoAtividade: "",
    codigoCnae: "",
    capitalSocial: "",
    socios: [],
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  })

  function set<K extends keyof ContratoData>(key: K, value: ContratoData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  // ── CONTEÚDO POR ABA ────────────────────────────────────────────────────────



  // 1.1 – Informações Básicas
  const aba11 = (
    <div className="space-y-4">

      {/* Toggle Manual / Importar */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Crie ou faça upload do seu contrato social passo a passo com orientações especializadas.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            variant={modoImportar ? "outline" : "default"}
            onClick={() => setModoImportar(false)}
          >
            Manual
          </Button>
          <Button
            size="sm"
            variant={modoImportar ? "default" : "outline"}
            onClick={() => setModoImportar(true)}
          >
            Importar
          </Button>
        </div>
      </div>

      {modoImportar ? (
        /* ── MODO IMPORTAR ─────────────────────────────────────────────────── */
        <div className="space-y-4">
          <Card className="bg-muted/40">
            <CardContent className="p-4">
              <p className="font-medium text-sm">Importação de Contrato</p>
              <p className="text-xs text-muted-foreground mt-1">
                Faça upload do seu Contrato Social atual para extrair as informações automaticamente.
              </p>
            </CardContent>
          </Card>

          {/* Área de drag & drop */}
          <input
            ref={inputFileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null
              setArquivoImportado(file)
            }}
          />
          <div
            onClick={() => inputFileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              const file = e.dataTransfer.files?.[0] ?? null
              setArquivoImportado(file)
            }}
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-10 cursor-pointer transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/30 hover:border-primary hover:bg-muted/30"
            }`}
          >
            <span className="text-3xl">↑</span>
            <p className="font-medium text-sm">
              {arquivoImportado ? arquivoImportado.name : "Clique para fazer upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              {arquivoImportado ? "Clique para trocar o arquivo" : "Ou arraste e solte o arquivo aqui"}
            </p>
            {!arquivoImportado && (
              <p className="text-xs text-muted-foreground">Formatos de arquivos aceitos: PDF, DOC, DOCX</p>
            )}
          </div>

          {/* Aviso */}
          <Card className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="p-3 flex gap-2 items-start">
              <span className="text-yellow-500">⚠</span>
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Importante!</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-500">
                  Após a importação, revise todas as informações extraídas antes de prosseguir.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Campos de revisão pós-importação */}
          <Card className="bg-muted/40">
            <CardContent className="p-4">
              <p className="font-medium text-sm">Informações Necessárias</p>
              <p className="text-xs text-muted-foreground mt-1">
                Você precisará fornecer a razão social e nome fantasia da empresa.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Razão Social <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Exemplo: Silva & Associados Ltda"
                value={data.razaoSocial}
                onChange={(e) => set("razaoSocial", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Nome oficial da empresa para documentos legais.</p>
            </div>
            <div className="space-y-1">
              <Label>Nome Fantasia</Label>
              <Input
                placeholder="Exemplo: Silva Consultoria"
                value={data.nomeFantasia}
                onChange={(e) => set("nomeFantasia", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Nome comercial usado no dia a dia (opcional).</p>
            </div>
          </div>

          <div>
            <p className="font-medium text-sm mb-1">Documentos necessários:</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>RG e CPF de todos os sócios</li>
              <li>Comprovante de residência dos sócios</li>
              <li>Consulta de viabilidade de nome empresarial</li>
            </ul>
          </div>
        </div>
      ) : (
        /* ── MODO MANUAL ───────────────────────────────────────────────────── */
        <div className="space-y-4">
          <Card className="bg-muted/40">
            <CardContent className="p-4">
              <p className="font-medium text-sm">Informações Básicas</p>
              <p className="text-xs text-muted-foreground mt-1">
                Você precisará fornecer a razão social e o nome fantasia da empresa.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Razão Social <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Exemplo: Silva & Associados Ltda"
                value={data.razaoSocial}
                onChange={(e) => set("razaoSocial", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Nome oficial da empresa para documentos legais.</p>
            </div>
            <div className="space-y-1">
              <Label>Nome Fantasia</Label>
              <Input
                placeholder="Exemplo: Silva Consultoria"
                value={data.nomeFantasia}
                onChange={(e) => set("nomeFantasia", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Nome comercial usado no dia a dia (opcional).</p>
            </div>
          </div>

          <div>
            <p className="font-medium text-sm mb-1">Documentos necessários:</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>RG e CPF de todos os sócios</li>
              <li>Comprovante de residência dos sócios</li>
              <li>Consulta de viabilidade de nome empresarial</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )

  // 1.2 – Atividade Econômica
  const aba12 = (
    <div className="space-y-4">
      <Card className="bg-muted/40">
        <CardContent className="p-4">
          <p className="font-medium text-sm">Definição da Atividade</p>
          <p className="text-xs text-muted-foreground mt-1">
            Descreva detalhadamente as atividades que irá exercer.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <Label>Descrição da Atividade <span className="text-destructive">*</span></Label>
        <Textarea
          placeholder="Exemplo: Prestação de serviços de consultoria empresarial, desenvolvimento de sistemas, treinamentos"
          value={data.descricaoAtividade}
          onChange={(e) => set("descricaoAtividade", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-1">
        <Label>Código CNAE <span className="text-destructive">*</span></Label>
        <div className="flex gap-2">
          <Input
            placeholder="Exemplo: 0000-0/00"
            value={data.codigoCnae}
            onChange={(e) => set("codigoCnae", e.target.value)}
            className="max-w-[200px]"
          />
          <Button variant="secondary" onClick={() => window.open("https://cnae.ibge.gov.br/", "_blank")}>
            Consultar
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          <a href="https://cnae.ibge.gov.br/" target="_blank" rel="noreferrer" className="underline hover:text-foreground">
            Consulte o Código CNAE no site do IBGE
          </a>
        </p>
      </div>

      <Card className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
        <CardContent className="p-3 flex gap-2 items-start">
          <span className="text-yellow-500 text-base">⚠</span>
          <div>
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Atenção ao CNAE</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-500">
              O Código CNAE escolhido impacta diretamente no regime tributário e nas obrigações da empresa.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // 1.3 – Capital Social
  const aba13 = (
    <div className="space-y-4">
      <Card className="bg-muted/40">
        <CardContent className="p-4">
          <p className="font-medium text-sm">Capital Social e Sócios</p>
          <p className="text-xs text-muted-foreground mt-1">
            Defina o valor do capital social e a participação de cada sócio.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <Label>Valor do capital social <span className="text-destructive">*</span></Label>
        <Input
          placeholder="Exemplo: R$10000,00"
          value={data.capitalSocial}
          onChange={(e) => set("capitalSocial", e.target.value)}
          className="max-w-[280px]"
        />
        <p className="text-xs text-muted-foreground">Valor mínimo recomendado: R$1.000,00</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">Sócio da Empresa</p>
          <Button
            size="sm"
            onClick={() => set("socios", [...data.socios, { nome: "", cpf: "", participacao: "", funcao: "" }])}
          >
            + Adicionar Sócio
          </Button>
        </div>

        {data.socios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
            <span className="text-4xl">👤</span>
            <p className="text-sm font-medium">Nenhum sócio adicionado ainda</p>
            <p className="text-xs">Clique em "Adicionar Sócio" para começar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.socios.map((socio, i) => (
              <Card key={i}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm font-medium">Sócio {i + 1}</p>
                    <button
                      onClick={() => set("socios", data.socios.filter((_, idx) => idx !== i))}
                      className="text-destructive hover:text-destructive/70 transition-colors"
                      title="Remover sócio"
                    >
                      🗑
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Nome Completo</Label>
                      <Input
                        placeholder="Nome do sócio"
                        value={socio.nome}
                        onChange={(e) => {
                          const updated = [...data.socios]
                          updated[i].nome = e.target.value
                          set("socios", updated)
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">CPF</Label>
                      <Input
                        placeholder="Exemplo: 000.000.000-00"
                        value={socio.cpf}
                        onChange={(e) => {
                          const updated = [...data.socios]
                          updated[i].cpf = e.target.value
                          set("socios", updated)
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Participação (em porcentagem)</Label>
                      <Input
                        placeholder="Exemplo: 50%"
                        value={socio.participacao}
                        onChange={(e) => {
                          const updated = [...data.socios]
                          updated[i].participacao = e.target.value
                          set("socios", updated)
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Função</Label>
                      <Input
                        placeholder="Exemplo: Sócio, Administrador, Sócio-Administrador"
                        value={socio.funcao}
                        onChange={(e) => {
                          const updated = [...data.socios]
                          updated[i].funcao = e.target.value
                          set("socios", updated)
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // 1.4 – Endereço
  const aba14 = (
    <div className="space-y-4">
      <Card className="bg-muted/40">
        <CardContent className="p-4">
          <p className="font-medium text-sm">Endereço da Sede</p>
          <p className="text-xs text-muted-foreground mt-1">
            Informe o endereço completo onde a empresa irá funcionar.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <Label>CEP <span className="text-destructive">*</span></Label>
        <Input
          placeholder="Exemplo: 00000-000"
          value={data.cep}
          onChange={(e) => set("cep", e.target.value)}
          className="max-w-[180px]"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2 space-y-1">
          <Label>Logradouro <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Rua, Avenida, etc."
            value={data.logradouro}
            onChange={(e) => set("logradouro", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Número <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Exemplo: 000"
            value={data.numero}
            onChange={(e) => set("numero", e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label>Complemento</Label>
          <Input
            placeholder="Sala, andar, etc."
            value={data.complemento}
            onChange={(e) => set("complemento", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Bairro <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Nome do bairro"
            value={data.bairro}
            onChange={(e) => set("bairro", e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label>Cidade <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Nome da cidade"
            value={data.cidade}
            onChange={(e) => set("cidade", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Estado <span className="text-destructive">*</span></Label>
          <select
            value={data.estado}
            onChange={(e) => set("estado", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione o estado</option>
            {ESTADOS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="font-medium text-sm mb-1">Documentos necessários:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Comprovante de endereço de sede</li>
          <li>Contrato de locação ou escritura (se próprio)</li>
          <li>Consulta de viabilidade de localização</li>
          <li>Autorização do proprietário (se locado)</li>
        </ul>
      </div>
    </div>
  )

  // 1.5 – Revisão e Geração
  const totalParticipacao = data.socios.reduce(
    (acc, s) => acc + (parseFloat(s.participacao) || 0),
    0
  )

  const aba15 = (
    <div className="space-y-4">
      <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-3 flex gap-2 items-start">
          <span className="text-green-500">✓</span>
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">Revisão Final</p>
            <p className="text-xs text-green-600 dark:text-green-500">
              Revise todas as informações antes de gerar o contrato social.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="font-medium text-sm">Informações da empresa</p>
          <div className="text-sm space-y-1 text-muted-foreground">
            {(
              [
                ["Razão social", data.razaoSocial],
                ["Nome fantasia", data.nomeFantasia],
                ["CNAE", data.codigoCnae],
                ["Capital social", data.capitalSocial],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-2">
                <span>{label}:</span>
                <span className="text-foreground font-medium text-right">{value || "—"}</span>
              </div>
            ))}
          </div>

          <p className="font-medium text-sm pt-1">Endereço</p>
          <div className="text-sm text-muted-foreground">
            {data.logradouro ? (
              <>
                <p>
                  {data.logradouro}
                  {data.numero ? `, ${data.numero}` : ""}
                  {data.complemento ? `, ${data.complemento}` : ""}
                </p>
                <p>
                  {data.bairro}
                  {data.cidade ? ` - ${data.cidade}` : ""}
                  {data.estado ? `/${data.estado}` : ""}
                </p>
                {data.cep && <p>CEP: {data.cep}</p>}
              </>
            ) : (
              <p>—</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-sm">Sócios ({data.socios.length})</p>
          {data.socios.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum sócio adicionado.</p>
          ) : (
            <div className="space-y-1">
              {data.socios.map((s, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{s.nome || `Sócio ${i + 1}`}</p>
                    <p className="text-xs text-muted-foreground">Sócio</p>
                  </div>
                  <span className="font-medium">{s.participacao ? `${s.participacao}%` : "—"}</span>
                </div>
              ))}
              {totalParticipacao !== 100 && data.socios.length > 0 && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  ⚠ Total: {totalParticipacao}% (deve ser 100%)
                </p>
              )}
            </div>
          )}

          <p className="font-medium text-sm pt-2">Ações Disponíveis</p>
          <div className="space-y-2">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Pré-visualizar contrato
            </Button>
            <Button variant="destructive" className="w-full" onClick={() => alert("Gerando PDF...")}>
              Fazer download em PDF
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => alert("Gerando WORD...")}>
              Fazer download em WORD
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const abas = [aba11, aba12, aba13, aba14, aba15]

  // ── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="w-full space-y-6 pt-3">

      {/* HEADER — abas de navegação */}
      <Card className="border-l-4 border-primary">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {ABA_LABELS.map((label, i) => (
              <button
                key={i}
                onClick={() => setAbaAtiva(i)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  abaAtiva === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Etapa 1.{abaAtiva + 1} de 1.5</p>
        </CardContent>
      </Card>

      {/* CONTEÚDO DA ABA ATIVA */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="text-base">
            Etapa 1.{abaAtiva + 1} Geração Guiada do Contrato Social —{" "}
            {ABA_LABELS[abaAtiva].replace(/^\d+\.\d+\s/, "")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {abas[abaAtiva]}
        </CardContent>
      </Card>

      {/* NAVEGAÇÃO */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={abaAtiva === 0}
          onClick={() => setAbaAtiva((p) => Math.max(0, p - 1))}
        >
          Etapa Anterior
        </Button>
        {abaAtiva < 4 && (
          <Button onClick={() => setAbaAtiva((p) => Math.min(4, p + 1))}>
            Próxima etapa
          </Button>
        )}
      </div>

      {/* RODAPÉ INFORMATIVO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">O que é o Contrato Social?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            O Contrato Social é o documento que formaliza a criação da empresa, define
            as regras de funcionamento, a participação de cada sócio e as atividades
            que serão exercidas. É obrigatório para o registro na Junta Comercial.
          </p>
          <p>
            Após gerar o documento, ele deverá ser registrado na Junta Comercial do
            seu estado (próxima etapa da jornada).
          </p>
        </CardContent>
      </Card>

    </div>
  )
}