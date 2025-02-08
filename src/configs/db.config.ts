import { registerAs } from '@nestjs/config';
import { resolve } from 'path';
import { DBLogger } from 'src/shared/loggers/db.logger';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DB_CONFIG_TOKEN = 'db_config';

export const DB_CONFIG_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [resolve(__dirname + '/../**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname + '/../migrations/*{.ts,.js}')],
  synchronize: false,
  logger: new DBLogger(),
  logging: 'all',
  timezone: '+00:00',
} as const;

export const DB_CONFIG = registerAs(DB_CONFIG_TOKEN, () => DB_CONFIG_OPTIONS);

export const datasource = new DataSource(DB_CONFIG_OPTIONS);
