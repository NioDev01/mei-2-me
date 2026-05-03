import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"

export function ObrigacoesFiscaisStep() {

  return (
    <StepTemplate

      sections={{

        whatIs: {
          title: "O que são Obrigações Fiscais?",
          content: (
            <>
              <p>
                As <b>obrigações fiscais</b> são os compromissos que sua empresa deve cumprir com o governo após a formalização como Microempresa (ME).
              </p>

              <div className="mt-3 text-muted-foreground space-y-2">
                <p>Isso inclui:</p>

                <ul className="list-disc pl-5">
                  <li>pagamento de impostos</li>
                  <li>envio de declarações periódicas</li>
                  <li>controle financeiro e contábil</li>
                </ul>
              </div>

              <div className="mt-4 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                Diferente do MEI, essas obrigações são mais completas e exigem maior organização.
              </div>
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              <p>
                Cumprir corretamente suas obrigações fiscais mantém sua empresa <b>regular e em funcionamento</b>.
              </p>

              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Evita problemas</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>multas e penalidades</li>
                    <li>bloqueios no CNPJ</li>
                  </ul>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Mantém a operação</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>emissão de notas fiscais</li>
                    <li>credibilidade no mercado</li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },

        when: {
          title: "Quando isso começa?",
          content: (
            <>
              <p>
                As obrigações fiscais começam <b>logo após a formalização da empresa como ME</b>.
              </p>

              <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                Ou seja, assim que sua empresa estiver ativa, você já deve cumprir essas exigências regularmente.
              </div>
            </>
          ),
        },

        requirements: {
          title: "O que você precisa organizar?",
          content: (
            <>
              <p>Para manter sua empresa regular, é importante:</p>

              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>controlar receitas e despesas</li>
                <li>emitir notas fiscais corretamente</li>
                <li>acompanhar prazos de pagamento e envio de declarações</li>
              </ul>

              <div className="mt-4 border rounded-md p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  📌 Importante
                </p>
                Dependendo do regime tributário, suas obrigações podem variar.
              </div>
            </>
          ),
        },

        form: {
          title: "Principais obrigações após sair do MEI",
          content: (
            <div className="space-y-4">

              <Card>
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">📄 Emissão de notas fiscais</p>
                  <p className="text-sm text-muted-foreground">
                    Sua empresa deve emitir notas fiscais para vendas ou prestação de serviços, conforme sua atividade.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">💰 Pagamento de tributos</p>
                  <p className="text-sm text-muted-foreground">
                    Os impostos passam a ser calculados com base no regime tributário escolhido.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">📊 Declarações obrigatórias</p>
                  <p className="text-sm text-muted-foreground">
                    Sua empresa deverá enviar declarações periódicas para o governo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-yellow-500">
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">👨‍💼 Apoio contábil</p>
                  <p className="text-sm text-muted-foreground">
                    Após sair do MEI, sua empresa passa a ter obrigações fiscais e contábeis mais complexas.
                    Embora nem sempre seja uma exigência legal em todos os casos,
                    na prática é altamente recomendado — e geralmente necessário —
                    contar com um contador para manter sua empresa regular.
                  </p>
                </CardContent>
              </Card>

            </div>
          ),
        },
      }}

      howTo={{
        title: "Como se manter regular?",
        content: (
          <>
            <p>✔ Organize seu controle financeiro desde o início</p>

            <p className="mt-2">✔ Acompanhe prazos mensalmente</p>

            <p className="mt-2">✔ Utilize sistemas ou apoio contábil</p>

            <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
              Manter uma rotina organizada evita erros e garante a saúde da sua empresa.
            </div>
          </>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-2 text-muted-foreground">
            <p>✔ As obrigações são mais complexas do que no MEI</p>
            <p>✔ A organização financeira é essencial</p>
            <p>✔ O apoio de um contador pode evitar problemas futuros</p>

            <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
              Ignorar obrigações fiscais pode gerar multas e impedir o funcionamento da empresa.
            </div>
          </div>
        ),
      }}
    />
  )
}