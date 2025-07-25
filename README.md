# 🚀 Fullstack Project

Un proyecto fullstack completo desarrollado con Node.js, Express, MongoDB, React y Material-UI. Incluye autenticación JWT, gestión de usuarios, documentación API y diseño responsive.

## 📋 Características del Proyecto

### Backend (Node.js + Express)
- ✅ API REST con Express.js
- ✅ Base de datos MongoDB con Mongoose
- ✅ Autenticación JWT con bcrypt
- ✅ Validaciones con express-validator
- ✅ Documentación Swagger (solo métodos GET)
- ✅ Operaciones CRUD completas
- ✅ Paginación y filtros
- ✅ Middleware de autenticación
- ✅ Control de errores
- ✅ Variables de entorno

### Frontend (React + Material-UI)
- ✅ React con hooks modernos
- ✅ Material-UI para diseño responsive
- ✅ React Router para navegación
- ✅ Context API para estado global
- ✅ Autenticación JWT
- ✅ Componentes reutilizables
- ✅ Hooks personalizados (useFetch)
- ✅ Validación de formularios
- ✅ Tabla de datos con filtros y paginación
- ✅ Diseño responsive (desktop y mobile)
- ✅ Feedback visual (loaders, errores)

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **express-validator** - Validaciones
- **Swagger** - Documentación API

### Frontend
- **React 18** - Biblioteca de UI
- **Material-UI** - Componentes de UI
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Context API** - Estado global

## 📁 Estructura del Proyecto

```
fullstack-project/
├── backend/
│   ├── config/
│   │   └── swagger.js          # Configuración Swagger
│   ├── controllers/
│   │   ├── authController.js   # Controlador de autenticación
│   │   └── userController.js   # Controlador de usuarios
│   ├── middleware/
│   │   ├── auth.js            # Middleware de autenticación
│   │   └── validation.js      # Middleware de validación
│   ├── models/
│   │   └── User.js            # Modelo de Usuario
│   ├── routes/
│   │   ├── auth.js            # Rutas de autenticación
│   │   └── users.js           # Rutas de usuarios
│   ├── server.js              # Archivo principal
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### 1. Clonar el proyecto
```bash
git clone <repository-url>
cd fullstack-project
```

### 2. Configurar Backend
```bash
cd backend
npm install
cp env.example .env
```

Editar `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_project
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

Opcional: Crear `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Iniciar MongoDB
Asegúrate de que MongoDB esté corriendo localmente o configura MongoDB Atlas.

## 🏃‍♂️ Ejecución

### Desarrollo

#### Backend
```bash
cd backend
npm run dev
```
El servidor estará disponible en `http://localhost:5000`

#### Frontend
```bash
cd frontend
npm start
```
La aplicación estará disponible en `http://localhost:3000`

### Producción

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
```

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere autenticación)

### Usuarios
- `GET /api/users` - Listar usuarios (con paginación y filtros)
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario (requiere autenticación)
- `PUT /api/users/:id` - Actualizar usuario completo (requiere autenticación)
- `PATCH /api/users/:id` - Actualizar usuario parcial (requiere autenticación)
- `DELETE /api/users/:id` - Eliminar usuario (requiere autenticación)

### Documentación
- `GET /public-api` - Documentación Swagger (solo métodos GET)

## 🎯 Funcionalidades Principales

### Autenticación y Autorización
- Registro de usuarios con validación
- Inicio de sesión seguro
- Tokens JWT para autenticación
- Protección de rutas
- Encriptación de contraseñas con bcrypt

### Gestión de Usuarios
- CRUD completo de usuarios
- Paginación y filtros avanzados
- Búsqueda por nombre y email
- Filtros por rol y estado
- Validación de datos

### Interfaz de Usuario
- Diseño responsive para todos los dispositivos
- Navegación intuitiva
- Feedback visual en tiempo real
- Formularios con validación
- Tabla de datos interactiva

### Documentación
- API documentada con Swagger
- Ejemplos de uso
- Esquemas de datos
- Códigos de respuesta

## 🔧 Configuración Avanzada

### Variables de Entorno

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_project
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Base de Datos
El proyecto usa MongoDB. Puedes:
- Usar MongoDB local
- Usar MongoDB Atlas (nube)
- Cambiar a MySQL/PostgreSQL modificando los modelos

## 🧪 Pruebas

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📦 Despliegue

### Backend (Heroku, Railway, etc.)
```bash
cd backend
npm run build
```

### Frontend (Netlify, Vercel, etc.)
```bash
cd frontend
npm run build
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

Desarrollado como proyecto final de backend developer.

## 🙏 Agradecimientos

- Material-UI por los componentes
- Express.js por el framework
- MongoDB por la base de datos
- React por la biblioteca de UI # fullstack-project
