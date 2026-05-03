import { StepTemplate } from "./StepTemplate"

import { Card, CardContent } from "@/components/ui/card"

export function LicenciamentoStep() {

  return (
    <StepTemplate

      sections={{
        whatIs: {
          title: "O que é o licenciamento?",
          content: (
            <>
              <p>
                O <b>licenciamento</b> é o conjunto de autorizações necessárias para que sua empresa possa operar legalmente.
              </p>

              <div className="mt-3 text-muted-foreground space-y-2">
                <p>Dependendo do seu negócio, isso pode incluir:</p>

                <ul className="list-disc pl-5">
                  <li>alvará de funcionamento</li>
                  <li>licença da vigilância sanitária</li>
                  <li>licença do corpo de bombeiros</li>
                </ul>
              </div>

              <div className="mt-4 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
                Essas exigências variam conforme a atividade (CNAE) e o município onde a empresa está localizada.
              </div>
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              <p>
                O licenciamento garante que sua empresa está <b>autorizada a funcionar</b> dentro das regras legais.
              </p>

              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Evita penalidades</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>multas</li>
                    <li>interdição do estabelecimento</li>
                  </ul>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium text-foreground">Permite operação regular</p>
                  <ul className="list-disc pl-4 mt-1">
                    <li>funcionamento legal</li>
                    <li>credibilidade no mercado</li>
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
                O licenciamento deve ser verificado <b>após o registro da empresa</b> e antes do início das atividades.
              </p>

              <div className="mt-3 text-muted-foreground space-y-2">
                <p>Importante:</p>

                <ul className="list-disc pl-5">
                  <li>nem todas as empresas precisam de licenças adicionais</li>
                  <li>atividades de baixo risco podem ser dispensadas</li>
                </ul>
              </div>

              <div className="mt-4 border-l-4 border-yellow-500 pl-3 text-sm text-muted-foreground">
                A obrigatoriedade depende do tipo de atividade e da legislação municipal.
              </div>
            </>
          ),
        },

        requirements: {
          title: "O que você precisa verificar?",
          content: (
            <>
              <p>Para entender se precisa de licenciamento, verifique:</p>

              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>quais atividades sua empresa exerce (CNAE)</li>
                <li>o município onde ela está registrada</li>
                <li>o nível de risco da atividade</li>
              </ul>

              <div className="mt-4 border rounded-md p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">📌 Importante</p>
                O sistema não define automaticamente suas licenças, pois isso depende de regras locais específicas.
              </div>
            </>
          ),
        },

        form: {
          title: "Verificar necessidade de licenciamento",
          content: (
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-4 space-y-2">
                    <p className="font-medium">
                        Consulte o portal da prefeitura do seu município para verificar as exigências de licenciamento da sua empresa.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Procure por termos como <b>"alvará de funcionamento"</b>, <b>"licenciamento"</b> ou <b>"abertura de empresa"</b>.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        As exigências variam conforme a atividade (CNAE) e o local de funcionamento.
                    </p>
                    </CardContent>
                </Card>
            </div>
          ),
        },
      }}

      howTo={{
        title: "O que fazer na prática?",
        content: (
          <>
            <p>✔ Verifique se sua atividade exige licenciamento</p>

            <p className="mt-2">✔ Consulte o portal da prefeitura para seu município</p>

            <p className="mt-2">✔ Caso necessário:</p>

            <ul className="list-disc pl-5 mt-2 text-muted-foreground">
              <li>solicite o alvará de funcionamento</li>
              <li>providencie licenças específicas (se aplicável)</li>
            </ul>

            <div className="mt-3 border-l-4 border-primary pl-3 text-sm text-muted-foreground">
              Se sua atividade for de baixo risco, você pode estar dispensado de licenças adicionais.
            </div>
          </>
        ),
      }}

      tips={{
        title: "Dicas importantes",
        content: (
          <div className="space-y-2 text-muted-foreground">
            <p>✔ Nem toda empresa precisa de licenciamento adicional</p>
            <p>✔ As regras variam de acordo com o município</p>
            <p>✔ Sempre consulte fontes oficiais antes de iniciar suas atividades</p>

            <div className="mt-3 border-l-4 border-yellow-500 pl-3 text-sm">
              Em caso de dúvida, um contador ou a própria prefeitura pode orientar corretamente.
            </div>
          </div>
        ),
      }}
    />
  )
}