import express from 'express';


import ejemploRouter from './routes/ejemplo.routes.js';
import exampleRouter from './routes/example.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.use('/api/ejemplo', ejemploRouter);
app.use('/api/example', exampleRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log('--- Endpoints disponibles ---');
  console.log(`GET     http://localhost:${PORT}/api/ejemplo`);
  console.log(`GET     http://localhost:${PORT}/api/ejemplo/:id`);
  console.log(`POST    http://localhost:${PORT}/api/ejemplo`);
  console.log(`PUT     http://localhost:${PORT}/api/ejemplo/:id`);
  console.log(`DELETE  http://localhost:${PORT}/api/ejemplo/:id`);
  console.log(`POST    http://localhost:${PORT}/api/auth/login`);
  console.log(`POST    http://localhost:${PORT}/api/auth/validar-codigo`);
});
