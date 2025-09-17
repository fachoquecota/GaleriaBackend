# Galeria Backend

Proyecto Node.js con arquitectura Clean Code para APIs REST conectadas a PostgreSQL.

## Estructura
- src/config: configuración de base de datos
- src/routes: rutas de la API
- src/controllers: lógica de controladores
- src/services: lógica de negocio
- src/repositories: acceso a datos
- src/middlewares: middlewares personalizados
- src/utils: utilidades

## Uso

1. Instala dependencias:
   npm install
2. Ejecuta el servidor:
   npm start

Endpoint de ejemplo: GET /api/example

---

## Revisión del proyecto Backend

Este proyecto está en una etapa inicial y busca implementar una API REST modular y escalable para gestión de usuarios, roles, permisos y ejemplos. Utiliza Express, PostgreSQL y nodemailer para envío de correos.

- **Endpoints principales:**
  - Autenticación y validación de acceso por código enviado por correo.
  - CRUD para entidad `ejemplo`.
  - Ejemplo de endpoint de prueba (`example`).
- **Dependencias:**
  - express
  - pg
  - nodemailer
- **Arquitectura:**
  - Separación en controladores, servicios, repositorios y rutas.
  - Acceso a datos mediante funciones y procedimientos almacenados en PostgreSQL.
  - Envío de correos con Outlook vía nodemailer.

## Revisión de la base de datos PostgreSQL

La base de datos contiene las siguientes tablas y funciones:

### Tablas existentes

- **usuarios**: id, correo, password, nombre
- **roles**: id, nombre
- **permisos**: id, nombre
- **usuario_roles**: usuario_id, rol_id
- **rol_permisos**: rol_id, permiso_id
- **codigos_validacion**: id, usuario_id, codigo, creado_en, usado
- **ejemplo**: id, nombre, edad

### Funciones y procedimientos almacenados

- `insert_ejemplo(nombre, edad)`: Inserta un registro en ejemplo y retorna el id.
- `update_ejemplo(p_id, p_nombre, p_edad)`: Actualiza un registro de ejemplo.
- `delete_ejemplo(p_id)`: Elimina un registro de ejemplo.
- `get_all_ejemplo()`: Retorna todos los registros de ejemplo.
- `get_ejemplo_by_id(p_id)`: Retorna un registro de ejemplo por id.
- `generar_codigo_validacion(p_usuario_id)`: Genera y almacena un código de validación para el usuario.
- `validar_codigo_acceso(p_usuario_id, p_codigo)`: Valida el código de acceso y lo marca como usado.
- `validar_login(p_correo, p_password)`: Valida credenciales y retorna datos del usuario.

### Observaciones

- El backend utiliza estas funciones para realizar operaciones seguras y centralizadas en la base de datos.
- El sistema de autenticación implementa doble factor mediante código enviado por correo.
- El proyecto está listo para expandirse con nuevas entidades y lógica de negocio.
