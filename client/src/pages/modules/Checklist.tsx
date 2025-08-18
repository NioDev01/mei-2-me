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
    name: 'Comunicação de Desenquadramento do SIMEI',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: false
  },
  {
    id: '2',
    name: 'Formulário Capa Marrom',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: true,
    templateUrl: '#'
  },
  {
    id: '3',
    name: 'Requerimento do Empresário',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: true,
    templateUrl: '#'
  },
  {
    id: '4',
    name: 'Comprovante de pagamento da DARE',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: false
  },
  {
    id: '5',
    name: 'Contrato Social',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: false
  },
  {
    id: '6',
    name: 'Cópia dos Documentos dos Sócios',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: false
  },
  {
    id: '7',
    name: 'DARF de Taxa de Fiscalização',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: false
  },
  {
    id: '8',
    name: 'Procuração (se aplicável)',
    description: 'Descrição do Documento',
    purpose: 'Propósito do Documento',
    howToObtain: 'Como obter o Documento',
    hasTemplate: true,
    templateUrl: '#'
  },
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
                <Button size="sm" onClick={() => console.log("Download:", doc.templateUrl)}>
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
                  <Button onClick={() => console.log("Download:", selectedDocument.templateUrl)}>
                    <Download className="h-4 w-4 mr-1" />
                    Baixar Modelo
                  </Button>
                )}
                <Button variant="secondary" onClick={() => setSelectedDocument(null)}>
                  Fechar
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
