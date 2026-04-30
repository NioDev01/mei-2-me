import { StepTemplate } from "./StepTemplate"

export function DefinicaoEmpresaStep() {
  return (
    <StepTemplate
      sections={{
        whatIs: {
          title: "O que é a Definição da Nova Empresa?",
          content: (
            <>
              <p>Nesta etapa, você precisa definir as informações básicas da sua nova empresa, como:</p>

              <ul className="list-disc pl-5 mt-2 mb-2">
                <li>tipo de empresa (natureza jurídica)</li>
                <li>atividades que ela irá exercer</li>
                <li>capital inicial</li>
                <li>e, se houver, participação de sócios</li>
              </ul>

              <p>Essas definições servem como base para toda a formalização da empresa nas próximas etapas.</p>
            </>
          ),
        },

        why: {
          title: "Por que isso é importante?",
          content: (
            <>
              <p>As escolhas feitas aqui impactam diretamente em:</p>

              <ul className="list-disc pl-5 mt-2 mb-2">
                <li>como sua empresa será registrada</li>
                <li>quais serão suas obrigações legais</li>
                <li>como os impostos serão aplicados</li>
                <li>e o nível de responsabilidade dos sócios (se houver)</li>
              </ul>

              <p>Em outras palavras: essa etapa define “como a sua empresa vai funcionar” do ponto de vista legal e fiscal.</p>
            </>
          ),
        },

        when: {
          title: "Quando isso é necessário?",
          content: (
            <>
              <p>Essa etapa acontece após o desenquadramento do MEI e antes da formalização da nova empresa.</p>
              <br />
              <p>É nesse momento que você estrutura sua empresa antes de registrá-la oficialmente.</p>
            </>
          ),
        },

        requirements: {
          title: "O que você vai precisar?",
          content: (
            <>
              <p>Para definir sua nova empresa, você deve ter uma ideia clara sobre:</p>

              <ul className="list-disc pl-5 mt-2 mb-2">
                <li>quais atividades sua empresa irá exercer</li>
                <li>onde ela irá funcionar</li>
                <li>se você terá sócios ou atuará sozinho</li>
                <li>quanto pretende investir inicialmente (capital social)</li>
              </ul>

              <p>Algumas dessas informações podem já ter sido informadas anteriormente na plataforma.</p>
            </>
          ),
        },
      }}

      howTo={{
        title: "Entendendo as opções de tipo de empresa (natureza jurídica)",
        content: (
          <>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className="space-y-2">
                <p className="font-bold">Empresário Individual (EI)</p>

                <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                  <li>Indicado para quem quer continuar atuando sozinho</li>
                  <li>Não há separação entre o patrimônio da empresa e o pessoal</li>
                  <li>Estrutura mais simples</li>
                </ul>

                <p>Pode ser uma opção para negócios menores ou com menor risco</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold">Sociedade Limitada (LTDA)</p>

                <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                  <li>Utilizada quando há dois ou mais sócios</li>
                  <li>Define responsabilidades e participação de cada sócio</li>
                  <li>O patrimônio pessoal dos sócios é, em geral, separado do da empresa</li>
                </ul>
                
                <p>É um dos modelos mais comuns no Brasil</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold">Sociedade Limitada Unipessoal (SLU)</p>

                <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                  <li>Permite abrir uma empresa sozinho, com características de uma LTDA</li>
                  <li>Há separação entre patrimônio pessoal e empresarial</li>
                  <li>Não exige sócios</li>
                </ul>

                <p>É uma alternativa moderna para quem quer empreender sozinho com mais proteção</p>
              </div>
            </div>
          </>
        ),
      }}

      tips={{
        title: "Dicas e cuidados",
        content: (
          <>
            <ul className="list-disc pl-5 mt-2 mb-2">
              <li>A escolha da natureza jurídica impacta diretamente na responsabilidade sobre dívidas da empresa</li>
              <li>Definir corretamente as atividades (CNAE) evita problemas fiscais futuros</li>
              <li>O capital social deve ser compatível com a realidade do negócio</li>
              <li>Em caso de dúvida, o apoio de um contador pode ajudar na escolha mais adequada</li>
            </ul>
          </>
        ),
      }}
    />
  )
}