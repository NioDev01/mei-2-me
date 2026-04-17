import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AnaliseMigracaoService } from './analise-migracao.service';

@Injectable()
export class AnaliseMigracaoUseCase {
  constructor(
    private prisma: PrismaService,
    private analiseService: AnaliseMigracaoService,
  ) {}

  async execute(cnpj: string, userId: number) {
    const mei = await this.prisma.mei.findFirst({
      where: {
        cnpj_mei: cnpj.replace(/\D/g, ''),
        usuarios: { id_user: userId },
      },
    });

    if (!mei) {
      throw new UnauthorizedException(
        'CNPJ não pertence ao usuário ou não encontrado',
      );
    }

    const cnaes = await this.prisma.cnae.findMany({
      select: { cnae: true },
    });

    const listaCnaes = cnaes.map((c) => c.cnae);

    const resultado = this.analiseService.analisar(mei, listaCnaes);

    return {
      cnpj: mei.cnpj_mei,
      razaoSocial: mei.razao_social,
      ...resultado,
    };
  }
}
