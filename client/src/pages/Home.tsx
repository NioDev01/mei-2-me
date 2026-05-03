import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavBarMain } from "@/features/NavBarMain";
import { Link } from 'react-router-dom';
import {
  FileText,
  BadgeDollarSign,
  Route,
  BotMessageSquare,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Checklist de Documentos",
    description:
      "Organize e acompanhe todos os documentos importantes em um só lugar. Saiba exatamente o que falta e o que já foi entregue, com mais agilidade e segurança.",
    color: "bg-blue-50 text-primary",
  },
  {
    icon: Route,
    title: "Jornada Guiada",
    description:
      "Acompanhe cada etapa do processo de forma simples e visual. Veja seu progresso, o que foi concluído e o que ainda está por vir, com clareza total.",
    color: "bg-emerald-50 text-secondary",
  },
  {
    icon: BadgeDollarSign,
    title: "Simulador de Regime",
    description:
      "Descubra qual regime tributário é mais vantajoso na transição de MEI para ME. Cenários personalizados para decisões mais seguras e lucrativas.",
    color: "bg-amber-50 text-warning",
  },
  {
    icon: BotMessageSquare,
    title: "ContAI",
    description:
      "Tire dúvidas e receba orientação durante toda a sua transição. Mais facilidade, menos erros.",
    color: "bg-blue-50 text-primary",
  },
];

const steps = [
  {
    number: "01",
    title: "Faça o diagnóstico",
    description: "Responda algumas perguntas simples sobre o seu negócio e descubra se é hora de migrar.",
  },
  {
    number: "02",
    title: "Receba seu plano",
    description: "Nossa plataforma gera um roteiro personalizado com todos os passos para a sua transição.",
  },
  {
    number: "03",
    title: "Execute com suporte",
    description: "Siga a jornada guiada, organize seus documentos e use nossas ferramentas de simulação.",
  },
];

const stats = [
  { value: "2.000+", label: "Empreendedores atendidos" },
  { value: "98%", label: "Taxa de satisfação" },
  { value: "< 5 min", label: "Tempo médio de diagnóstico" },
];

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavBarMain />

      {/* Hero*/}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-24 w-72 h-72 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20">
              <TrendingUp size={12} />
              Plataforma digital para MEIs em crescimento
            </span>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-14">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Do{" "}
              <span className="text-primary">MEI</span>{" "}
              à{" "}
              <span className="text-green-500">Microempresa</span>
              <br />
              sem complicação
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Evite problemas fiscais e descubra se seu MEI precisa evoluir para ME.
              O <strong className="text-foreground font-semibold">MEI2ME</strong> é seu parceiro verdadeiro
              em cada etapa da jornada de transição.
            </p>
          </div>

          {/* CTA Card */}
          <div className="max-w-xl mx-auto">
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 shadow-2xl shadow-primary/25 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 bg-white/15 rounded-xl mb-5">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  A transição de MEI é para você?
                </h2>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Em poucos minutos, tenha clareza sobre as oportunidades e o melhor caminho para sua empresa.
                </p>

                <ul className="space-y-2 mb-7">
                  {["100% gratuito", "Resultado imediato", "Sem burocracia"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 size={15} className="text-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="secondary"
                  className="w-full h-12 text-base font-bold group"
                  asChild
                >
                  <Link to="/Diagnostico">
                    Descobrir se preciso migrar
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Social proof stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-foreground">{value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Como funciona
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Simples como deve ser
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base">
              Três passos para sair do MEI e entrar no próximo nível do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[-calc(50%-2rem)] h-px bg-border" />
                )}
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-lg mb-4 shadow-md shadow-primary/25">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Resources */}
      <section id="recursos" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Recursos
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Tudo que você precisa para crescer
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base">
              Ferramentas inteligentes que simplificam cada etapa da sua transição.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default border-border/60"
              >
                <div
                  className={`bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 shadow-sm`}
                >
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value proposition strip */}
      <section className="py-14 px-6 bg-muted/50 border-y border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Clock, title: "Economize tempo", text: "Sem burocracia manual. Tudo centralizado em um só lugar." },
              { icon: ShieldCheck, title: "Decisões seguras", text: "Simulações tributárias baseadas no seu cenário." },
              { icon: TrendingUp, title: "Cresça com confiança", text: "Jornada guiada, do início ao fim, sem surpresas." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="text-accent-foreground w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Pronto para transformar
            <br />
            o seu negócio?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Junte-se a milhares de empreendedores que já deram o próximo passo com o MEI2ME.
          </p>
          <Button className="h-14 px-10 text-base font-bold group shadow-lg shadow-primary/25" asChild>
            <Link to="/Diagnostico">
              Comece Agora Gratuitamente
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-5">
            Sem cartão de crédito. Sem compromisso.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center space-y-2">
          <div className="flex justify-center items-center gap-1">
            <span className="text-sm font-bold text-primary">MEI</span>
            <span className="text-sm font-bold text-green-500">2ME</span>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MEI2ME. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
