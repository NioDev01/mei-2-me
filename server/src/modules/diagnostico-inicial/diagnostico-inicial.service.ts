import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDiagnosticoInicialDto } from '@/modules/diagnostico-inicial/dto/create-diagnostico-inicial.dto';
import { PrismaService } from '@prisma/prisma.service';
import { ReceitawsApiService } from '@/integrations/receitaws-api/receitaws-api.service';
import { AnaliseMigracaoUseCase } from '@/modules/analise-migracao/analise-migracao.usecase';

interface AtividadeDto {
  code: string;
  text: string;
}

interface ReceitaWsApiData {
  cnpj: string;
  nome: string;
  fantasia?: string;
  abertura: string;
  uf: string;
  municipio: string;
  natureza_juridica: string;
  atividade_principal: AtividadeDto[];
  atividades_secundarias: AtividadeDto[];
  status?: string;
  message?: string;
}

@Injectable()
export class DiagnosticoInicialService {
  constructor(
    private prisma: PrismaService,
    private readonly receitawsAPIService: ReceitawsApiService,
    private readonly analiseUseCase: AnaliseMigracaoUseCase,
  ) {}

  async create(
    createDiagnosticoInicialDto: CreateDiagnosticoInicialDto,
    user: { id_user: number },
  ) {
    if (!user.id_user) {
      throw new UnauthorizedException('Usuário precisa estar autenticado');
    }

    const { cnpj_mei, ...dadosManuais } = createDiagnosticoInicialDto;

    const userEntity = await this.prisma.usuario.findUnique({
      where: { id_user: user.id_user },
      include: { mei: true },
    });

    if (!userEntity) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    let apiData: ReceitaWsApiData;

    try {
      apiData = await this.receitawsAPIService.findOne(cnpj_mei);
    } catch (error) {
      Logger.error(
        `Erro ao consultar a API da ReceitaWs para CNPJ ${cnpj_mei}: `,
        error,
      );

      throw new InternalServerErrorException(
        'Falha ao consultar a API da ReceitaWs',
      );
    }

    if (!apiData || apiData.status === 'ERROR') {
      throw new NotFoundException(
        `CNPJ ${cnpj_mei} não encontrado ou inválido. ${apiData?.message || ''}`,
      );
    }

    // Formata o campo de data de abetura recebido da API
    const [day, month, year] = apiData.abertura.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

    const data = {
      ...dadosManuais,
      cnpj_mei: apiData.cnpj.replace(/\D/g, ''),
      razao_social: apiData.nome,
      nome_fantasia: apiData.fantasia || '',
      data_abertura: formattedDate,
      uf_mei: apiData.uf,
      municipio_mei: apiData.municipio,
      natureza_juridica: apiData.natureza_juridica,

      cnae_principal: JSON.parse(JSON.stringify(apiData.atividade_principal)),
      cnae_secundario: JSON.parse(
        JSON.stringify(apiData.atividades_secundarias),
      ),
    };

    const mei = await this.prisma.$transaction(async (tx) => {
      let mei = await tx.mei.findUnique({
        where: { cnpj_mei: data.cnpj_mei },
      });

      if (mei) {
        const owner = await tx.usuario.findFirst({
          where: { id_mei: mei.id_mei },
        });

        if (owner && owner.id_user !== user.id_user) {
          throw new UnauthorizedException('CNPJ já vinculado');
        }

        mei = await tx.mei.update({
          where: { id_mei: mei.id_mei },
          data,
        });
      } else {
        mei = await tx.mei.create({ data });
      }

      await tx.usuario.update({
        where: { id_user: user.id_user },
        data: { id_mei: mei.id_mei },
      });

      return mei;
    });

    const resultadoAnalise = await this.analiseUseCase.execute(
      mei.cnpj_mei,
      user.id_user,
    );

    await this.prisma.diagnostico.upsert({
      where: { id_mei: mei.id_mei },
      update: {
        resultado_diag: resultadoAnalise.analise,
        motivos_resultado: resultadoAnalise.motivos,
      },
      create: {
        id_mei: mei.id_mei,
        resultado_diag: resultadoAnalise.analise,
        motivos_resultado: resultadoAnalise.motivos,
      },
    });

    return {
      message: 'Diagnóstico realizado com sucesso!',
      analise: resultadoAnalise,
    };
  }

  async findOne(cnpj: string, userId: number) {
    return this.analiseUseCase.execute(cnpj, userId);
  }
}
