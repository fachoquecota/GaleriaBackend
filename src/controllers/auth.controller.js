
import {
  loginUsuarioService,
  validarCodigoService
} from '../services/auth.service.js';
import { sendMail } from '../utils/mailer.js';
import jwt from 'jsonwebtoken';

export const loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await loginUsuarioService(correo, password);
    if (!usuario) {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }
    // Generar código y enviar por correo
    const codigo = await loginUsuarioService.generarCodigo(usuario.id);
    try {
      // Siempre enviar desde fredy.choquecota@outlook.com al correo del usuario logueado
      await sendMail(
        usuario.correo,
        'Código de acceso',
        `Tu código de acceso es: ${codigo}`
      );
    } catch (mailError) {
      return res.status(500).json({ success: false, error: 'No se pudo enviar el correo', detalle: mailError.message });
    }
    res.json({ success: true, usuario: { id: usuario.id, correo: usuario.correo, nombre: usuario.nombre }, mensaje: 'Código enviado al correo' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const validarCodigo = async (req, res) => {
  try {
    const { usuario_id, codigo } = req.body;
    const valido = await validarCodigoService(usuario_id, codigo);
    if (valido) {
      const { pool } = await import('../config/db.js');
      // Obtener datos del usuario y su rol
      const userResult = await pool.query('SELECT * FROM get_usuario_rol($1)', [usuario_id]);
      const usuario = userResult.rows[0];
      // Obtener menús y submenús asignados al rol usando funciones almacenadas
      const menusResult = await pool.query('SELECT * FROM get_menus_por_rol($1)', [usuario.rol_id]);
      const submenusResult = await pool.query('SELECT * FROM get_submenus_por_rol($1)', [usuario.rol_id]);
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
      // Generar token JWT con datos extra
      const payload = {
        usuario_id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol || 'admin',
        menus
      };
      const secret = process.env.JWT_SECRET || 'galeria_secret_key';
      const token = jwt.sign(payload, secret, { expiresIn: '24h' });
      res.json({
        success: true,
        token
      });
    } else {
      res.status(401).json({ success: false, error: 'Código inválido' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
