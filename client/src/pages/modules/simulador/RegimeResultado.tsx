import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  TrendingUp,
  Building,
  Banknote,
  TriangleAlert,
} from "lucide-react";

interface RegimeResultadoProps {
  tributosSimples?: number;
  aliquotaSimples?: number;
  lucroLiquidoSimples?: number;

  tributosLucrop?: number;
  aliquotaLucrop?: number;
  lucroLiquidoLucrop?: number;

  recomendacao?: string;
}

function formatCurrency(value?: number) {
  const v = Number(value ?? 0);
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value?: number) {
  const v = Number(value ?? 0) * 100;
  return `${v.toFixed(2)}%`;
}

function mapRecomendacaoLabel(code?: string) {
  if (!code) return "—";
  const c = String(code).toUpperCase();
  if (c === "SN") return "Simples Nacional";
  if (c === "LP") return "Lucro Presumido";
  return code;
}

export function RegimeResultado({
  tributosSimples = 0,
  aliquotaSimples = 0,
  lucroLiquidoSimples = 0,
  tributosLucrop = 0,
  aliquotaLucrop = 0,
  lucroLiquidoLucrop = 0,
  recomendacao = "—",
}: RegimeResultadoProps) {
  const recCode = String(recomendacao ?? "").toUpperCase();

  const isSimplesWinner = recCode === "SN";
  const isLucroWinner = recCode === "LP";

  const lucroSim = Number(lucroLiquidoSimples ?? 0);
  const lucroLp = Number(lucroLiquidoLucrop ?? 0);

  // 💰 Economia baseada em lucro (mais correto)
  let economia = 0;

  if (recCode === "SN") {
    economia = lucroSim - lucroLp;
  } else if (recCode === "LP") {
    economia = lucroLp - lucroSim;
  } else {
    economia = Math.abs(lucroSim - lucroLp);
  }

  economia = Math.max(0, economia);

  const recomendacaoLabel = mapRecomendacaoLabel(recomendacao);

  const bgClass =
    isSimplesWinner
      ? "bg-green-600"
      : isLucroWinner
      ? "bg-blue-600"
      : "bg-gray-600";

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
                  <Building className="mr-2" />
                  Simples Nacional
                </h2>
              </CardTitle>
              <Banknote />
              {isSimplesWinner && (
                <span className="text-xs bg-white text-green-600 px-2 py-1 rounded">
                  Recomendado
                </span>
              )}
            </CardHeader>
            <CardContent className="bg-card p-6 rounded-b-xl h-full space-y-3">
              <div className="flex justify-between">
                <span>Tributos:</span>
                <span className="font-semibold">
                  R$ {formatCurrency(tributosSimples)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Alíquota Efetiva:</span>
                <span className="font-semibold">
                  {formatPercent(aliquotaSimples)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-medium">Lucro Líquido:</span>
                <span className="font-bold text-green-600 text-lg">
                  R$ {formatCurrency(lucroLiquidoSimples)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Lucro Presumido Resultado */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 pt-6 pb-0 transform hover:scale-102 transition-all duration-300">
            <CardHeader className="flex justify-between items-center font-bold text-white text-xl">
              <CardTitle>
                <h2 className="flex">
                  <TrendingUp className="mr-2" />
                  Lucro Presumido
                </h2>
              </CardTitle>
              <Banknote />
              {isLucroWinner && (
                <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">
                  Recomendado
                </span>
              )}
            </CardHeader>
            <CardContent className="bg-card p-6 rounded-b-xl h-full space-y-3">
              <div className="flex justify-between">
                <span>Tributos:</span>
                <span className="font-semibold">
                  R$ {formatCurrency(tributosLucrop)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Alíquota Efetiva:</span>
                <span className="font-semibold">
                  {formatPercent(aliquotaLucrop)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-medium">Lucro Líquido:</span>
                <span className="font-bold text-blue-600 text-lg">
                  R$ {formatCurrency(lucroLiquidoLucrop)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recomendação */}
        <div className="text-center text-lg">
          <div className={`inline-flex items-center px-6 py-3 rounded-lg transform hover:scale-102 transition-all duration-300 font-semibold text-white ${bgClass}`}>
            <CheckCircle className="mr-2" />
            Recomendação: {recomendacaoLabel}
          </div>

        <p className="mt-6">
          Economia estimada mensal de{" "}
          <span className="font-bold">
            R$ {formatCurrency(economia)}
          </span>{" "}
          com o regime recomendado
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
  );
}
