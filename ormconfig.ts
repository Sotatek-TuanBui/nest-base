import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config({ 
  path: path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`)
});

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  entities: [__dirname + '/src/entities/**/*{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
  synchronize: false,
});

export default AppDataSource

// export = {
//   type: 'mysql',
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_DB_NAME,
//   entities: [__dirname + '/sr/entities/**/*{.ts,.js}'],
//   migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
//   cli: {
//     migrationsDir: __dirname + '/src/database/migrations',
//     entitiesDir: __dirname + 'src/entities'
//   },
//   synchronize: false
// };
