import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ZoomableDialogImage } from "@/features/ZoomableDialogImage";
import { NavBarMain } from "@/features/NavBarMain";
import { Link } from 'react-router-dom';
import { 
  Route, 
  Calculator, 
  ListChecks, 
  BotMessageSquare,
} from "lucide-react"
import { DialogTrigger } from "@radix-ui/react-dialog";
import PrevCheckDocs from '@/assets/preview/checklist-docs-preview.png';

interface Benefits {
  cardIcon: React.ReactNode;
  cardTitle: string;
  cardContent: string;
  dialogIcon: React.ReactNode;
  dialogTitle: string;
  dialogContent: React.ReactNode;
}

const benefits: Benefits[] = [
  {
    cardIcon: <Route className="w-8 h-8 text-primary-foreground" />,
    cardTitle: "Seguir o Passo a Passo Detalhado",
    cardContent: "A jornada de migração nunca foi tão clara e acessível. Nosso passo a passo detalhado ira guiá-lo por cada etapa, garantindo que você saiba o que fazer em cada momento.",
    dialogIcon: <Route className="w-6 h-6 text-primary-foreground" />,
    dialogTitle: "Jornada",
    dialogContent: <ZoomableDialogImage src={PrevCheckDocs} alt="Preview Checklist de Documentos" />
  },
  {
    cardIcon: <Calculator className="w-8 h-8 text-primary-foreground" />,
    cardTitle: "Simular o Melhor Regime Tributário",
    cardContent: "Com a nossa ferramenta de simulação, você pode comparar diferentes regimes tributários e descobrir qual é o mais vantajoso para o seu negócio, economizando tempo e dinheiro.",
    dialogIcon: <Calculator className="w-6 h-6 text-primary-foreground" />,
    dialogTitle: "Simulador de Regime",
    dialogContent: <ZoomableDialogImage src={PrevCheckDocs} alt="Preview Checklist de Documentos" />
  },
  {
    cardIcon: <ListChecks className="w-8 h-8 text-primary-foreground" />,
    cardTitle: "Manter os Documentos Organizados",
    cardContent: "Nunca mais esqueça um documento importante. Nosso checklist de documentos garante que você tenha tudo em ordem para uma migração tranquila e sem surpresas.",
    dialogIcon: <ListChecks className="w-6 h-6 text-primary-foreground" />,
    dialogTitle: "Checklist de Documentos",
    dialogContent: <ZoomableDialogImage src={PrevCheckDocs} alt="Preview Checklist de Documentos" />
  },
  {
    cardIcon: <BotMessageSquare className="w-8 h-8 text-primary-foreground" />,
    cardTitle: "Tirar suas Dúvidas com a ContAI",
    cardContent: "A ContAI será sua companheira de confiança na jornada de migração, estando sempre pronta para responder suas perguntas e fornecer orientações personalizadas.",
    dialogIcon: <BotMessageSquare className="w-6 h-6 text-primary-foreground" />,
    dialogTitle: "ContAI",
    dialogContent: <ZoomableDialogImage src={PrevCheckDocs} alt="Preview Checklist de Documentos" />
  }
] 

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
                  <Link to="/Diagnostico">Faça o Diagnóstico Gratuito</Link>
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
            {/* Benefits */}
            {benefits.map((benefit) => (
              <Dialog key={benefit.dialogTitle}>
                <DialogTrigger asChild>
                  <Card className="bg-muted p-8 hover:border-ring transition-all duration-300 hover:shadow-xl group cursor-pointer"> 
                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {benefit.cardIcon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{benefit.cardTitle}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.cardContent}
                    </p>
                  </Card>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-4">{benefit.dialogIcon}{benefit.dialogTitle}</DialogTitle>
                  </DialogHeader>
                  {benefit.dialogContent}
                </DialogContent>
              </Dialog>
            ))}
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
            <Link to="/Diagnostico">Comece Agora Gratuitamente</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
