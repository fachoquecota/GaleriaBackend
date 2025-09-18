import express from 'express';
// Revisión técnica: Edición automática aplicada correctamente.



import ejemploRouter from './routes/ejemplo.routes.js';
import exampleRouter from './routes/example.routes.js';
import authRouter from './routes/auth.routes.js';
import menuRouter from './routes/menu.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/ejemplo', authMiddleware, ejemploRouter);
app.use('/api/example', authMiddleware, exampleRouter);
app.use('/api/menu', menuRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log('--- Endpoints disponibles ---');
  console.log(`POST    http://localhost:${PORT}/api/auth/login`);
  console.log(`POST    http://localhost:${PORT}/api/auth/validar-codigo`);
  console.log(`GET     http://localhost:${PORT}/api/menu   [JWT]`);
  console.log(`GET     http://localhost:${PORT}/api/ejemplo   [JWT]`);
  console.log(`GET     http://localhost:${PORT}/api/ejemplo/:id   [JWT]`);
  console.log(`POST    http://localhost:${PORT}/api/ejemplo   [JWT]`);
  console.log(`PUT     http://localhost:${PORT}/api/ejemplo/:id   [JWT]`);
  console.log(`DELETE  http://localhost:${PORT}/api/ejemplo/:id   [JWT]`);
});
