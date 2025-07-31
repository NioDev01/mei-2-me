import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { NavBarMain } from "@/features/NavBarMain";

export function DiaInicial() {
  const [cnpj, setCnpj] = useState('');
  const [funcionarios, setFuncionarios] = useState('');
  const [faturamentoMei, setFaturamentoMei] = useState('');
  const [gastoCompras, setGastoCompras] = useState('');
  
const [formData, setFormData] = useState({
  cnpj: '',
  uf: 'SP',
  municipio: 'São Paulo',
  qtdFuncionarios: '',
  faturamento: '',
  gastos: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (['qtdFuncionarios', 'faturamento', 'gastos'].includes(name)) {
    const onlyNums = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [name]: onlyNums }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

const validateForm = () => {
  if (!formData.uf || formData.uf.length !== 2) {
    alert('UF inválido.');
    return false;
  }

  if (!formData.municipio) {
    alert('Município não pode estar vazio.');
    return false;
  }

  if (!/^\d+$/.test(formData.qtdFuncionarios)) {
    alert('Quantidade de funcionários deve conter apenas números.');
    return false;
  }

  if (!/^\d+$/.test(formData.faturamento)) {
    alert('Faturamento deve conter apenas números.');
    return false;
  }

  if (!/^\d+$/.test(formData.gastos)) {
    alert('Gastos devem conter apenas números.');
    return false;
  }

  return true;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    alert('Formulário válido!');
    // continue com envio ou processamento
  }
};

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCnpj(formatCNPJ(value));
  };

  const handleOnlyNumbers = (setValue: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numbersOnly = e.target.value.replace(/\D/g, '');
      setValue(numbersOnly);
    };
<Input
  name="uf"
  value={formData.uf}
  readOnly
  onChange={handleChange}
/>

<Input
  name="municipio"
  value={formData.municipio}
  readOnly
  onChange={handleChange}
/>

<Input
  name="qtdFuncionarios"
  value={formData.qtdFuncionarios}
  onChange={handleChange}
/>

<Input
  name="faturamento"
  value={formData.faturamento}
  onChange={handleChange}
/>

<Input
  name="gastos"
  value={formData.gastos}
  onChange={handleChange}
/>

  return (
    <div className="min-h-screen p-6">
      <NavBarMain />
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">DIAGNÓSTICO INICIAL</h1>
          <p className="mb-2">
            Quer fazer uma simulação para verificar se você está apto a se transformar em uma Microempresa?
          </p>
          <p>
            Preencha o formulário abaixo e saiba agora.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cnpj">CNPJ da empresa *</Label>
              <Input
                id="cnpj"
                placeholder="Ex: 00.000.000/0001-00"
                className="mt-2"
                value={cnpj}
                onChange={handleCnpjChange}
              />
            </div>

            <div>
              <Label htmlFor="funcionarios">Quantidade de funcionários na empresa *</Label>
              <Input
                id="funcionarios"
                placeholder="Ex: 10"
                className="mt-2"
                value={funcionarios}
                onChange={handleOnlyNumbers(setFuncionarios)}
              />
            </div>

            <div>
              <Label htmlFor="uf">UF de registro *</Label>
              <Input id="uf" placeholder="SP" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="municipio">Município de registro *</Label>
              <Input id="municipio" placeholder="Campinas" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="faturamento-mei">Quanto foi o faturamento de MEI nos últimos 12 meses? *</Label>
              <Input
                id="faturamento-mei"
                placeholder="Ex: R$ 20.000,00"
                className="mt-2"
                value={faturamentoMei}
                onChange={handleOnlyNumbers(setFaturamentoMei)}
              />
            </div>

            <div>
              <Label htmlFor="gasto-compras">Quanto foi gasto em compras de mercadorias ou insumos nos últimos 12 meses? *</Label>
              <Input
                id="gasto-compras"
                placeholder="Ex: R$ 20.000,00"
                className="mt-2"
                value={gastoCompras}
                onChange={handleOnlyNumbers(setGastoCompras)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <Label className="mb-4 block">
                Você paga um salário maior do que o piso da categoria ou um salário mínimo para seu funcionário?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim1" id="sim1" />
                  <Label htmlFor="sim1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao1" id="nao1" />
                  <Label htmlFor="nao1">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-4 block">
                Você possui um sócio de sócios, administrador ou titular em uma empresa?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim2" id="sim2" />
                  <Label htmlFor="sim2">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao2" id="nao2" />
                  <Label htmlFor="nao2">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-4 block">
                Fez importação de mercadorias ou insumos para revenda?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim3" id="sim3" />
                  <Label htmlFor="sim3">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao3" id="nao3" />
                  <Label htmlFor="nao3">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-4 block">Por quais motivos você considera fazer a migração?</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="faturamento-proximo" />
                  <Label htmlFor="faturamento-proximo" className="text-sm">Faturamento próximo ao limite</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="necessidade-contratar" />
                  <Label htmlFor="necessidade-contratar" className="text-sm">Necessidade de contratar mais funcionários</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="expansao-atividades" />
                  <Label htmlFor="expansao-atividades" className="text-sm">Expansão de atividades</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="experiencia-clientes" />
                  <Label htmlFor="experiencia-clientes" className="text-sm">Experiência de clientes / fornecedores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="acesso-credito" />
                  <Label htmlFor="acesso-credito" className="text-sm">Acesso a crédito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="outros" />
                  <Label htmlFor="outros" className="text-sm">Outros (especificar)</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-4 block">
                Você precisa entrar fiscais para pessoas jurídicas (outras empresas)?
              </Label>
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim4" id="sim4" />
                  <Label htmlFor="sim4">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao4" id="nao4" />
                  <Label htmlFor="nao4">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="mt-8">
            <Label htmlFor="possibilidades">Ex: Possibilidades de ter sócios</Label>
            <Textarea id="possibilidades" className="mt-2 min-h-[100px]" placeholder="" />
          </div>

          <div className="mt-8">
            <Button className="w-full py-3 text-lg">Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
