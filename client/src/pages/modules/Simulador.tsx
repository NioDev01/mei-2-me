import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
// import React, { useState, useEffect } from 'react';
import { 
  Calculator,
  CheckCircle,
  XCircle,
  TrendingUp,
  Building,
  Users,
  Banknote,
  TriangleAlert,
  Lightbulb,
  HandCoins,
  Building2,
  ChartNoAxesCombined
} from 'lucide-react';

import { RegimeForm } from "@/features/RegimeForm";

// interface CalculationResult {
//   simplesNacional: {
//     tax: number;
//     netIncome: number;
//     taxRate: number;
//   };
//   lucroPresumido: {
//     tax: number;
//     netIncome: number;
//     taxRate: number;
//   };
//   difference: number;
//   recommendation: string;
// }

export function Simulador() {

  return (
    <div className="w-full space-y-8 pt-3">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-1xl text-muted-foreground">
          Compare Simples Nacional e Lucro Presumido para tomar a melhor decisão
        </h2>
      </div>


      {/* Regimes Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Simples Nacional Card */}
          <Card className="bg-gradient-to-r from-green-500 to-green-600 pt-6 pb-0 transform hover:scale-102 transition-all duration-300">
            <CardHeader>
              <CardTitle>
                <h3 className="text-2xl font-bold flex text-white">
                  <Building className="w-8 h-8 mr-2 text-white" />
                  Simples Nacional
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-card p-6 rounded-b-xl h-full">
              <p className="text-card-foreground mb-6">
              Regime simplificado que unifica o recolhimento de até 8 tributos em uma única guia (DAS), 
              com alíquotas progressivas baseadas no faturamento anual.
              </p  >
            
              <div className="mb-6">
                <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Perfil Recomendado
                </h4>
                <ul className="list-disc list-inside text-sm text-card-foreground space-y-1">
                  <li>Faturamento até R$ 4,8 milhões/ano</li>
                  <li>Empresas com baixa margem de lucro</li>
                  <li>Negócios em crescimento inicial</li>
                  <li>Prestadores de serviços com poucos funcionários</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-600 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Vantagens
                  </h5>
                  <ul className="list-disc list-inside text-sm text-card-foreground space-y-1">
                    <li>Tributação simplificada</li>
                    <li>Menor burocracia</li>
                    <li>Alíquotas menores para baixo faturamento</li>
                    <li>Facilidade de cálculo</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-red-600 mb-2 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Desvantagens
                  </h5>
                  <ul className="list-disc list-inside text-sm text-card-foreground space-y-1">
                    <li>Limite de faturamento</li>
                    <li>Não deduz despesas</li>
                    <li>Restrições de atividades</li>
                    <li>Alíquotas crescentes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lucro Presumido Card */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 pt-6 pb-0 transform hover:scale-102 transition-all duration-300">
            <CardHeader>
              <CardTitle>
                <h3 className="text-2xl font-bold flex text-white">
                  <TrendingUp className="w-8 h-8 mr-2 text-white" />
                  Lucro Presumido
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-card p-6 rounded-b-xl h-full">
              <p className="text-card-foreground mb-6">
              Regime onde a Receita Federal presume um percentual de lucro sobre o faturamento, 
              aplicando tributos sobre essa base presumida.
              </p  >
            
              <div className="mb-6">
                <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Perfil Recomendado
                </h4>
                <ul className="list-disc list-inside text-sm text-card-foreground space-y-1">
                  <li>Faturamento acima de R$ 4,8 milhões/ano</li>
                  <li>Empresas com alta margem de lucro</li>
                  <li>Negócios com poucos custos dedutíveis</li>
                  <li>Atividades não permitidas no Simples</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-600 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Vantagens
                  </h5>
                  <ul className="list-disc list-inside text-sm text-card-foreground space-y-1">
                    <li>Sem limite de faturamento</li>
                    <li>Tributação fixa previsível</li>
                    <li>Permite todas as atividades</li>
                    <li>Planejamento facilitado</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-red-600 mb-2 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Desvantagens
                  </h5>
                  <ul className="list-disc list-inside text-sm text-card-foreground space-y-1">
                    <li>Maior complexidade</li>
                    <li>Mais obrigações acessórias</li>
                    <li>Tributos sobre presunção</li>
                    <li>Múltiplas guias de pagamento</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

      </div>

      {/* Sessão da Calculadora */}
      <Card className="gap-0">
        <CardHeader className="mb-0">
          <CardTitle>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-3 text-blue-600"/>
              Simulação de Tributos
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegimeForm />
        </CardContent>
      </Card>      

      

      {/* Sessão de Resultados */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
              Resultado da Simulação
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Simples Nacional Resultado */}
          <Card className="bg-gradient-to-r from-green-500 to-green-600 pt-6 pb-0 transform hover:scale-102 transition-all duration-300">
            <CardHeader className="flex justify-between items-center font-bold text-white text-xl">
              <CardTitle>
                <h2 className="flex">
                  <Building className="mr-2"/>
                  Simples Nacional
                </h2>
              </CardTitle>
              <Banknote/>
            </CardHeader>
            <CardContent className="bg-card p-6 rounded-b-xl h-full space-y-3">
              <div className="flex justify-between">
                <span>Tributos:</span>
                <span className="font-semibold">
                  R$ 0,00
                </span>
              </div>

              <div className="flex justify-between">
                <span>Alíquota Efetiva:</span>
                <span className="font-semibold">
                  0%
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-medium">Lucro Líquido:</span>
                <span className="font-bold text-green-600 text-lg">
                  R$ 0,00
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Lucro Presumido Resultado */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 pt-6 pb-0 transform hover:scale-102 transition-all duration-300">
            <CardHeader className="flex justify-between items-center font-bold text-white text-xl">
              <CardTitle>
                <h2 className="flex">
                  <TrendingUp className="mr-2"/>
                  Lucro Presumido
                </h2>
              </CardTitle>
              <Banknote/>
            </CardHeader>
            <CardContent className="bg-card p-6 rounded-b-xl h-full space-y-3">
              <div className="flex justify-between">
                <span>Tributos:</span>
                <span className="font-semibold">
                  R$ 0,00
                </span>
              </div>

              <div className="flex justify-between">
                <span>Alíquota Efetiva:</span>
                <span className="font-semibold">
                  0%
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-medium">Lucro Líquido:</span>
                <span className="font-bold text-blue-600 text-lg">
                  R$ 0,00
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recomendação */}
        <div className="text-center text-lg">
          <div className="inline-flex items-center px-6 py-3 rounded-lg transform hover:scale-102 transition-all duration-300 font-semibold bg-blue-600 text-white">
              <CheckCircle className="mr-2" />
              Recomendação: Lucro Presumido
          </div  >
      
          <p className="mt-6">
              Economia mensal de <span className="font-bold"> R$ {'0,00'} </span> com o regime recomendado
          </p>
        </div>

        {/* Aviso */}
        <div className="flex shake bg-red-500 text-white text-sm rounded-lg p-4">
          <TriangleAlert className="mr-2" />
          <p>
            <strong>Importante:</strong> Esta é uma simulação simplificada para fins orientativos. 
            Para uma análise precisa, consulte um contador qualificado, pois existem diversos fatores 
            específicos que podem influenciar a escolha do regime tributário ideal.
          </p>
        </div>

      </div>
      
      {/* INformação Adicional */}
      <Card className="gap-0">
        <CardHeader>
          <CardTitle>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-yellow-300"/>
              Fatores Importantes na Escolha
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          
          <div className="text-center transform hover:scale-102 transition-all duration-300">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandCoins className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Faturamento</h4>
            <p className="text-sm">
              O volume de receitas é o principal fator determinante na escolha do regime.
            </p>
          </div>

          <div className="text-center transform hover:scale-102 transition-all duration-300">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Atividade</h4>
            <p className="text-sm">
              Algumas atividades têm restrições ou tratamentos específicos em cada regime.
            </p>
          </div>

          <div className="text-center transform hover:scale-102 transition-all duration-300">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartNoAxesCombined className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Margem de Lucro</h4>
            <p className="text-sm">
              A relação entre receitas e despesas impacta diretamente na tributação.
            </p>
          </div>

        </CardContent>
      </Card>
      
    </div>
  );
}