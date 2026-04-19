import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChecklistDocumentosService } from './checklist-documentos.service';
import { CreateChecklistDocumentoDto } from './dto/create-checklist-documento.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('checklist-documentos')
@ApiTags('Checklist de Documentos')
export class ChecklistDocumentosController {
  constructor(
    private readonly checklistDocumentosService: ChecklistDocumentosService,
  ) {}

  @UseGuards(JwtAuthGuard)
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
  create(
    @Request() req,
    @Body() createChecklistDocumentoDto: CreateChecklistDocumentoDto,
  ) {
    return this.checklistDocumentosService.create(
      req.user.id_user,
      createChecklistDocumentoDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
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
    description: 'Erro ao tentar encontrar checklist de documentos.',
  })
  findMe(@Request() req) {
    return this.checklistDocumentosService.findOne(req.user.id_user);
  }
}
