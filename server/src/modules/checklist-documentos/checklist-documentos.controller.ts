import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ChecklistDocumentosService } from './checklist-documentos.service';
import { CreateChecklistDocumentoDto } from './dto/create-checklist-documento.dto';
import { UpdateChecklistDocumentoDto } from './dto/update-checklist-documento.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('checklist-documentos')
@ApiTags('Checklist de Documentos', 'Rota do checklist de documentos')
export class ChecklistDocumentosController {
  constructor(
    private readonly checklistDocumentosService: ChecklistDocumentosService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Cria checklist de documentos',
    description:
      'Endpoint responsável por criar dados de checklist de documento do usuário.',
  })
  @ApiResponse({
    status: 201,
    description: 'Checklist de documentos criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar criar o checklist de documentos.',
  })
  create(@Body() createChecklistDocumentoDto: CreateChecklistDocumentoDto) {
    return this.checklistDocumentosService.create(createChecklistDocumentoDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca dados de checklist de documentos',
    description:
      'Endpoint responsável por buscar dados de checklist de documento do usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados retornados com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar buscar dados do usuário.',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao tentar encontrar diagnóstico.',
  })
  findOne(@Param('id') id: string) {
    return this.checklistDocumentosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza dados de checklist de documentos',
    description:
      'Endpoint responsável por atualizar dados de checklist de documento do usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados atualizados com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu um erro ao tentar atualizar dados do usuário.',
  })
  update(
    @Param('id') id: number,
    @Body() updateChecklistDocumentoDto: UpdateChecklistDocumentoDto,
  ) {
    return this.checklistDocumentosService.update(
      +id,
      updateChecklistDocumentoDto,
    );
  }
}
