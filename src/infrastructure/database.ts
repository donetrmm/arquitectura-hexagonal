import { createPool, Pool, PoolOptions } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
};

const pool: Pool = createPool(dbConfig);

export { pool };
