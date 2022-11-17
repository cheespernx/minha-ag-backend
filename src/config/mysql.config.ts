import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { database, db_ag } from './constants';

export const mySQLConfig: TypeOrmModuleOptions = {
  database: db_ag,
  type: 'mysql',
  port: 3306,
  host: database.host,
  username: database.username,
  password: database.password,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'tb_typeorm_migrations',
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
};

export default mySQLConfig;
