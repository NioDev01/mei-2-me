  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { Checkbox } from '@/components/ui/checkbox'
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
  import { Textarea } from '@/components/ui/textarea'
  import { useState } from 'react'
  import { NavBarMain } from "@/features/NavBarMain";



  export function DiaInicial() {
  const [formData, setFormData] = useState({
    cnpj: '',
    uf: '',
    municipio: '',
    qtdFuncionarios: '',
    faturamento: '',
    gastos: '',
    possibilidades: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (['qtdFuncionarios', 'faturamento', 'gastos'].includes(name)) {
      const onlyNums = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyNums }));
    } else if (name === 'cnpj') {
      setFormData(prev => ({ ...prev, [name]: formatCNPJ(value) }));
    } else if (['uf', 'municipio'].includes(name)) {
      const onlyLetters = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyLetters }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.uf || formData.uf.length !== 2 || !/^[a-zA-Z]+$/.test(formData.uf)) {
      alert('UF inválido. Deve conter apenas letras e ter 2 caracteres.');
      return false;
    }

    if (!formData.municipio || !/^[a-zA-Z\\s]+$/.test(formData.municipio)) {
      alert('Município não pode estar vazio e deve conter apenas letras.');
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

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (validateForm()) {
        alert('Formulário válido!')
        // continue com envio ou processamento
      }
    }

    const formatCNPJ = (value: string) => {
      const digits = value.replace(/\D/g, '').slice(0, 14);
      return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    };

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
                  name="cnpj"
                  placeholder="Ex: 00.000.000/0001-00"
                  className="mt-2"
                  value={formData.cnpj}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="qtdFuncionarios">Quantidade de funcionários na empresa *</Label>
                <Input
                  id="qtdFuncionarios"
                  name="qtdFuncionarios"
                  placeholder="Ex: 10"
                  className="mt-2"
                  value={formData.qtdFuncionarios}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="uf">UF de registro *</Label>
                <Input
                  id="uf"
                  name="uf"
                  placeholder="SP"
                  className="mt-2"
                  value={formData.uf}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="municipio">Município de registro *</Label>
                <Input
                  id="municipio"
                  name="municipio"
                  placeholder="Campinas"
                  className="mt-2"
                  value={formData.municipio}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="faturament" >Quanto foi o faturamento de MEI nos últimos 12 meses? *</Label>
                <Input
                  id="faturamento"
                  name="faturamento"
                  placeholder="Ex: R$ 20.000,00"
                  className="mt-5.5"
                  value={formData.faturamento}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="gastos">Quanto foi gasto em compras de mercadorias ou insumos nos últimos 12 meses? *</Label>
                <Input
                  id="gastos"
                  name="gastos"
                  placeholder="Ex: R$ 20.000,00"
                  className="mt-2"
                  value={formData.gastos}
                  onChange={handleChange}
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
                <Label className="mb-4 block">
                  Você precisa entrar fiscais para pessoas jurídicas (outras empresas)?
                </Label>
                <RadioGroup className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim4" id="sim4" />
                    <Label htmlFor="sim4">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <RadioGroupItem value="nao4" id="nao4" />
                    <Label htmlFor="nao4">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

              <div className="mt-8">
                <Label className="mb-4 block ">
                  Por quais motivos você considera fazer a migração?
                  </Label>
                <RadioGroup className="space-y-3">
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
                </RadioGroup>
              </div>


            <div className="mt-8">
              <Label htmlFor="possibilidades">Ex: Possibilidades de ter sócios</Label>
              <Textarea
                id="possibilidades"
                name="possibilidades"
                className="mt-2 min-h-[100px]"
                placeholder=""
                value={formData.possibilidades || ''}
                onChange={handleChange}
              />
            </div>

            <div className="mt-8">
              <Button className="w-full py-3 text-lg" onClick={handleSubmit}>Enviar</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }


