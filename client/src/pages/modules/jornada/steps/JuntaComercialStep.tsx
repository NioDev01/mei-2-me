import { StepTemplate } from "./StepTemplate"

import { Button } from "@/components/ui/button"

export function JuntaComercialStep() {

  return (
    <StepTemplate

      sections={{
        
        whatIs: {
          title: "O que é a Junta Comercial?",
          content: (
            <>
              <p>
                A <b>Junta Comercial</b> é o órgão responsável por registrar oficialmente a sua empresa.
              </p>

              <div className="mt-3 border rounded-md p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  No estado de São Paulo:
                </p>
                <p>
                  O registro é feito na <b>JUCESP (Junta Comercial do Estado de São Paulo)</b>.
                </p>
              </div>

              <p className="mt-3">
                É nesse momento que sua empresa passa a existir formalmente como uma <b>Microempresa (ME)</b>.
              </p>
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              <p>
                Sem o registro na Junta Comercial, sua empresa <b>não pode operar legalmente</b>.
              </p>

              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Legalização</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>criação oficial da empresa</li>
                    <li>obtenção do NIRE</li>
                  </ul>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Operação</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>abrir conta bancária PJ</li>
                    <li>emitir notas fiscais</li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },

        when: {
          title: "Quando isso deve ser feito?",
          content: (
            <>
              <p>
                O registro na Junta Comercial ocorre <b>após a definição da empresa e geração do Ato Constitutivo</b>.
              </p>

              <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                Esse é um dos primeiros passos formais da criação da sua nova empresa.
              </div>
            </>
          ),
        },

        requirements: {
          title: "O que você precisa?",
          content: (
            <>
              <p>Antes de iniciar o processo, tenha em mãos:</p>

              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>Ato Constitutivo (gerado na etapa anterior)</li>
                <li>Documentos pessoais do titular e sócios</li>
                <li>Dados da empresa (nome, endereço, atividades)</li>
              </ul>

              <div className="mt-4 border rounded-md p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  📌 Importante
                </p>
                <p>
                  Muitas dessas informações já foram preenchidas anteriormente na plataforma e serão reutilizadas no processo.
                </p>
              </div>
            </>
          ),
        },
      }}

      howTo={{
        title: "O que você precisa fazer agora?",
        content: (
          <>
            <div className="space-y-4">

              <div className="border rounded-md p-3">
                <p className="font-medium text-foreground">
                  Passo a passo na JUCESP
                </p>

                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                  <li>Acesse o portal da JUCESP</li>
                  <li>Inicie o processo de abertura de empresa</li>
                  <li>Preencha os dados solicitados</li>
                  <li>Anexe o Ato Constitutivo</li>
                  <li>Realize o pagamento das taxas</li>
                  <li>Acompanhe a análise do processo</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-3 text-sm text-muted-foreground">
                ⚠ O processo pode levar alguns dias para ser analisado e aprovado.
              </div>

              <Button
                className="w-full"
                onClick={() =>
                  window.open(
                    "https://www.jucesp.sp.gov.br",
                    "_blank"
                  )
                }
              >
                Acessar site da JUCESP
              </Button>
            </div>
          </>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-2 text-muted-foreground">
            <p>✔ Revise todos os dados antes de enviar o processo</p>
            <p>✔ Certifique-se de que o Ato Constitutivo está correto</p>
            <p>✔ Guarde o número do protocolo para acompanhamento</p>

            <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
              Em caso de dúvida, um contador pode ajudar a evitar retrabalho ou indeferimento.
            </div>
          </div>
        ),
      }}
    />
  )
}