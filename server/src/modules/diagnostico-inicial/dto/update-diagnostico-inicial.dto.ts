import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticoInicialDto } from './create-diagnostico-inicial.dto';

export class UpdateDiagnosticoInicialDto extends PartialType(CreateDiagnosticoInicialDto) {}
