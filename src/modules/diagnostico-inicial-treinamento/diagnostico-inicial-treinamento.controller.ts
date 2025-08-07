import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticoInicialTreinamentoService } from './diagnostico-inicial-treinamento.service';
import { CreateDiagnosticoInicialTreinamentoDto } from './dto/create-diagnostico-inicial-treinamento.dto';
import { UpdateDiagnosticoInicialTreinamentoDto } from './dto/update-diagnostico-inicial-treinamento.dto';

@Controller('diagnostico-inicial-treinamento')
export class DiagnosticoInicialTreinamentoController {
  constructor(private readonly diagnosticoInicialTreinamentoService: DiagnosticoInicialTreinamentoService) {}

  @Post()
  create(@Body() createDiagnosticoInicialTreinamentoDto: CreateDiagnosticoInicialTreinamentoDto) {
    return this.diagnosticoInicialTreinamentoService.create(createDiagnosticoInicialTreinamentoDto);
  }

  @Get()
  findAll() {
    return this.diagnosticoInicialTreinamentoService.findAll();
  }

  @Get(':cnpj')
  async findOne(@Param('cnpj') cnpj: string) {
	  const data = await this.diagnosticoInicialTreinamentoService.findOne(cnpj);
    
    return {
      cnpj: data.cnpj,
      razaoSocial: data.nome,
      nomeFantasia: data.fantasia,
      municipio: data.municipio,
      uf: data.uf,
      dataAbertura: data.abertura,
      atividadePrincipal: data.atividade_principal,
      atividadesSecundarias: data.atividades_secundarias,
      naturezaJuridica: data.natureza_juridica,
    };
  }
  }

  @Patch(':id')
claration expected.ts(1146)  update(@Param('id') id: string, @Body() updateDiagnosticoInicialTreinamentoDto: UpdateDiagnosticoInicialTreinamentoDto) {
    return this.diagnosticoInicialTreinamentoService.update(+id, updateDiagnosticoInicialTreinamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticoInicialTreinamentoService.remove(+id);
  }
}
