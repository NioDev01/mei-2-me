import {
  BadGatewayException,
  BadRequestException,
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
      const mei = await tx.mei.upsert({
        where: { cnpj_mei: data.cnpj_mei },
        update: data,
        create: data,
      });

      const ower = await tx.usuario.findFirst({
        where: { id_mei: mei.id_mei },
      });

      if (ower && ower.id_user !== user.id_user) {
        throw new UnauthorizedException('CNPJ já vinculado');
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

  async findCnpjData(cnpj: string) {
    const normalizedCnpj = cnpj.replace(/\D/g, '');

    if (!/^\d{14}$/.test(normalizedCnpj)) {
      throw new BadRequestException('CNPJ inválido.');
    }

    try {
      const apiData = await this.receitawsAPIService.findOne(normalizedCnpj);

      if (!apiData || apiData.status === 'ERROR') {
        throw new NotFoundException(`CNPJ ${cnpj} não encontrado ou inválido.`);
      }

      return {
        razao_social: apiData.nome,
        nome_fantasia: apiData.fantasia,
        uf: apiData.uf,
        municipio: apiData.municipio,
      };
    } catch (err) {
      console.error(`Erro ao consultar ReceitaWs: ${err}`);

      throw new BadGatewayException('Erro ao consultar serviço externo');
    }
  }

  async findByUser(userId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id_user: userId },
      include: {
        mei: {
          include: {
            diagnostico: true,
          },
        },
      },
    });

    if (!usuario?.mei) return null;

    const { mei } = usuario;

    return {
      mei: {
        razao_social: mei.razao_social,
        nome_fantasia: mei.nome_fantasia,
        cnpj_mei: mei.cnpj_mei,
        municipio_mei: mei.municipio_mei,
        uf_mei: mei.uf_mei,
        qtd_funcionario: mei.qtd_funcionario,
        faturamento_12m: Number(mei.faturamento_12m),
        compras_12m: Number(mei.compras_12m),
      },
      analise: mei.diagnostico
        ? {
            status: mei.diagnostico.resultado_diag.includes('deve realizar')
              ? 'APTO'
              : 'NÃO APTO',
            analise: mei.diagnostico.resultado_diag,
            motivos: mei.diagnostico.motivos_resultado,
          }
        : null,
    };
  }
}
