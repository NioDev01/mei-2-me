import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
// import React, { useState, useEffect } from 'react';
import { 
  CheckCircle,
  TrendingUp,
  Building,
  Banknote,
  TriangleAlert,
} from 'lucide-react';

export function RegimeResultado() {
    return (
      <div>
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
      </div>
    )
}