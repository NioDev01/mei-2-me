import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Message],
  synchronize: true, // ⚠️ Apenas para desenvolvimento
};
