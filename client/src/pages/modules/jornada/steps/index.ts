import { DesenquadramentoStep } from "./DesenquadramentoStep";
import { DefinicaoEmpresaStep } from "./DefinicaoEmpresaStep";
import { RegimeTributarioStep } from "./RegimeTributarioStep";

export const stepComponentMap: Record<string, any> = {
  desenquadramento: DesenquadramentoStep,
  definicao_empresa: DefinicaoEmpresaStep,
  regime_tributario: RegimeTributarioStep,
};
