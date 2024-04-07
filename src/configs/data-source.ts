import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../models/user.entity';
// migrations
import { CreateUsersTable1712452797152 } from '../migrations/1712452797152-create_users_table';
import { AddColumnsToUsersTable1712453853244 } from '../migrations/1712453853244-add_columns_to_users_table';
import { Test } from '../models/test.entity';
import { CreateTestsTable1712489190141 } from '../migrations/1712489190141-create_tests_table';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USERNAME,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  entities: [User, Test],
  migrations: [
    CreateUsersTable1712452797152,
    AddColumnsToUsersTable1712453853244,
    CreateTestsTable1712489190141,
  ],
  synchronize: false,
});
