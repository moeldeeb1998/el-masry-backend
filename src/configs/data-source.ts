import { DataSource } from 'typeorm';
import { env } from './env';
import { entities } from './entities.typeorm';
import { migrations } from './migrations.typeorm';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USERNAME,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  entities,
  migrations,
  synchronize: false,
});
