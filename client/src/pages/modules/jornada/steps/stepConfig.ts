import {
  FileText,
  Building2,
  Landmark,
  ClipboardList,
  FileCheck,
  Coins,
  RefreshCcw,
  Route,
} from "lucide-react";

export const stepConfig: Record<
  string,
  { label: string; description: string; icon: any }
> = {
  desenquadramento: {
    label: "Desenquadramento do MEI",
    description: "Transição do MEI para ME",
    icon: Route,
  },
  definicao_empresa: {
    label: "Definição da Empresa",
    description: "Informações da empresa",
    icon: Building2,
  },
  ato_constitutivo: {
    label: "Ato Constitutivo",
    description: "Base legal da empresa",
    icon: FileText,
  },
  junta_comercial: {
    label: "Junta Comercial",
    description: "Registro da empresa",
    icon: Landmark,
  },
  cnpj: {
    label: "Atualização do CNPJ",
    description: "Alterações cadastrais",
    icon: RefreshCcw,
  },
  licenciamento: {
    label: "Licenciamento",
    description: "Autorizações legais",
    icon: ClipboardList,
  },
  regime_tributario: {
    label: "Regime Tributário",
    description: "Definição de impostos",
    icon: Coins,
  },
  obrigacoes_fiscais: {
    label: "Obrigações Fiscais",
    description: "Compromissos legais",
    icon: FileCheck,
  },
};
