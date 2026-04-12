import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calculator,
  TrendingUp,
  Building,
  Lightbulb,
  HandCoins,
  Building2,
  ChartNoAxesCombined,
} from "lucide-react";

import { RegimeForm, RegimeResultado } from "@/features/regime";
import type { ResultadoSimulador } from "@/features/regime/types/ResultadoSimulador";
import { useAuth } from "@/context/AuthContext";

export function Simulador() {
  const { user, loading: authLoading } = useAuth();

  const id_mei = user?.id_mei;

  const [isLoading, setIsLoading] = useState(true);
  const [retorno, setRetorno] = useState<ResultadoSimulador | undefined>();

  async function fetchSimulacao(meiId: number) {
    try {
      const response = await axios.get<ResultadoSimulador>(
        `${import.meta.env.VITE_API_URL}/simulador-regimes/${meiId}`
      );

      setRetorno(response.data ?? undefined);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // estado válido (ainda não simulou)
        setRetorno(undefined);
      } else {
        console.error("Erro ao buscar simulador:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!id_mei) return;

    setIsLoading(true);
    fetchSimulacao(id_mei);
  }, [id_mei]);

  const handleUpdateResultado = (novoResultado: ResultadoSimulador) => {
    setRetorno((prev) => ({
      ...(prev ?? {}),
      ...(novoResultado ?? {}),
    }));
  };

  const dadosForm = retorno
    ? {
        faturamento_12m: retorno.faturamento_12m,
        receitas_financeiras: retorno.receitas_financeiras,
        receitas_nao_operacionais: retorno.receitas_nao_operacionais,
        despesas_financeiras: retorno.despesas_financeiras,
      }
    : undefined;

  // 🔐 Loading de autenticação
  if (authLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  // 🚫 Usuário não autenticado
  if (!id_mei) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">
          Você precisa estar autenticado para acessar o simulador.
        </p>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-8 pt-3">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-1xl text-muted-foreground">
          Compare Simples Nacional e Lucro Presumido para tomar a melhor decisão
        </h2>
      </div>

      {/* Cards de regimes */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 pt-6 pb-0">
          <CardHeader>
            <CardTitle>
              <h3 className="text-2xl font-bold flex text-white">
                <Building className="w-8 h-8 mr-2" />
                Simples Nacional
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-card p-6 rounded-b-xl">
            <p>Regime simplificado com recolhimento unificado (DAS).</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 pt-6 pb-0">
          <CardHeader>
            <CardTitle>
              <h3 className="text-2xl font-bold flex text-white">
                <TrendingUp className="w-8 h-8 mr-2" />
                Lucro Presumido
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-card p-6 rounded-b-xl">
            <p>
              Tributação baseada em margem presumida pela Receita Federal.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h3 className="text-2xl font-bold flex items-center">
              <Calculator className="w-6 h-6 mr-3 text-blue-600" />
              Simulação de Tributos
            </h3>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Skeleton className="w-full h-[200px]" />
          ) : (
            <RegimeForm
              id_mei={id_mei}
              dadosIniciais={dadosForm}
              onResultadoChange={handleUpdateResultado}
            />
          )}
        </CardContent>
      </Card>

      {/* Resultado */}
      {isLoading ? (
        <Skeleton className="w-full h-[250px]" />
      ) : retorno ? (
        <RegimeResultado
          tributosSimples={retorno.tributos_simples}
          aliquotaSimples={retorno.aliq_efetiva_simples}
          lucroLiquidoSimples={retorno.lucro_liq_simples}
          tributosLucrop={retorno.tributos_lucrop}
          aliquotaLucrop={retorno.aliq_efetiva_lucrop}
          lucroLiquidoLucrop={retorno.lucro_liq_lucrop}
          recomendacao={retorno.recomendacao}
        />
      ) : (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">
            Você ainda não realizou uma simulação.
          </p>
        </Card>
      )}

      {/* Info adicional */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h3 className="text-2xl font-bold flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
              Fatores Importantes
            </h3>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <HandCoins className="mx-auto mb-2" />
            <h4 className="font-semibold">Faturamento</h4>
          </div>

          <div className="text-center">
            <Building2 className="mx-auto mb-2" />
            <h4 className="font-semibold">Atividade</h4>
          </div>

          <div className="text-center">
            <ChartNoAxesCombined className="mx-auto mb-2" />
            <h4 className="font-semibold">Margem</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}