import { pool } from '../config/db.js';

export const getAllEjemploRepository = async () => {
  const result = await pool.query('SELECT * FROM get_all_ejemplo()');
  return result.rows;
};

export const getEjemploByIdRepository = async (id) => {
  const result = await pool.query('SELECT * FROM get_ejemplo_by_id($1)', [id]);
  return result.rows[0];
};

export const createEjemploRepository = async (nombre, edad) => {
  const result = await pool.query('SELECT insert_ejemplo($1, $2) AS id', [nombre, edad]);
  return result.rows[0].id;
};

export const updateEjemploRepository = async (id, nombre, edad) => {
  await pool.query('SELECT update_ejemplo($1, $2, $3)', [id, nombre, edad]);
};

export const deleteEjemploRepository = async (id) => {
  await pool.query('SELECT delete_ejemplo($1)', [id]);
};
