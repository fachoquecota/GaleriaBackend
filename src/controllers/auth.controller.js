
import {
  loginUsuarioService,
  validarCodigoService
} from '../services/auth.service.js';
import { sendMail } from '../utils/mailer.js';

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
      res.json({ success: true, mensaje: 'Acceso concedido' });
    } else {
      res.status(401).json({ success: false, error: 'Código inválido' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
