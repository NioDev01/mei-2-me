import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSimuladorRegimeDto } from './dto/create-simulador-regime.dto';
import { UpdateSimuladorRegimeDto } from './dto/update-simulador-regime.dto';

@Injectable()
export class SimuladorRegimesService {
  create(createSimuladorRegimeDto: CreateSimuladorRegimeDto) {
    return 'This action adds a new simuladorRegime';
  }

  findAll() {
    return `This action returns all simuladorRegimes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} simuladorRegime`;
  }

  update(id: number, updateSimuladorRegimeDto: UpdateSimuladorRegimeDto) {
    return `This action updates a #${id} simuladorRegime`;
  }

  remove(id: number) {
    return `This action removes a #${id} simuladorRegime`;
  }
}
