import { Controller, Post, Body, Res, HttpCode, Param } from '@nestjs/common';
import { Response } from 'express';
import { AtoConstitutivoService } from './ato-constitutivo.service';
import { GenerateEIDto } from './dto/generate-ei.dto';
import { GenerateLtdaDto } from './dto/generate-ltda.dto';
import { GenerateAtoDto } from './dto/generate-ato.dto';
import { GenerateFromMeiDto } from './dto/generate-from-mei.dto';

@Controller('ato-constitutivo')
export class AtoConstitutivoController {
  constructor(private readonly service: AtoConstitutivoService) {}

  @Post('from-mei/:id')
  @HttpCode(200)
  async generateFromMei(
    @Param('id') id: string,
    @Body() body: GenerateFromMeiDto,
    @Res() res: Response,
  ) {
    const buffer = await this.service.generateFromMei(Number(id), body);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=ato-constitutivo.docx',
    });

    res.send(buffer);
  }

  @Post()
  @HttpCode(200)
  async generateAto(@Body() body: GenerateAtoDto, @Res() res: Response) {
    const buffer = await this.service.generateAto(body);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=ato-constitutivo.docx',
    });

    res.send(buffer);
  }

  @Post('ei')
  @HttpCode(200)
  async generateEI(@Body() body: GenerateEIDto, @Res() res: Response) {
    const buffer = await this.service.generateEI(body);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=ato-constitutivo-ei.docx',
    });

    res.send(buffer);
  }

  @Post('ltda')
  @HttpCode(200)
  async generateLTDA(@Body() body: GenerateLtdaDto, @Res() res: Response) {
    const buffer = await this.service.generateLTDA(body);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=contrato-social.docx',
    });

    res.send(buffer);
  }
}
