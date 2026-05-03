import { DesenquadramentoStep } from "./DesenquadramentoStep";
import { DefinicaoEmpresaStep } from "./DefinicaoEmpresaStep";
import { AtoConstitutivoStep } from "./AtoConstitutivoStep";
import { JuntaComercialStep } from "./JuntaComercialStep";
import { AtualizacaoCnpjStep } from "./AtualizacaoCnpjStep";
import { LicenciamentoStep } from "./LicenciamentoStep";
import { RegimeTributarioStep } from "./RegimeTributarioStep";
import { ObrigacoesFiscaisStep } from "./ObrigacoesFiscaisStep";

export const stepComponentMap: Record<string, any> = {
  desenquadramento: DesenquadramentoStep,
  definicao_empresa: DefinicaoEmpresaStep,
  ato_constitutivo: AtoConstitutivoStep,
  junta_comercial: JuntaComercialStep,
  cnpj: AtualizacaoCnpjStep,
  licenciamento: LicenciamentoStep,
  regime_tributario: RegimeTributarioStep,
  obrigacoes_fiscais: ObrigacoesFiscaisStep,
};
