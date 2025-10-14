import { PartialType } from '@nestjs/swagger';
import { CreateChecklistDocumentoDto } from './create-checklist-documento.dto';

export class UpdateChecklistDocumentoDto extends PartialType(CreateChecklistDocumentoDto) {}
