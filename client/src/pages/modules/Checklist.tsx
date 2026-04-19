import { useEffect, useState } from "react";
import { Circle, CheckCircle, Info, Download, FileText } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { Document } from "@/interfaces/document";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@/hooks/use-disclosure";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { ChecklistFormData } from "@/types/checklist-form";
import { checklistSchema } from "@/types/checklist-form";

const documentIdToFieldName: Record<
  string,
  keyof Omit<ChecklistFormData, "id_mei">
> = {
  "1": "possui_rg",
  "2": "possui_cpf",
  "3": "possui_comprovante_residencia",
  "4": "possui_cartao_cnpj",
  "5": "comunicacao_desenquadramento_simei",
  "6": "formulario_capa_marrom",
  "7": "requerimento_desenquadramento",
  "8": "comprovante_pagamento_dare",
  "9": "contrato_social",
  "10": "possui_ccmei",
  "11": "possui_cadesp",
  "12": "comprovante_situacao_simples_nacional",
};

const documents: Document[] = [
  {
    id: "1",
    name: "RG",
    description:
      "Documento de identificação emitido pelo Governo do Estado de São Paulo (SSP).",
    purpose: "Identificação pessoal do cidadão.",
    howToObtain: "Governo do Estado de São Paulo (SSP)",
    hasTemplate: false,
  },
  {
    id: "2",
    name: "CPF",
    description: "Cadastro de Pessoa Física, emitido pela Receita Federal.",
    purpose: "Identificação do contribuinte perante a Receita Federal.",
    howToObtain: "Receita Federal",
    hasTemplate: false,
  },
  {
    id: "3",
    name: "Comprovante de Residência",
    description: "Documento que comprova o endereço residencial do usuário.",
    purpose: "Comprovação de endereço para diversos fins cadastrais.",
    howToObtain: "Variados",
    hasTemplate: false,
  },
  {
    id: "4",
    name: "Cartão CNPJ",
    description:
      "Comprovante de Inscrição e de Situação Cadastral de Pessoa Jurídica.",
    purpose: "Identificação da empresa perante a Receita Federal.",
    howToObtain: "Receita Federal",
    hasTemplate: false,
  },
  {
    id: "5",
    name: "Comunicação de Desenquadramento do SIMEI",
    description:
      "É o procedimento pelo qual o Microempreendedor Individual (MEI) informa à Receita Federal que não se enquadra mais nas condições do Sistema de Recolhimento em Valores Fixos Mensais dos Tributos abrangidos pelo Simples Nacional (SIMEI).",
    purpose: "Formalizar a saída do regime MEI.",
    howToObtain: "Simples Nacional",
    hasTemplate: false,
  },
  {
    id: "6",
    name: "Formulário Capa Marrom",
    description:
      "Formulário Padrão da JUCESP para registro e alteração de empresas.",
    purpose: "Padronizar a coleta de informações para processos na JUCESP.",
    howToObtain: "JUCESP - Preenchimento MEI",
    hasTemplate: true,
    templateUrl: "#",
  },
  {
    id: "7",
    name: "Requerimento de Desenquadramento do Empresário",
    description:
      "Documento para solicitar o desenquadramento do MEI na JUCESP.",
    purpose: "Formalizar o desenquadramento do MEI.",
    howToObtain: "JUCESP - Preenchimento MEI",
    hasTemplate: true,
    templateUrl: "#",
  },
  {
    id: "8",
    name: "Comprovante de pagamento da DARE",
    description:
      "Recibo que atesta o recolhimento de tributos e receitas estaduais.",
    purpose: "Comprovar o pagamento de tributos estaduais.",
    howToObtain: "JUCESP - Emissão na JUCESP",
    hasTemplate: false,
  },
  {
    id: "9",
    name: "Contrato Social (em caso de mudança na natureza jurídica)",
    description:
      "Documento que formaliza a alteração da natureza jurídica da empresa.",
    purpose: "Alterar a estrutura jurídica da empresa.",
    howToObtain: "MEI redige modelo próprio ou usa da JUCESP",
    hasTemplate: false,
  },
  {
    id: "10",
    name: "CCMEI",
    description: "Certificado da Condição de Microempreendedor Individual.",
    purpose: "Comprovar a condição do MEI.",
    howToObtain: "gov.br",
    hasTemplate: false,
  },
  {
    id: "11",
    name: "CADESP",
    description: "Cadastro de Contribuintes do ICMS do Estado de São Paulo.",
    purpose: "Registro da empresa como contribuinte do ICMS.",
    howToObtain: "Secretaria da Fazenda",
    hasTemplate: false,
  },
  {
    id: "12",
    name: "Comprovante da situação do MEI no Simples Nacional",
    description:
      "Documento que comprova a situação do MEI no Simples Nacional.",
    purpose: "Verificar a regularidade do MEI no Simples Nacional.",
    howToObtain: "Simples Nacional",
    hasTemplate: true,
    templateUrl: "#",
  },
];

