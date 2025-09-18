import { pool } from '../config/db.js';

export const getMenu = async (req, res) => {
  try {
    const usuario_id = req.usuario_id;
    // Obtener rol del usuario
    const userResult = await pool.query('SELECT * FROM get_usuario_rol($1)', [usuario_id]);
    if (!userResult.rows.length) {
      return res.status(404).json({ success: false, error: 'Rol no encontrado para el usuario' });
    }
    const rol_id = userResult.rows[0].rol_id;
    // Obtener menús y submenús asignados al rol usando funciones almacenadas
    const menusResult = await pool.query('SELECT * FROM get_menus_por_rol($1)', [rol_id]);
    const submenusResult = await pool.query('SELECT * FROM get_submenus_por_rol($1)', [rol_id]);
    // Construir estructura de menús con submenús anidados
    const submenus = submenusResult.rows;
    const buildSubmenus = (menuId, padreId = null) => {
      return submenus
        .filter(s => s.menu_id === menuId && s.padre_id === padreId)
        .map(s => ({
          id: s.id,
          nombre: s.nombre,
          icono: s.icono,
          submodulos: buildSubmenus(menuId, s.id)
        }));
    };
    const menus = menusResult.rows.map(m => ({
      id: m.id,
      nombre: m.nombre,
      icono: m.icono,
      submodulos: buildSubmenus(m.id)
    }));
    res.json({ success: true, menus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
