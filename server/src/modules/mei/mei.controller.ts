import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MeiService } from './mei.service';

@Controller('mei')
export class MeiController {
  constructor(private readonly meiService: MeiService) {}

  @Get()
  async obterTodos() {
    return this.meiService.buscarTodos();
  }

  @Get(':id')
  async obterPorId(@Param('id', ParseIntPipe) id: number) {
    return this.meiService.buscarPorId(id);
  }

  @Get('cnpj/:cnpj')
  async obterPorCnpj(@Param('cnpj') cnpj: string) {
    return this.meiService.buscarPorCnpj(cnpj);
  }
}