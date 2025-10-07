import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CnaeService } from './cnae.service';

@Controller('cnae')
export class CnaeController {
  constructor(private readonly cnaeService: CnaeService) {}

  @Get()
  async obterTodos() {
    return this.cnaeService.buscarTodos();
  }

  @Get(':id')
  async obterPorId(@Param('id', ParseIntPipe) id: number) {
    return this.cnaeService.buscarPorId(id);
  }

  @Get('codigo/:cnae')
  async obterPorCodigo(@Param('cnae') cnae: string) {
    return this.cnaeService.buscarPorCodigo(cnae);
  }
}