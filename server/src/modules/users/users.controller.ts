import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/users.entity';
import { Usuario } from '@prisma/client';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria usuário',
    description: 'Endpoint responsável por criar novo usuário no sistema.',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto): Promise<Usuario> {
    const user = await this.usersService.create(createUserDto);

    return new UserEntity(user);
  }

  @Get(':cnpj')
  @ApiOperation({
    summary: 'Busca dados de um usuário',
    description:
      'Endpoint responsável por buscar dados de um usuário pelo CNPJ.',
  })
  @ApiResponse({ status: 200, description: 'Operação realizada com sucesso.' })
  async findOne(@Param('cnpj') cnpj: string) {
    const user = await this.usersService.findOne(cnpj);

    return new UserEntity(user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualiza dados do usuário',
    description:
      'Endpoint responsável por atualizar dados do usuário no sistema.',
  })
  @ApiResponse({ status: 200, description: 'Dados atualizados com sucesso.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return new UserEntity(user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleta usuário',
    description: 'Endpoint responsável por deletar usuário do sistema.',
  })
  @ApiResponse({ status: 201, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao tentar deletar usuário.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
