import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AtoConstitutivoService } from './ato-constitutivo.service';
import { GenerateEIDto } from './dto/generate-ei.dto';
import { GenerateLtdaDto } from './dto/generate-ltda.dto';
import { GenerateAtoDto } from './dto/generate-ato.dto';

@Controller('ato-constitutivo')
export class AtoConstitutivoController {
  constructor(private readonly service: AtoConstitutivoService) {}

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
