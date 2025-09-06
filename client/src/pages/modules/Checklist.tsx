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
    description: 'É o procedimento pelo qual o Microempreendedor Individual (MEI) informa à Receita Federal que não se enquadra mais nas condições do Sistema de Recolhimento em Valores Fixos Mensais dos Tributos abrangidos pelo Simples Nacional (SIMEI). Isso pode ocorrer por opção do contribuinte ou por alguma situação que o impeça de continuar como MEI.',
    purpose: 'Formalizar a saída do regime MEI, seja por vontade própria ou por ter incorrido em alguma das vedações legais, como excesso de faturamento, contratação de mais de um funcionário, exercício de atividade não permitida ou participação em outra empresa. O desenquadramento garante que a empresa passe a recolher os tributos de acordo com as regras do Simples Nacional como microempresa (ME) ou outro regime tributário.',
    howToObtain: 'A comunicação é feita online, através do Portal do Simples Nacional. O usuário precisa de um código de acesso ou pode acessar via portal e-CAC. No sistema, deve-se selecionar a opção de "Comunicação de Desenquadramento do SIMEI", escolher o motivo e informar a data do ocorrido.',
    hasTemplate: false
  },
  {
    id: '2',
    name: 'Formulário Capa Marrom',
    description: 'O Formulário Capa Marrom é um formulário padrão da Junta Comercial do Estado de São Paulo (JUCESP) utilizado para diversos processos de registro e alteração de empresas, como constituição, alteração de dados cadastrais, e outros processos específicos. Ele contém campos para informações cadastrais da empresa, como nome empresarial, endereço, atividades econômicas, valor do capital e dados dos sócios.',
    purpose: 'O propósito principal do Formulário Capa Marrom é padronizar a coleta de informações para os processos de registro e alteração de empresas na JUCESP, garantindo que todos os dados necessários sejam fornecidos de forma organizada e completa para a análise e deferimento dos pedidos.',
    howToObtain: 'O Formulário Capa Marrom pode ser obtido no site da JUCESP, geralmente na seção de formulários ou downloads. Em alguns casos, ele pode ser gerado através do sistema "Cadastro Web" (Via Rápida Empresa - VRE) da JUCESP, dependendo do tipo de processo a ser realizado.',
    hasTemplate: true,
    templateUrl: '/templates/Formulario-Capa-Marron.pdf'
  },
  {
    id: '3',
    name: 'Requerimento do Empresário',
    description: 'O Requerimento do Empresário é um documento formal utilizado para o registro de empresas individuais no Brasil. Ele substitui o Contrato Social para esse tipo de natureza jurídica e contém informações essenciais sobre o empresário individual e a empresa, como qualificação completa do empresário, nome e endereço da firma, capital social, e as atividades econômicas a serem desenvolvidas.',
    purpose: 'O principal propósito do Requerimento do Empresário é formalizar a criação de uma empresa individual e solicitar o seu registro junto aos órgãos competentes, como a Junta Comercial. É um documento obrigatório para legalizar a atuação do empresário individual e permitir a obtenção do CNPJ junto à Receita Federal.',
    howToObtain: 'O Requerimento do Empresário é emitido pela Junta Comercial do estado onde a empresa será registrada. Geralmente, o preenchimento e a emissão podem ser feitos online, através dos sistemas integrados das Juntas Comerciais (como o Via Rápida Empresa - VRE em São Paulo) ou módulos integradores, que visam simplificar o processo e eliminar a digitação manual. Após o preenchimento, o documento deve ser protocolado na Junta Comercial, juntamente com a documentação pessoal do titular e o comprovante de pagamento das taxas.',
    hasTemplate: true,
    templateUrl: '/templates/Requerimento-de-Empresario.pdf'
  },
  {
    id: '4',
    name: 'Comprovante de pagamento da DARE',
    description: 'O Comprovante de Pagamento da DARE (Documento de Arrecadação de Receitas Estaduais) é o recibo que atesta o recolhimento de tributos e demais receitas públicas estaduais. A DARE é uma guia utilizada para o pagamento de impostos como ICMS, ITCMD, taxas, dívida ativa, entre outros, variando de estado para estado.',
    purpose: 'O propósito do comprovante de pagamento da DARE é servir como prova de que o contribuinte efetuou o recolhimento do tributo ou receita estadual devido. Ele é essencial para fins de comprovação fiscal, contábil e para a regularização de pendências junto aos órgãos fazendários estaduais.',
    howToObtain: 'Após o pagamento da DARE em bancos (físicos ou online), caixas eletrônicos ou correspondentes bancários, o comprovante é geralmente disponibilizado de forma automática. Em muitos casos, o próprio banco ou sistema de pagamento gera o comprovante para impressão ou download. Além disso, em alguns estados, é possível consultar e emitir a segunda via do comprovante de arrecadação diretamente nos portais da Secretaria da Fazenda (SEFAZ) ou em sistemas específicos de consulta de pagamentos, utilizando o número da DARE ou outros dados do contribuinte.',
    hasTemplate: false
  },
  {
    id: '5',
    name: 'Contrato Social',
    description: 'O Contrato Social é o documento jurídico que formaliza a constituição de uma sociedade empresária, exceto para o Microempreendedor Individual (MEI) e o Empresário Individual, que utilizam o Requerimento do Empresário. Ele funciona como a "certidão de nascimento" da empresa, estabelecendo as regras de funcionamento, os direitos e deveres dos sócios, a divisão de cotas, o capital social, o objeto social (atividades econômicas), a forma de administração, entre outras disposições.',
    purpose: 'O propósito principal do Contrato Social é legalizar a existência da empresa perante os órgãos públicos (Junta Comercial, Receita Federal, etc.) e definir a estrutura jurídica e operacional da sociedade. Ele serve como um acordo entre os sócios, prevenindo conflitos e garantindo a segurança jurídica das operações da empresa. É fundamental para a obtenção do CNPJ e para o início regular das atividades empresariais.',
    howToObtain: 'A elaboração do Contrato Social geralmente envolve a assessoria de um contador ou advogado, pois é um documento complexo que deve estar em conformidade com a legislação vigente (Código Civil e outras leis específicas). Após a elaboração e assinatura pelos sócios, o Contrato Social deve ser registrado na Junta Comercial do estado onde a empresa terá sua sede. O processo de registro pode variar ligeiramente entre as Juntas Comerciais, mas geralmente envolve a apresentação do documento original e cópias dos documentos pessoais dos sócios, além do pagamento de taxas. Em muitos estados, o processo pode ser iniciado online através de sistemas integrados.',
    hasTemplate: false
  },
  {
    id: '6',
    name: 'Cópia dos Documentos dos Sócios',
    description: 'A Cópia dos Documentos dos Sócios refere-se aos documentos pessoais dos indivíduos que compõem o quadro societário de uma empresa. Geralmente, incluem RG (Registro Geral), CPF (Cadastro de Pessoa Física), comprovante de endereço residencial, título de eleitor e, em alguns casos, declaração de imposto de renda. Para a abertura de empresas, é comum que sejam solicitadas cópias autenticadas ou simples, dependendo da exigência do órgão registrador.',
    purpose: 'O propósito principal da Cópia dos Documentos dos Sócios é identificar e qualificar legalmente os indivíduos responsáveis pela empresa. Esses documentos são essenciais para o registro da pessoa jurídica junto à Junta Comercial e à Receita Federal, garantindo a conformidade com a legislação e a validade dos atos constitutivos da empresa. Eles permitem a verificação da identidade, capacidade civil e domicílio dos sócios.',
    howToObtain: 'Os próprios sócios são os responsáveis por fornecer as cópias de seus documentos pessoais. Para a autenticação, caso seja exigida, as cópias devem ser levadas a um cartório. É importante que os documentos estejam atualizados e em bom estado de conservação para evitar problemas no processo de registro da empresa.',
    hasTemplate: false
  },
  {
    id: '7',
    name: 'DARF de Taxa de Fiscalização',
    description: 'O DARF (Documento de Arrecadação de Receitas Federais) é uma guia utilizada para o recolhimento de tributos federais, que incluem impostos, contribuições e taxas. Quando se refere a uma "Taxa de Fiscalização", significa que o DARF está sendo utilizado para pagar uma taxa específica cobrada por um órgão federal para fiscalizar determinadas atividades ou setores. O código da receita no DARF identifica qual taxa ou tributo está sendo pago.',
    purpose: 'O propósito do DARF de Taxa de Fiscalização é permitir que o contribuinte efetue o pagamento de valores devidos a órgãos fiscalizadores federais. Esse pagamento é fundamental para a regularidade de empresas e profissionais que atuam em setores regulados, garantindo que estejam em conformidade com as exigências legais e passíveis de fiscalização.',
    howToObtain: 'A emissão do DARF é feita principalmente através de sistemas da Receita Federal do Brasil. O mais comum é o Sicalc (Sistema de Cálculo de Acréscimos Legais) ou o Sicalcweb, disponíveis no site da Receita Federal. Nesses sistemas, o contribuinte informa seus dados (CPF/CNPJ), o código da receita referente à taxa de fiscalização específica, o período de apuração e o valor. Após o preenchimento, o DARF é gerado e pode ser impresso para pagamento em bancos, caixas eletrônicos ou canais de pagamento online.',
    hasTemplate: false
  },
  {
    id: '8',
    name: 'Procuração (se aplicável)',
    description: 'A procuração é um instrumento legal pelo qual uma pessoa (outorgante) concede a outra (outorgado) poderes para agir em seu nome, em determinadas situações. Ela pode ser utilizada para diversos fins, como representação em processos judiciais, administração de bens, realização de negócios, entre outros. Existem diferentes tipos de procuração, como a pública (feita em cartório) e a particular (feita pelo próprio outorgante), e os poderes concedidos podem ser gerais ou específicos.',
    purpose: 'O propósito da procuração é permitir que uma pessoa seja representada por outra, facilitando a realização de atos e negócios jurídicos quando o outorgante não pode ou não deseja agir pessoalmente. Ela confere segurança jurídica às ações do outorgado, pois comprova que ele tem autorização legal para atuar em nome do outorgante.',
    howToObtain: 'A forma de obter uma procuração varia conforme o tipo e a finalidade. Uma procuração particular pode ser redigida pelo próprio outorgante, contendo a qualificação completa de ambas as partes, a descrição dos poderes concedidos, a data e a assinatura do outorgante. Para ter validade legal em algumas situações, pode ser necessário o reconhecimento de firma em cartório. Já a procuração pública é lavrada em um Tabelionato de Notas, exigindo a presença do outorgante (e, em alguns casos, do outorgado) com seus documentos de identificação. O tabelião irá redigir o documento e registrá-lo em livro próprio, conferindo-lhe fé pública.',
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
                    onClick={() => handleDownload(
                      selectedDocument.templateUrl!, 
                      `${selectedDocument.name.toLowerCase().replace(/\s+/g, '-')}.${selectedDocument.templateUrl?.split('.').pop()}`
                    )}
                  >
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
