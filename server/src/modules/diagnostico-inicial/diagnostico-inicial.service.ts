import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiagnosticoInicialDto } from './dto/create-diagnostico-inicial.dto';
import { UpdateDiagnosticoInicialDto } from './dto/update-diagnostico-inicial.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';

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
  ) {}

  async create(createDiagnosticoInicialDto: CreateDiagnosticoInicialDto) {
    const { cnpj_mei, ...dadosManuais } = createDiagnosticoInicialDto;

    let apiData: ReceitaWsApiData;

    try {
      apiData = await this.receitawsAPIService.findOne(cnpj_mei);
    } catch (error) {
      console.error(
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

    try {
      console.log('Dados salvos com suceso!');
      return this.prisma.mei.create({
        data: data,
      });
    } catch (error: unknown) {
      console.error(
        `Erro ao salvar os dados no banco de dados ${cnpj_mei}: `,
        error,
      );
      throw new InternalServerErrorException(
        `Erro ao salvar os dados do usuário no banco de dados.`,
      );
    }
  }

  findAll() {
    return this.prisma.mei.findMany();
  }

  findOne(cnpj: string) {
    return this.prisma.mei.findUnique({
      where: { cnpj_mei: cnpj },
    });
  }

  update(id: number, updateDiagnosticoInicialDto: UpdateDiagnosticoInicialDto) {
    return `This action updates a #${id} diagnosticoInicial`;
  }

  remove(id: number) {
    return this.prisma.mei.delete({
      where: { id_mei: id },
    });
  }
}
