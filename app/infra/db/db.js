import { Pool } from 'pg';

/**
 * @typedef {import('./types').DbPool} DbPool
 */

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING ?? '';
if (!DB_CONNECTION_STRING) throw new Error('Some error message...');

/**
 * @function initDb
 * @returns {DbPool}
 */

export const initDb = () => {
  const connectionString = DB_CONNECTION_STRING;
  const dbPool = new Pool({connectionString});
  return dbPool;
};
