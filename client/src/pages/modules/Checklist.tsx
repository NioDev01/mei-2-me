
import { useState } from "react"
import { Circle, CheckCircle, Info, Download, FileText} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface Document {
  id: string
  name: string
  description: string
  purpose: string
  howToObtain: string
  hasTemplate: boolean
  templateUrl?: string
}

const documents: Document[] = [
  {
    id: '1',
    name: 'RG',
    description: 'Documento de identificação emitido pelo Governo do Estado de São Paulo SSP.',
    purpose: 'Identificação pessoal do cidadão.',
    howToObtain: 'Governo do Estado de São Paulo SSP',
    hasTemplate: false
  },
  {
    id: '2',
    name: 'CPF',
    description: 'Cadastro de Pessoa Física, emitido pela Receita Federal.',
    purpose: 'Identificação do contribuinte perante a Receita Federal.',
    howToObtain: 'Receita Federal',
    hasTemplate: false
  },
  {
    id: '3',
    name: 'Comprovante de Residência',
    description: 'Documento que comprova o endereço residencial.',
    purpose: 'Comprovação de endereço para diversos fins cadastrais.',
    howToObtain: 'Variados',
    hasTemplate: false
  },
  {
    id: '4',
    name: 'Cartão CNPJ',
    description: 'Comprovante de Inscrição e de Situação Cadastral de Pessoa Jurídica.',
    purpose: 'Identificação da empresa perante a Receita Federal.',
    howToObtain: 'Receita Federal',
    hasTemplate: false
  },
  {
    id: '5',
    name: 'Comunicação de Desenquadramento do SIMEI',
    description: "É o procedimento pelo qual o Microempreendedor Individual (MEI) informa à Receita Federal que não se enquadra mais nas condições do Sistema de Recolhimento em Valores Fixos Mensais dos Tributos abrangidos pelo Simples Nacional (SIMEI).",
    purpose: 'Formalizar a saída do regime MEI.',
    howToObtain: 'Simples Nacional',
    hasTemplate: false
  },
  {
    id: '6',
    name: 'Formulário Capa Marrom',
    description: "Formulário padrão da JUCESP para registro e alteração de empresas.",
    purpose: 'Padronizar a coleta de informações para processos na JUCESP.',
    howToObtain: 'JUCESP - Preenchimento MEI',
    hasTemplate: true,
    templateUrl: '/templates/formulario-capa-marrom.pdf'
  },
  {
    id: '7',
    name: 'Requerimento de Desenquadramento/ do Empresário',
    description: 'Documento para solicitar o desenquadramento do MEI na JUCESP.',
    purpose: 'Formalizar o desenquadramento do MEI.',
    howToObtain: 'JUCESP - Preenchimento MEI',
    hasTemplate: true,
    templateUrl: '/templates/requerimento-desenquadramento.docx'
  },
  {
    id: '8',
    name: 'Comprovante de pagamento da DARE',
    description: "Recibo que atesta o recolhimento de tributos e receitas estaduais.",
    purpose: 'Comprovar o pagamento de tributos estaduais.',
    howToObtain: 'JUCESP - Emissão na JUCESP',
    hasTemplate: false
  },
  {
    id: '9',
    name: 'Contrato Social (em caso de mudança na natureza jurídica)',
    description: "Documento que formaliza a alteração da natureza jurídica da empresa.",
    purpose: 'Alterar a estrutura jurídica da empresa.',
    howToObtain: 'MEI redige modelo próprio ou usa da JUCESP',
    hasTemplate: false
  },
  {
    id: '10',
    name: 'CCMEI',
    description: "Certificado da Condição de Microempreendedor Individual.",
    purpose: 'Comprovar a condição de MEI.',
    howToObtain: 'GOV.BR',
    hasTemplate: false
  },
  {
    id: '11',
    name: 'Cadesp',
    description: "Cadastro de Contribuintes do ICMS do Estado de São Paulo.",
    purpose: 'Registro da empresa como contribuinte do ICMS.',
    howToObtain: 'Secretaria da Fazenda',
    hasTemplate: false
  },
  {
    id: '12',
    name: 'Comprovante da situação do MEI no Simples Nacional',
    description: "Documento que comprova a situação do MEI no Simples Nacional.",
    purpose: 'Verificar a regularidade do MEI no Simples Nacional.',
    howToObtain: 'Simples Nacional',
    hasTemplate: false
  }
]

export function Checklist() {
  const [checkedDocuments, setCheckedDocuments] = useState<Set<string>>(new Set())
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const toggleDocument = (id: string) => {
    const newChecked = new Set(checkedDocuments)
    if (newChecked.has(id)) newChecked.delete(id)
    else newChecked.add(id)
    setCheckedDocuments(newChecked)
  }
    const handleDownload = (templateUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = templateUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const progress = (checkedDocuments.size / documents.length) * 100

  return (
    <div className="w-full space-y-8 pt-3">
      {/* Header */}
      <div>
        {/* <h1 className="text-3xl font-bold">Checklist de Documentos</h1> */}
        <h2 className="text-1xl text-muted-foreground">
          Veja os documentos necessários e marque os que você já possui.
        </h2>
      </div>

      {/* Barra de Progresso */}
      <div className="sticky top-0 z-10 bg-background py-4">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-4"/>
            <p className="text-xs text-muted-foreground">
              {checkedDocuments.size} de {documents.length} documentos
            </p>
        </div>
      </div>


      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className={`transition-all border ${
              checkedDocuments.has(doc.id) ? "border-blue-500" : ""
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">{doc.name}</CardTitle>
                <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleDocument(doc.id)}
              >
                { checkedDocuments.has(doc.id) ? <CheckCircle className="text-blue-500 size-6"/> : <Circle className="text-muted-foreground size-6"/> }
              </Button>
            </CardHeader>

            <CardContent className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setSelectedDocument(doc)}
              >
                <Info className="h-4 w-4 mr-1" />
                Info
              </Button>
              {doc.hasTemplate && (
                <Button 
                  size="sm" 
                  onClick={() => handleDownload(
                    doc.templateUrl!, 
                    `${doc.name.toLowerCase().replace(/\s+/g, '-')}.${doc.templateUrl?.split('.').pop()}`
                  )}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Modelo
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para Info */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="w-full !max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  {selectedDocument.name}
                </DialogTitle>
                <DialogDescription>{selectedDocument.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Propósito</h3>
                  <p className="text-muted-foreground">{selectedDocument.purpose}</p>
                </div>
                <div>
                  <h3 className="font-medium">Como obter</h3>
                  <p className="text-muted-foreground">{selectedDocument.howToObtain}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                {selectedDocument.hasTemplate && (
                  <Button 
                    size="sm" 
                    onClick={() => handleDownload(
                      selectedDocument.templateUrl!,
                      `${selectedDocument.name.toLowerCase().replace(/\s+/g, '-')}.${selectedDocument.templateUrl?.split('.').pop()}`
                    )}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Modelo
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