export function Checklist() {
  const { isOpen, open, close } = useDisclosure();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  const form = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      possui_rg: false,
      possui_cpf: false,
      possui_comprovante_residencia: false,
      possui_cartao_cnpj: false,
      comunicacao_desenquadramento_simei: false,
      formulario_capa_marrom: false,
      requerimento_desenquadramento: false,
      comprovante_pagamento_dare: false,
      contrato_social: false,
      possui_ccmei: false,
      possui_cadesp: false,
      comprovante_situacao_simples_nacional: false,
    },
  });

  const { handleSubmit, watch, setValue } = form;

  const watchedValues = watch();

  const totalDocs = documents.length;
  const checkedDocs = Object.entries(watchedValues).filter(
    ([key, value]) => key !== "id_mei" && value === true,
  ).length;
  const progress = (checkedDocs / totalDocs) * 100;

  useEffect(() => {
    api
      .get(`checklist-documentos`)
      .then((res) => {
        const data = res.data;

        if (data) {
          (Object.keys(data) as (keyof ChecklistFormData)[]).forEach((key) => {
            if (key) {
              setValue(key, data[key] as boolean);
            }
          });
        }
      })
      .catch((err) => {
        console.error(`Ocorreu um erro ao carregar o checklist: ${err}`);
        toast.error("Erro ao carregar o checklist.");
      });
  }, [setValue]);

  const onSubmit = async (values: ChecklistFormData) => {
    try {
      await api.post("checklist-documentos", values);
      toast("Checklist salvo com sucesso!");
    } catch (err) {
      console.error(`Erro ao salvar o checklist: ${err}`);
      toast("Ocorreu um erro ao tentar salvar o checklist");
    }
  };

  const handleDownload = (templateUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = templateUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDocument = (docId: string) => {
    const fieldName = documentIdToFieldName[docId];

    if (fieldName) {
      const currentValue = watchedValues[fieldName];
      setValue(fieldName, !currentValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className='w-full space-y-8 pt-3'>
      {/* Header */}
      <div>
        <h2 className='text-1xl text-muted-foreground'>
          Veja os documentos necessários e marque os que você já possui.
        </h2>
      </div>

      {/* Barra de Progresso */}
      <div className='sticky top-0 z-10 bg-background py-4'>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>Progresso</span>
            <span className='text-sm'>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className='h-4' />
          <p className='text-xs text-muted-foreground'>
            {checkedDocs} de {documents.length} documentos
          </p>
        </div>
      </div>

      {/* Lista de Documentos */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {documents.map((doc) => {
            const fieldName = documentIdToFieldName[doc.id];
            const isChecked = fieldName ? watchedValues[fieldName] : false;

            return (
              <Card
                key={doc.id}
                className={`transition-all border ${
                  isChecked ? "border-blue-500" : ""
                }`}
              >
                <CardHeader className='flex flex-row items-center justify-between'>
                  <div>
                    <CardTitle className='text-base'>{doc.name}</CardTitle>
                    <CardDescription className='line-clamp-2'>
                      {doc.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => toggleDocument(doc.id)}
                  >
                    {isChecked ? (
                      <CheckCircle className='text-blue-500 size-6' />
                    ) : (
                      <Circle className='text-muted-foreground size-6' />
                    )}
                  </Button>
                </CardHeader>

                <CardContent className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='secondary'
                    onClick={() => {
                      setSelectedDocument(doc);
                      open();
                    }}
                  >
                    <Info className='h-4 w-4 mr-1' />
                    Info
                  </Button>
                  {doc.hasTemplate && (
                    <Button
                      size='sm'
                      onClick={() =>
                        handleDownload(
                          doc.templateUrl!,
                          `${doc.name
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-",
                            )}.${doc.templateUrl?.split(".").pop()}`,
                        )
                      }
                    >
                      <Download className='h-4 w-4 mr-1' />
                      Modelo
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </form>

      {/* Dialog para Info */}
      <Dialog open={isOpen} onOpenChange={(o) => (o ? open() : close())}>
        <DialogContent className='w-full !max-w-3xl max-h-[80vh] overflow-y-auto'>
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle className='flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-blue-500' />
                  {selectedDocument.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedDocument.description}
                </DialogDescription>
              </DialogHeader>

              <div className='space-y-4 text-sm'>
                <div>
                  <h3 className='font-medium'>Propósito</h3>
                  <p className='text-muted-foreground'>
                    {selectedDocument.purpose}
                  </p>
                </div>
                <div>
                  <h3 className='font-medium'>Como obter</h3>
                  <p className='text-muted-foreground'>
                    {selectedDocument.howToObtain}
                  </p>
                </div>
              </div>

              <div className='flex gap-2 pt-4'>
                {selectedDocument.hasTemplate && (
                  <Button
                    onClick={() =>
                      handleDownload(
                        selectedDocument.templateUrl!,
                        `${selectedDocument.name.toLowerCase().replace(/\s+/g, "-")}.${selectedDocument.templateUrl?.split(".").pop()}`,
                      )
                    }
                  >
                    <Download className='h-4 w-4 mr-1' />
                    Modelo
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
