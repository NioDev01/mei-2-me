import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import {
  BanknoteArrowDown,
  Building,
  Calculator,
  ClipboardPen,
  FilePlus,
  ListCheck,
  PiggyBank,
  Route,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { DiagnosticoData } from "@/interfaces/diagnostico";
import type { ChecklistData } from "@/interfaces/checklist";
import type { SimuladorData } from "@/interfaces/simulador";
import type { JornadaData } from "@/interfaces/jornada";
import { useNavigate } from "react-router-dom";

const getMetricas = (
  mei: DiagnosticoData["mei"],
  marked: number,
  totalDocs: number,
  fmt: (n?: number) => string,
) => [
  {
    id: 1,
    label: "Funcionários",
    value: mei?.qtd_funcionario ?? "-",
    icon: <UsersRound size={16} />,
    iconClassName: "bg-blue-500/10 text-blue-500",
  },
  {
    id: 2,
    label: "Faturamento anual",
    value: fmt(mei?.faturamento_12m),
    icon: <PiggyBank size={16} />,
    iconClassName: "bg-green-500/10 text-green-500",
  },
  {
    id: 3,
    label: "Compras anuais",
    value: fmt(mei?.compras_12m),
    icon: <BanknoteArrowDown size={16} />,
    iconClassName: "bg-amber-500/10 text-amber-500",
  },
  {
    id: 4,
    label: "Documentos reunidos",
    value: totalDocs > 0 ? `${marked}/${totalDocs}` : "-",
    icon: <FilePlus size={16} />,
    iconClassName: "bg-purple-500/10 text-purple-500",
  },
];

const isApto = (text?: string) => text?.includes("deve realizar") ?? false;

export function Painel() {
  const [diagnostico, setDiagnostico] = useState<DiagnosticoData | null>(null);
  const [checklist, setChecklist] = useState<ChecklistData | null>(null);
  const [simulador, setSimulador] = useState<SimuladorData | null>(null);
  const [jornada, setJornada] = useState<JornadaData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api
        .get("diagnostico-inicial")
        .then((r) => {
          setDiagnostico(r.data);
        })
        .catch(() => null),

      api
        .get("checklist-documentos")
        .then((r) => setChecklist(r.data))
        .catch(() => null),

      api
        .get("simulador-regimes")
        .then((r) => setSimulador(r.data))
        .catch((err) => {
          if (err.response?.status === 404) {
            setSimulador(null);
          }
        }),

      api
        .get("jornada/summary")
        .then((r) => setJornada(r.data))
        .catch(() => null),
    ]);
  }, []);

  const fmt = (n?: number) =>
    n?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    }) ?? "-";

  const checklistFields = checklist
    ? Object.entries(checklist).filter(
        ([k]) => k !== "id_mei" && k !== "id_checklist",
      )
    : [];
  const totalDocs = checklistFields.length;
  const marked = checklistFields.filter(([, v]) => v === true).length;
  const pctChecklist =
    totalDocs > 0 ? Math.round((marked / totalDocs) * 100) : 0;

  const mei = diagnostico?.mei;
  const analise = diagnostico?.analise;
  const nomeEmpresa = mei?.razao_social ?? "—";

  return (
    <div className='space-y-4 pt-3'>
      <div>
        <h2 className='text-1xl text-muted-foreground'>
          Acompanhe o progresso da sua migração de MEI para ME.
        </h2>
      </div>
      <div className=''>
        <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3'>
          Empresa
        </p>
        <div className='flex items-center gap-4 p-4 rounded-xl border bg-muted/50  border-gray-500/10'>
          <div className='w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-medium text-sm shrink-0'>
            <Building size={20} />
          </div>
          <div className='flex-1 truncate'>
            <p className='font-medium truncate'>{nomeEmpresa}</p>
            <p className='text-sm text-muted-foreground'>
              {[mei?.municipio_mei, mei?.uf_mei].filter(Boolean).join("/") ||
                "-"}
            </p>
          </div>
          {analise?.analise && (
            <span
              className={`text-xs font-medium px-3 py-1 rounded-md ${
                isApto(analise.analise)
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {isApto(analise.analise) ? "Apto" : "Não apto"}
            </span>
          )}
        </div>
      </div>

      {/* Métricas */}
      <div>
        <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3'>
          Resumo
        </p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          {getMetricas(mei, marked, totalDocs, fmt).map((m) => (
            <div
              key={m.id}
              className='bg-muted/50 border border-gray-500/10 rounded-lg p-4'
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${m.iconClassName}`}
              >
                {m.icon}
              </div>
              <p className='text-xs text-muted-foreground mb-1'>{m.label}</p>
              <p className='text-base font-medium text-foreground'>
                {String(m.value)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3'>
          Módulos
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {/* Diagnóstico */}
          <Card
            className='p-4 cursor-pointer hover:border-blue-500/50 transition-colors'
            onClick={() => navigate("/diagnostico")}
          >
            <div className='flex items-center justify-between'>
              <div className='w-8 h-8 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs'>
                <ClipboardPen size={16} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  diagnostico
                    ? "bg-green-500/10 text-green-500"
                    : "bg-amber-500/10 text-amber-500"
                }`}
              >
                {diagnostico ? "Concluído" : "Pendente"}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium'>Diagnóstico inicial</p>
              <p className='text-xs text-muted-foreground mt-0.5'>
                {analise?.analise
                  ? isApto(analise.analise)
                    ? "O MEI deve realizar a migração, pois violou os requisitos legais"
                    : "O MEI está em conformidade com a legislação vigente"
                  : "Aguardando dados"}
              </p>
            </div>
            <div className='h-1 bg-gray-500/10 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-500 rounded-full transition-all'
                style={{ width: diagnostico ? "100%" : "0%" }}
              />
            </div>
          </Card>

          {/* Checklist */}
          <Card
            className='p-4 cursor-pointer hover:border-blue-500/50 transition-colors'
            onClick={() => {
              window.location.hash = "checklist";
            }}
          >
            <div className='flex items-center justify-between'>
              <div className='w-8 h-8 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs'>
                <ListCheck size={16} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  pctChecklist === 100
                    ? "bg-green-500/10 text-green-500"
                    : pctChecklist > 0
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-amber-500/10 text-amber-500"
                }`}
              >
                {pctChecklist === 100
                  ? "Concluído"
                  : pctChecklist > 0
                    ? "Em andamento"
                    : "Pendente"}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium'>Checklist de documentos</p>
              <p className='text-xs text-muted-foreground mt-0.5'>
                {totalDocs > 0
                  ? `${marked} de ${totalDocs} documentos`
                  : "Aguardando dados"}
              </p>
            </div>
            <div className='h-1 bg-gray-500/10 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-500 rounded-full transition-all'
                style={{ width: `${pctChecklist}%` }}
              />
            </div>
          </Card>

          {/* Simulador de Regimes */}
          <Card
            className='p-4 cursor-pointer hover:border-blue-500/50 transition-colors'
            onClick={() => {
              window.location.hash = "simulador";
            }}
          >
            <div className='flex items-center justify-between'>
              <div className='w-8 h-8 rounded-md bg-blue-500/10  text-blue-500 flex items-center justify-center text-xs'>
                <Calculator size={16} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  simulador
                    ? "bg-green-500/10 text-green-500"
                    : "bg-amber-500/10 text-amber-500"
                }`}
              >
                {simulador ? "Concluído" : "Pendente"}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium'>Simulador de regimes</p>
              <p className='text-xs text-muted-foreground mt-0.5'>
                {simulador
                  ? `Regime recomendado: ${
                      simulador.recomendacao === "SN"
                        ? "Simples Nacional"
                        : simulador.recomendacao === "LP"
                          ? "Lucro Presumido"
                          : "Indiferente"
                    }`
                  : "Aguardando dados"}
              </p>
            </div>
            <div className='h-1 bg-gray-500/10 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-500 rounded-full transition-all'
                style={{ width: simulador ? "100%" : "0%" }}
              />
            </div>
          </Card>

          {/* Jornada */}
          <Card
            className='p-4  cursor-pointer hover:border-blue-500/50 transition-colors'
            onClick={() => {
              window.location.hash = "jornada";
            }}
          >
            <div className='flex items-center justify-between'>
              <div className='w-8 h-8 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs'>
                <Route size={16} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  jornada?.progress === 100
                    ? "bg-green-500/10 text-green-500"
                    : jornada && jornada.progress > 0
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-amber-500/10 text-amber-500"
                }`}
              >
                {jornada?.progress === 100
                  ? "Concluído"
                  : jornada?.progress && jornada.progress > 0
                    ? "Em andamento"
                    : "Pendente"}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium'>Jornada</p>
              <p className='text-xs text-muted-foreground mt-0.5'>
                {jornada
                  ? `${jornada.completedSteps} de ${jornada.totalSteps} etapas concluídas`
                  : "Aguardando dados"}
              </p>
            </div>
            <div className='h-1 bg-gray-500/10 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-500 rounded-full transition-all'
                style={{ width: jornada ? `${jornada.progress}%` : "0%" }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
