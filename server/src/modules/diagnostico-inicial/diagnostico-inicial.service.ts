import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiagnosticoInicialDto } from './dto/create-diagnostico-inicial.dto';
import { UpdateDiagnosticoInicialDto } from './dto/update-diagnostico-inicial.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';
import { AnaliseMigracaoService } from '../analise-migracao/analise-migracao.service';

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
    private readonly analiseService: AnaliseMigracaoService,
  ) {}

  async create(createDiagnosticoInicialDto: CreateDiagnosticoInicialDto) {
    const { cnpj_mei, ...dadosManuais } = createDiagnosticoInicialDto;

    let apiData: ReceitaWsApiData;

    try {
      apiData = await this.receitawsAPIService.findOne(cnpj_mei);
    } catch (error) {
      Logger.error(
        `Erro ao consultar a API da ReceitaWs para CNPJ ${cnpj_mei}: `,
        error,
      );

      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Falha ao consultar a API da ReceitaWs: ${error.message}`,
        );
      } else {
        throw new InternalServerErrorException(
          `Falha desconhecida ao consultar a API da ReceitaWs`,
        );
      }
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

    // Verifica se já existe MEI cadastrado
    try {
      let mei = await this.prisma.mei.findUnique({
        where: { cnpj_mei: data.cnpj_mei },
      });

      if (mei) {
        await this.prisma.mei.update({
          where: { cnpj_mei: data.cnpj_mei },
          data: dadosManuais,
        });
      } else {
        mei = await this.prisma.mei.create({ data: data });
      }

      const resultadoAnalise =
        await this.analiseService.analisarMigracao(cnpj_mei);

      const diagnostico = await this.prisma.diagnostico.upsert({
        where: { id_mei: mei.id_mei },
        update: {
          resultado_diag: resultadoAnalise.analise,
          motivos_resultado: resultadoAnalise.motivos || [],
          atualizado_em: new Date(),
        },
        create: {
          id_mei: mei.id_mei,
          resultado_diag: resultadoAnalise.analise,
          motivos_resultado: resultadoAnalise.motivos || [],
          atualizado_em: new Date(),
        },
      });

      return {
        mesage: 'Diagnóstico salvo com sucesso!',
        dados: diagnostico,
        analise: resultadoAnalise,
      };
    } catch (error: unknown) {
      Logger.error(
        `Erro ao salvar os dados no banco de dados ${cnpj_mei}: `,
        error,
      );
      throw new InternalServerErrorException(
        `Erro ao salvar os dados do usuário no banco de dados.`,
      );
    }
  }

  findOne(cnpj: string) {
    return this.prisma.mei.findUnique({
      where: { cnpj_mei: cnpj },
    });
  }
}
