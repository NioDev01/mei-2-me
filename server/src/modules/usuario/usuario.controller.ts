import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async obterTodos() {
    return this.usuarioService.buscarTodos();
  }

  @Get(':id')
  async obterPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.buscarPorId(id);
  }

  @Get('email/:email')
  async obterPorEmail(@Param('email') email: string) {
    return this.usuarioService.buscarPorEmail(email);
  }

  @Get('cnpj/:cnpj')
  async obterPorCnpj(@Param('cnpj') cnpj: string) {
    return this.usuarioService.buscarPorCnpj(cnpj);
  }
}