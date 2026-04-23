import { DesenquadramentoStep } from "./DesenquadramentoStep";
import { ContratoSocialStep } from "./ContratoSocialStep";
import { JuntaComercialStep } from "./JuntaComercialStep";
import { AtualizacaoCnpjStep } from "./AtualizaçãoCnpjStep";
import { DefinicaoEmpresaStep } from "./DefiniçãoEmpresaStep";
import { LicenciamentoStep } from "./LicenciamentoStep";
import { RegimeTributarioStep } from "./RegimeTributarioStep";
import { ObrigacoesFiscaisStep } from "./ObrigaçõesFiscaisStep";


export const stepComponentMap: Record<string, any> = {
  desenquadramento: DesenquadramentoStep,
  contrato_social: ContratoSocialStep,
  junta_comercial: JuntaComercialStep,
  cnpj: AtualizacaoCnpjStep,
  definicao_empresa: DefinicaoEmpresaStep,
  licenciamento: LicenciamentoStep,
  regime_tributario: RegimeTributarioStep,
  obrigacoes_fiscais: ObrigacoesFiscaisStep,
};
