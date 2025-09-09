import {
  loginUsuarioRepository,
  generarCodigoRepository,
  validarCodigoRepository
} from '../repositories/auth.repository.js';

export const loginUsuarioService = async (correo, password) => {
  const usuario = await loginUsuarioRepository(correo, password);
  if (!usuario) return null;
  return usuario;
};

loginUsuarioService.generarCodigo = async (usuario_id) => {
  return await generarCodigoRepository(usuario_id);
};

export const validarCodigoService = async (usuario_id, codigo) => {
  return await validarCodigoRepository(usuario_id, codigo);
};
