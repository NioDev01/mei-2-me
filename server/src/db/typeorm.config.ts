import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // exemplo

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'facilitador_mei_me',
  entities: [User],
  synchronize: true, // ⛔ cuidado em produção
};
