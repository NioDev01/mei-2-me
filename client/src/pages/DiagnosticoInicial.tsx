import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { NavBarMain } from "@/features/NavBarMain";

export function DiaInicial() {
  return (
    <div className="min-h-screen  p-6">
        <NavBarMain />
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">DIAGNÓSTICO INICIAL</h1>
          <p className=" mb-2">
            Quer fazer uma simulação para verificar se você está apto a se transformar em uma Microempresa?
          </p>
          <p className="">
            Preencha o formulário abaixo e saiba agora.
          </p>
        </div>

        {/* Form */}
        <div className=" p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CNPJ da empresa */}
            <div>
              <Label htmlFor="cnpj" className="">
                CNPJ da empresa *
              </Label>
              <Input
                id="cnpj"
                placeholder="Ex: 00.000.000/0001-00"
                className="mt-2 "
              />
            </div>

            {/* Quantidade de funcionários */}
            <div>
              <Label htmlFor="funcionarios" className="">
                Quantidade de funcionários na empresa *
              </Label>
              <Input
                id="funcionarios"
                placeholder="Ex: 10"
                className="mt-2 "
              />
            </div>

            {/* UF de registro */}
            <div>
              <Label htmlFor="uf" className="">
                UF de registro *
              </Label>
              <Input
                id="uf"
                placeholder="SP"
                className="mt-2 "
              />
            </div>

            {/* Município de registro */}
            <div>
              <Label htmlFor="municipio" className="">
                Município de registro *
              </Label>
              <Input
                id="municipio"
                placeholder="Campinas"
                className="mt-2 "
              />
            </div>

            {/* Quanto foi o faturamento de MEI */}
            <div>
              <Label htmlFor="faturamento-mei" className="">
                Quanto foi o faturamento de MEI nos últimos 12 meses? *
              </Label>
              <Input
                id="faturamento-mei"
                placeholder="Ex: R$ 20.000,00"
                className="mt-2 "
              />
            </div>

            {/* Quanto foi gasto em compras */}
            <div>
              <Label htmlFor="gasto-compras" className="">
                Quanto foi gasto em compras de mercadorias ou insumos nos últimos 12 meses? *
              </Label>
              <Input
                id="gasto-compras"
                placeholder="Ex: R$ 20.000,00"
                className="mt-2 "
              />
            </div>
          </div>

          {/* Radio Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Você paga um salário maior */}
            <div>
              <Label className=" mb-4 block">
                Você paga um salário maior do que o piso da categoria ou um salário mínimo para seu funcionário?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim1" id="sim1" />
                  <Label htmlFor="sim1" className="">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao1" id="nao1" />
                  <Label htmlFor="nao1" className="">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Você possui um sócio */}
            <div>
              <Label className=" mb-4 block">
                Você possui um sócio de sócios, administrador ou titular em uma empresa?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim2" id="sim2" />
                  <Label htmlFor="sim2" className="">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao2" id="nao2" />
                  <Label htmlFor="nao2" className="">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Fez importação de mercadorias */}
            <div>
              <Label className=" mb-4 block">
                Fez importação de mercadorias ou insumos para revenda?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim3" id="sim3" />
                  <Label htmlFor="sim3" className="">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao3" id="nao3" />
                  <Label htmlFor="nao3" className="">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Por quais motivos você considera fazer a migração */}
            <div>
              <Label className=" mb-4 block">
                Por quais motivos você considera fazer a migração?
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="faturamento-proximo" />
                  <Label htmlFor="faturamento-proximo" className=" text-sm">
                    Faturamento próximo ao limite
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="necessidade-contratar" />
                  <Label htmlFor="necessidade-contratar" className=" text-sm">
                    Necessidade de contratar mais funcionários
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="expansao-atividades" />
                  <Label htmlFor="expansao-atividades" className=" text-sm">
                    Expansão de atividades
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="experiencia-clientes" />
                  <Label htmlFor="experiencia-clientes" className=" text-sm">
                    Experiência de clientes / fornecedores
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="acesso-credito" />
                  <Label htmlFor="acesso-credito" className=" text-sm">
                    Acesso a crédito
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="outros" />
                  <Label htmlFor="outros" className=" text-sm">
                    Outros (especificar)
                  </Label>
                </div>
              </div>
            </div>

            {/* Você precisa entrar fiscais */}
            <div>
              <Label className=" mb-4 block">
                Você precisa entrar fiscais para pessoas jurídicas (outras empresas)?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim4" id="sim4" />
                  <Label htmlFor="sim4" className="">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao4" id="nao4" />
                  <Label htmlFor="nao4" className="">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Textarea */}
          <div className="mt-8">
            <Label htmlFor="possibilidades" className="">
              Ex: Possibilidades de ter sócios
            </Label>
            <Textarea
              id="possibilidades"
              className="mt-2  min-h-[100px]"
              placeholder=""
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button className="w-full  py-3 text-lg">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


