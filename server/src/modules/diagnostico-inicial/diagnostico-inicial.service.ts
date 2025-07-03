import { Injectable } from '@nestjs/common';
import { CreateDiagnosticoInicialDto } from './dto/create-diagnostico-inicial.dto';
import { UpdateDiagnosticoInicialDto } from './dto/update-diagnostico-inicial.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DiagnosticoInicialService {
  constructor(
    private prisma: PrismaService,
    private readonly receitawsAPIService: ReceitawsApiService,
  ) {}

  create(createDiagnosticoInicialDto: CreateDiagnosticoInicialDto) {
    return this.prisma.diagnosticoInicial.create({
      data: {
        ...createDiagnosticoInicialDto,
        atividadePrincipal:
          createDiagnosticoInicialDto.atividadePrincipal as unknown as Prisma.InputJsonValue,
        atividadesSecundarias:
          createDiagnosticoInicialDto.atividadesSecundarias as unknown as Prisma.InputJsonValue,
      },
    });
  }

  findAll() {
    return this.prisma.diagnosticoInicial.findMany();
  }

  findOne(cnpj: string) {
    return this.receitawsAPIService.findOne(cnpj);
  }

  update(id: number, updateDiagnosticoInicialDto: UpdateDiagnosticoInicialDto) {
    return `This action updates a #${id} diagnosticoInicial`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosticoInicial`;
  }
}
