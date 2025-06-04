import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/db/entities/user.entity'; // ajuste o caminho conforme sua estrutura

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto); // instancia um novo user
    return this.userRepository.save(user); // salva no banco
  }
}
