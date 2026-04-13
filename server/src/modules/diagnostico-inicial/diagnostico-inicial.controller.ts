import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DiagnosticoInicialService } from './diagnostico-inicial.service';
import { CreateDiagnosticoInicialDto } from './dto/create-diagnostico-inicial.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('diagnostico-inicial')
export class DiagnosticoInicialController {
  constructor(
    private readonly diagnosticoInicialService: DiagnosticoInicialService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDiagnosticoInicialDto: CreateDiagnosticoInicialDto,
    @Request() req,
  ) {
    return this.diagnosticoInicialService.create(
      createDiagnosticoInicialDto,
      req.user,
    );
  }

  @Get(':cnpj')
  async findOne(@Param('cnpj') cnpj: string) {
    const data = await this.diagnosticoInicialService.findOne(cnpj);

    return data;
  }
}
