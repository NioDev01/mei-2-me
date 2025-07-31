import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { NavBarMain } from "@/features/NavBarMain";

export default function DiaInicial() {
  const [formData, setFormData] = useState({
    cnpj: '',
    uf: 'SP',
    municipio: 'São Paulo',
    qtdFuncionarios: '',
    faturamento: '',
    gastos: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (['qtdFuncionarios', 'faturamento', 'gastos'].includes(name)) {
      const onlyNums = value.replace(/\D/g, '')
      setFormData(prev => ({ ...prev, [name]: onlyNums }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    let formattedValue = rawValue

    if (rawValue.length > 2) {
      formattedValue = rawValue.slice(0, 2) + '.' + rawValue.slice(2)
    }
    if (rawValue.length > 5) {
      formattedValue =
        formattedValue.slice(0, 6) + '.' + rawValue.slice(5)
    }
    if (rawValue.length > 8) {
      formattedValue =
        formattedValue.slice(0, 10) + '/' + rawValue.slice(8)
    }
    if (rawValue.length > 12) {
      formattedValue =
        formattedValue.slice(0, 15) + '-' + rawValue.slice(12, 14)
    }

    setFormData(prev => ({ ...prev, cnpj: formattedValue }))
  }

  const validateForm = () => {
    if (!formData.uf || formData.uf.length !== 2) {
      alert('UF inválido.')
      return false
    }

    if (!formData.municipio) {
      alert('Município não pode estar vazio.')
      return false
    }

    if (!/^\d+$/.test(formData.qtdFuncionarios)) {
      alert('Quantidade de funcionários deve conter apenas números.')
      return false
    }

    if (!/^\d+$/.test(formData.faturamento)) {
      alert('Faturamento deve conter apenas números.')
      return false
    }

    if (!/^\d+$/.test(formData.gastos)) {
      alert('Gastos devem conter apenas números.')
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert('Formulário válido!')
      console.log(formData)
      // Aqui você pode enviar os dados para API, salvar localmente etc.
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleCnpjChange}
          placeholder="00.000.000/0001-00"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="uf">UF</Label>
        <Input
          id="uf"
          name="uf"
          value={formData.uf}
          readOnly
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="municipio">Município</Label>
        <Input
          id="municipio"
          name="municipio"
          value={formData.municipio}
          readOnly
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="qtdFuncionarios">Qtd de Funcionários</Label>
        <Input
          id="qtdFuncionarios"
          name="qtdFuncionarios"
          value={formData.qtdFuncionarios}
          onChange={handleChange}
          placeholder="Ex: 10"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="faturamento">Faturamento</Label>
        <Input
          id="faturamento"
          name="faturamento"
          value={formData.faturamento}
          onChange={handleChange}
          placeholder="Ex: 20000"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="gastos">Gastos</Label>
        <Input
          id="gastos"
          name="gastos"
          value={formData.gastos}
          onChange={handleChange}
          placeholder="Ex: 5000"
          className="mt-2"
        />
      </div>

      <Button type="submit" className="mt-4">
        Enviar
      </Button>
    </form>
  )
}
