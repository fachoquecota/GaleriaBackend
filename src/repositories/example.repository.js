import { pool } from '../config/db.js';

export const getExampleRepository = async () => {
  const result = await pool.query('SELECT NOW() as now');
  return result.rows[0];
};
