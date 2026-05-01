import { DesenquadramentoStep } from "./DesenquadramentoStep";
import { DefinicaoEmpresaStep } from "./DefinicaoEmpresaStep";
import { AtoConstitutivoStep } from "./AtoConstitutivoStep";
import { RegimeTributarioStep } from "./RegimeTributarioStep";

export const stepComponentMap: Record<string, any> = {
  desenquadramento: DesenquadramentoStep,
  definicao_empresa: DefinicaoEmpresaStep,
  ato_constitutivo: AtoConstitutivoStep,
  regime_tributario: RegimeTributarioStep,
};
