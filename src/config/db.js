import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: 'postgresql://galeria_8b5g_user:TWfraQRZdH5X4o9JvauUSzlVyfow44Pm@dpg-d305memr433s73euuv80-a.oregon-postgres.render.com/galeria_8b5g',
  ssl: { rejectUnauthorized: false }
});
