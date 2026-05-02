import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';

import { AtoConstitutivoService } from './ato-constitutivo.service';
import { GenerateFromMeiDto } from './dto/generate-from-mei.dto';
import { EmpresaTransicaoResponseDto } from './dto/empresa-transicao-response.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ato-constitutivo')
export class AtoConstitutivoController {
  constructor(private readonly service: AtoConstitutivoService) {}

  private getMeiId(req: any): number {
    return req.user.id_mei;
  }

  // GET → carregar dados salvos
  @Get()
  async get(@Req() req: any): Promise<EmpresaTransicaoResponseDto> {
    const id_mei = this.getMeiId(req);
    return this.service.getEmpresaTransicao(id_mei);
  }

  // POST → persistir dados (SEM gerar)
  @Post()
  @HttpCode(200)
  async save(@Req() req: any, @Body() body: GenerateFromMeiDto) {
    const id_mei = this.getMeiId(req);

    await this.service.saveEmpresaTransicao(id_mei, body);

    return { message: 'Dados da empresa salvos com sucesso' };
  }

  // POST → gerar documento (SEM salvar)
  @Post('generate')
  @HttpCode(200)
  async generate(@Req() req: any, @Res() res: Response) {
    const id_mei = this.getMeiId(req);

    const buffer = await this.service.generateFromTransicao(id_mei);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=ato-constitutivo.docx',
    });

    res.send(buffer);
  }
}
