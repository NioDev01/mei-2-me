import { DesenquadramentoStep } from "./DesenquadramentoStep";
import { RegimeTributarioStep } from "./RegimeTributarioStep";
import { ContratoSocialStep } from "./ContratoSocialStep";
import { JuntaComercialStep } from "./JuntaComercialStep";

export const stepComponentMap: Record<string, any> = {
  desenquadramento: DesenquadramentoStep,
  regime_tributario: RegimeTributarioStep,
  contrato_social: ContratoSocialStep,
  junta_comercial: JuntaComercialStep,
};