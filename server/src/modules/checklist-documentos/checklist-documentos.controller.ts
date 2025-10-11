import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ChecklistDocumentosService } from './checklist-documentos.service';
import { CreateChecklistDocumentoDto } from './dto/create-checklist-documento.dto';
import { UpdateChecklistDocumentoDto } from './dto/update-checklist-documento.dto';

@Controller('checklist-documentos')
export class ChecklistDocumentosController {
  constructor(
    private readonly checklistDocumentosService: ChecklistDocumentosService,
  ) {}

  @Post()
  create(@Body() createChecklistDocumentoDto: CreateChecklistDocumentoDto) {
    return this.checklistDocumentosService.create(createChecklistDocumentoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistDocumentosService.findOne(+id);
  }

  @Patch(':id')
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
