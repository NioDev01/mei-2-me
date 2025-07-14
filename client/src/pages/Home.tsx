import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavBarMain } from "@/features/NavBarMain";
import { Link } from 'react-router-dom';
import { Users, Cog, ArrowRight, Headphones } from "lucide-react";

export function Home() {
  return (
    <div className="pt-15 min-h-screen bg-background text-foreground font-sans">

      {/* Navigation Bar */}
      <NavBarMain />

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div>
                <h1 className="font-semi-bold text-foreground lg:text-3xl mb-6 leading-tight">
                  Do MEI à Microempresa: Conquiste o Sucesso com o MEI2ME
                </h1>
                <p className="text-2xl text-muted-foreground mb-8">
                  Boas vindas à nossa plataforma digital.
                </p>
              </div>
              
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Transformar um sonho em realidade exige coragem, planejamento e as ferramentas certas. É por isso que o MEI2ME foi criado: para ser um parceiro verdadeiro na sua jornada empreendedora.
                </p>
                <p>
                  Nossa plataforma digital foi desenvolvida pensando em você, que começou como MEI e agora quer dar o próximo passo rumo a uma Microempresa de sucesso.
                </p>
              </div>
            </div>

            {/* Right Column - CTA Card */}
            <div className="lg:pl-8">
              <div className="bg-primary rounded-lg p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl text-white lg:text-3xl font-bold text-center mb-6 leading-tight">
                  Decifre o Futuro do Seu Negócio: Transição de MEI é Para Você?
                </h2>
                <p className="text-secondary text-center mb-8 text-lg">
                  Em poucos minutos, tenha clareza sobre as oportunidades e o melhor caminho para sua empresa.
                </p>
                <Button variant={"secondary"} className="w-full h-full font-bold py-4 px-8 text-xl" asChild>
                  <Link to="/dia-inicial">Faça o Diagnóstico Gratuito</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 px-6 ">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-foreground lg:text-2xl font-bold mb-4">
              Com o MEI2ME você estará sempre no controle da sua vida profissional.
            </h2>
            <p className="text-xl text-muted-foreground">
              Além de uma migração personalizada e simples, você terá:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mt-16">
            {/* Feature 1 */}
            <Card className="bg-muted p-8 hover:border-ring transition-all duration-300 hover:shadow-xl group"> 
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-primary-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Acesso à informações</h3>
              <p className="text-muted-foreground leading-relaxed">
                Facilitar o acesso à informações e descomplicar a comunicação com os clientes.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-muted p-8 hover:border-ring transition-all duration-300 hover:shadow-xl group"> 
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cog className="text-primary-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Processo Automatizado</h3>
              <p className="text-muted-foreground leading-relaxed">
                Facilitar o acesso à informações e descomplicar a comunicação com os clientes.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-muted p-8 hover:border-ring transition-all duration-300 hover:shadow-xl group"> 
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="text-primary-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Facilidade na Migração</h3>
              <p className="text-muted-foreground leading-relaxed">
                Facilitar o acesso à informações e descomplicar a comunicação com os clientes.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-muted p-8 hover:border-ring transition-all duration-300 hover:shadow-xl group"> 
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="text-primary-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Acompanhamento Personalizado</h3>
              <p className="text-muted-foreground leading-relaxed">
                Facilitar o acesso à informações e descomplicar a comunicação com os clientes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 bg-sidebar">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            Pronto para transformar o seu negócio?
          </h2>
          <Button className="py-4 px-12 h-14 text-lg" asChild>
            <Link to="/mensagens">Comece Agora Gratuitamente</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}