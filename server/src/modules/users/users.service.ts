import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ReceitawsApiService } from 'src/integrations/receitaws-api/receitaws-api.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private receitaWsApi: ReceitawsApiService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const saltOrRounds = 10;
    const password = createUserDto.senha_user;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    let apiData: any;

    // Consulta API ReceitaWs se tiver CNPJ
    if (createUserDto.cnpj_user) {
      try {
        apiData = await this.receitaWsApi.findOne(createUserDto.cnpj_user);
      } catch (error) {
        console.error(
          `Erro ao consultar a API da ReceitaWs para CNPJ ${createUserDto.cnpj_user}: `,
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
          `CNPJ ${createUserDto.cnpj_user} não encontrado ou inválido. ${
            apiData?.message || ''
          }`,
        );
      }
    }

    // Verifica se o e-mail já existe
    if (createUserDto.email_user) {
      const exists = await this.prisma.usuario.findUnique({
        where: { email_user: createUserDto.email_user },
      });
      if (exists) throw new BadRequestException('E-mail já cadastrado.');
    }

    // Verifica se o CNPJ já existe
    if (createUserDto.cnpj_user) {
      const exists = await this.prisma.usuario.findUnique({
        where: { cnpj_user: createUserDto.cnpj_user },
      });
      if (exists) throw new BadRequestException('CNPJ já cadastrado.');
    }

    // Verifica se já existe um registro do MEI no banco de dados
    const meiExists = await this.prisma.mei.findUnique({
      where: { cnpj_mei: createUserDto.cnpj_user },
    });

    // Formata o campo de data de abetura recebido da API
    const [day, month, year] = apiData.abertura.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

    // Se existir registro na base de dados, os dados do usuário são cadastrados e relacionados ao MEI
    if (meiExists) {
      return this.prisma.usuario.create({
        data: {
          nome_user: createUserDto.nome_user,
          email_user: createUserDto.email_user,
          celular_user: createUserDto.celular_user,
          cnpj_user: createUserDto.cnpj_user,
          senha_user: hashPassword,
          mei: { connect: { id_mei: createUserDto.id_mei } },
        },
      });
    } else {
      // Se não existir registro na base de dados, todos os dados são cadastrados, incluindo dados de MEI
      return this.prisma.usuario.create({
        data: {
          nome_user: createUserDto.nome_user,
          email_user: createUserDto.email_user,
          celular_user: createUserDto.celular_user,
          cnpj_user: createUserDto.cnpj_user,
          senha_user: hashPassword,
          mei: {
            create: {
              cnpj_mei: apiData.cnpj.replace(/\D/g, ''),
              razao_social: apiData.nome,
              nome_fantasia: apiData.fantasia || '',
              data_abertura: formattedDate,
              uf_mei: apiData.uf,
              municipio_mei: apiData.municipio,
              natureza_juridica: apiData.natureza_juridica,
              cnae_principal: JSON.parse(
                JSON.stringify(apiData.atividade_principal),
              ),
              cnae_secundario: JSON.parse(
                JSON.stringify(apiData.atividades_secundarias),
              ),
              possui_filial: false,
              qtd_funcionario: 0,
              paga_acima_piso: false,
              participa_outra_empresa: false,
              faturamento_12m: 0,
              compras_12m: 0,
              exporta_acima_limite: false,
              importacao_direta: false,
            },
          },
        },
        include: { mei: true },
      });
    }
  }

  findOne(cnpj: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { cnpj_user: cnpj },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: { id_user: id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id_user: id },
    });
  }
}
