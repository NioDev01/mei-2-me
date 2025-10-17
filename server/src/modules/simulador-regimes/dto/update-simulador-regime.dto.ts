import { PartialType } from '@nestjs/swagger';
import { CreateSimuladorRegimeDto } from './create-simulador-regime.dto';

export class UpdateSimuladorRegimeDto extends PartialType(
  CreateSimuladorRegimeDto,
) {}
