import { pool } from '../config/db.js';

export const loginUsuarioRepository = async (correo, password) => {
  const result = await pool.query('SELECT * FROM validar_login($1, $2)', [correo, password]);
  return result.rows[0];
};

export const generarCodigoRepository = async (usuario_id) => {
  const result = await pool.query('SELECT generar_codigo_validacion($1) AS codigo', [usuario_id]);
  return result.rows[0].codigo;
};

export const validarCodigoRepository = async (usuario_id, codigo) => {
  const result = await pool.query('SELECT validar_codigo_acceso($1, $2) AS valido', [usuario_id, codigo]);
  return result.rows[0].valido;
};
