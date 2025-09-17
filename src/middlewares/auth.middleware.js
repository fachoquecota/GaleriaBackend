import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: 'Token no proporcionado' });
  }
  const secret = process.env.JWT_SECRET || 'galeria_secret_key';
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Token inválido o expirado' });
    }
    req.usuario_id = payload.usuario_id;
    next();
  });
};
