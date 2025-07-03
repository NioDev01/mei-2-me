import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface AtividadePrincipal {
  code: string;
  text: string;
}

export interface AtividadesSecundarias {
  code: string;
  text: string;
}

export interface CNPJApi {
  cnpj: string;
  abertura: string;
  nome: string;
  fantasia: string;
  atividade_principal: AtividadePrincipal[];
  atividades_secundarias: AtividadesSecundarias[];
  municipio: string;
  uf: string;
  natureza_juridica: string;
}

@Injectable()
export class ReceitawsApiService {
  private readonly logger = new Logger();
  constructor(private readonly httpService: HttpService) {}

  async findOne(cnpj: string): Promise<CNPJApi> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);

          throw `Ocorreu um erro na requisição: ${error.response?.data}`;
        }),
      ),
    );

    return data;
  }
}
