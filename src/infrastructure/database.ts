import { createPool, Pool, PoolOptions } from 'mysql2/promise';

const dbConfig: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: 'brandi12',
  database: 'hexa',
};

const pool: Pool = createPool(dbConfig);

export { pool };
