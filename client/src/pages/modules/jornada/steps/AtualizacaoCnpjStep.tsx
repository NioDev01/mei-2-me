import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ExternalLink } from "lucide-react"

export function AtualizacaoCnpjStep() {

  return (
    <StepTemplate

      sections={{
        whatIs: {
          title: "O que é a atualização do CNPJ?",
          content: (
            <>
              <p>
                A <b>atualização do CNPJ</b> é o processo de ajustar os dados cadastrais da sua empresa na base da Receita Federal.
              </p>

              <div className="mt-3 text-muted-foreground space-y-2">
                <p>Isso pode incluir:</p>

                <ul className="list-disc pl-5">
                  <li>natureza jurídica</li>
                  <li>nome empresarial</li>
                  <li>capital social</li>
                  <li>quadro societário</li>
                </ul>
              </div>

              <div className="mt-4 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                Esses dados são refletidos no seu <b>Cartão CNPJ</b>, que comprova a situação da empresa.
              </div>
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              <p>
                Manter o CNPJ atualizado garante que sua empresa esteja <b>regular perante a Receita Federal</b>.
              </p>

              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Evita problemas legais</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>dados inconsistentes</li>
                    <li>bloqueios ou pendências</li>
                  </ul>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Permite operações</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>emissão de notas fiscais</li>
                    <li>abertura de conta bancária</li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },

        when: {
          title: "Quando isso é necessário?",
          content: (
            <>
              <p>
                <b>Nem sempre você precisa fazer essa etapa manualmente.</b>
              </p>

              <div className="mt-3 space-y-2 text-muted-foreground">
                <p>Na maioria dos casos:</p>

                <ul className="list-disc pl-5">
                  <li>
                    ✔ A atualização acontece automaticamente após o registro na Junta Comercial
                  </li>
                  <li>
                    ✔ Isso ocorre por integração entre os órgãos (REDESIM)
                  </li>
                </ul>

                <p className="mt-3">
                  Porém, você pode precisar agir manualmente se:
                </p>

                <ul className="list-disc pl-5">
                  <li>houver erro nos dados</li>
                  <li>o processo não tiver sido integrado corretamente</li>
                  <li>for solicitado ajuste pela Receita</li>
                </ul>
              </div>
            </>
          ),
        },

        requirements: {
          title: "O que você precisa verificar?",
          content: (
            <>
              <p>Antes de prosseguir, verifique:</p>

              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>se o registro na Junta Comercial foi aprovado</li>
                <li>se os dados do CNPJ já foram atualizados automaticamente</li>
                <li>se há divergências nas informações</li>
              </ul>

              <div className="mt-4 border rounded-md p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">📌 Dica prática</p>
                Consulte o seu CNPJ para confirmar se os dados estão corretos antes de tentar qualquer alteração.
              </div>
            </>
          ),
        },

        form: {
          title: "Consultar situação do CNPJ",
          content: (
            <div className="space-y-4">

              <Card>
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">
                    Verifique seus dados na Receita Federal
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Acesse o portal oficial para consultar a situação do seu CNPJ e confirmar se os dados já foram atualizados automaticamente.
                  </p>
                </CardContent>
              </Card>

              <Button
                className="w-full"
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp",
                    "_blank"
                  )
                }
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Consultar CNPJ na Receita Federal
              </Button>

            </div>
          ),
        },
      }}

      howTo={{
        title: "O que fazer na prática?",
        content: (
          <>
            <p>✔ Primeiro, consulte seu CNPJ no site da Receita Federal</p>

            <p className="mt-2">✔ Verifique se:</p>

            <ul className="list-disc pl-5 mt-2 text-muted-foreground">
              <li>a natureza jurídica foi atualizada</li>
              <li>o capital social está correto</li>
              <li>os dados do titular/sócios estão corretos</li>
            </ul>

            <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
              Se tudo estiver correto, você pode seguir para a próxima etapa.
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              Caso encontre divergências, será necessário realizar uma atualização cadastral via DBE (Documento Básico de Entrada).
            </div>
          </>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-2 text-muted-foreground">
            <p>✔ Nem sempre é necessário fazer essa etapa manualmente</p>
            <p>✔ Sempre valide os dados antes de tentar alterar</p>
            <p>✔ Divergências podem gerar problemas fiscais no futuro</p>

            <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
              Em caso de inconsistência, um contador pode ajudar na regularização junto à Receita Federal.
            </div>
          </div>
        ),
      }}
    />
  )
}