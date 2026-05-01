import { Controller, Post, Body, Res, HttpCode, Param } from '@nestjs/common';
import { Response } from 'express';

import { AtoConstitutivoService } from './ato-constitutivo.service';
import { GenerateFromMeiDto } from './dto/generate-from-mei.dto';

@Controller('ato-constitutivo')
export class AtoConstitutivoController {
  constructor(private readonly service: AtoConstitutivoService) {}

  @Post(':id')
  @HttpCode(200)
  async generate(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() body?: GenerateFromMeiDto,
  ) {
    const buffer = await this.service.generateSmart(Number(id), body);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=ato-constitutivo.docx',
    });

    res.send(buffer);
  }
}
