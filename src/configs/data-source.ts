import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../models/users.entity';
// migrations
import { CreateUsersTable1712452797152 } from '../migrations/1712452797152-create_users_table';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USERNAME,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  entities: [User],
  migrations: [CreateUsersTable1712452797152],
  synchronize: false,
});
