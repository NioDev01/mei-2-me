import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticoInicialTreinamentoDto } from './create-diagnostico-inicial-treinamento.dto';

export class UpdateDiagnosticoInicialTreinamentoDto extends PartialType(CreateDiagnosticoInicialTreinamentoDto) {}
