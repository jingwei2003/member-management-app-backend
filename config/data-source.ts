import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'members_db',
  synchronize: false,
  entities: ['dist/**/*.model{.js,.ts}'],
  migrations: ['dist/src/database/migrations/**/*{.js,.ts}'],
};

export const dataSource = new DataSource(options);
