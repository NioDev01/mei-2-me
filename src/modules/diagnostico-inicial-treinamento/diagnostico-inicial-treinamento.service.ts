import { Injectable } from '@nestjs/common';
import { CreateDiagnosticoInicialTreinamentoDto } from './dto/create-diagnostico-inicial-treinamento.dto';
import { UpdateDiagnosticoInicialTreinamentoDto } from './dto/update-diagnostico-inicial-treinamento.dto';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DiagnosticoInicialTreinamentoService {
	constructor(
    private prisma: PrismaService,
    private readonly receitawsApiService: ReceitawsApiService,
  ) {}

  create(createDiagnosticoInicialTreinamentoDto: CreateDiagnosticoInicialTreinamentoDto) {
    return this.prisma.DiagnosticoInicialTreinamento.create({
      data: {
        ...createDiagnosticoInicialTreinamentoDto,
        atividadePrincipal:
          createDiagnosticoInicialTreinamentoDto.atividadePrincipal as unknown as Prisma.InputJsonValue,
        atividadesSecundarias:
          createDiagnosticoInicialTreinamentoDto.atividadesSecundarias as unknown as Prisma.InputJsonValue,
      },
    });
  }

  findAll() {
    return this.prisma.DiagnosticoInicialTreinamento.findMany();
  }

  findOne(cnpj: string) {
    return this.receitawsApiService.findOne(cnpj);
  }

  update(id: number, updateDiagnosticoInicialTreinamentoDto: UpdateDiagnosticoInicialTreinamentoDto) {
    return `This action updates a #${id} diagnosticoInicialTreinamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosticoInicialTreinamento`;
  }
}
