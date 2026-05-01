import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AtoConstitutivoService } from './ato-constitutivo.service';
import { GenerateEIDto } from './dto/generate-ei.dto';

@Controller('ato-constitutivo')
export class AtoConstitutivoController {
  constructor(private readonly service: AtoConstitutivoService) {}

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
}
