import { DesenquadramentoStep } from "./DesenquadramentoStep";
import { RegimeTributarioStep } from "./RegimeTributarioStep";
import { ContratoSocialStep } from "./ContratoSocialStep";
 
export const stepComponentMap: Record<string, any> = {
  desenquadramento: DesenquadramentoStep,
  regime_tributario: RegimeTributarioStep,
  contrato_social: ContratoSocialStep,
};
 