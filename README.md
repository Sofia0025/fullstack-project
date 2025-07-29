# 🚀 Fullstack E-commerce Project

Un proyecto fullstack completo desarrollado con Node.js, Express, MongoDB, React y Material-UI. Incluye autenticación JWT, gestión de productos, carrito de compras, documentación API y diseño responsive.

## 📋 Características del Proyecto

### Backend (Node.js + Express)
- ✅ API REST con Express.js
- ✅ Base de datos MongoDB con Mongoose
- ✅ Autenticación JWT con bcrypt
- ✅ Validaciones con express-validator
- ✅ Documentación Swagger completa
- ✅ Operaciones CRUD completas para productos, usuarios, carrito y órdenes
- ✅ Paginación y filtros
- ✅ Middleware de autenticación
- ✅ Control de errores
- ✅ Variables de entorno
- ✅ Seed automático con productos reales

### Frontend (React + Material-UI)
- ✅ React con hooks modernos
- ✅ Material-UI para diseño responsive
- ✅ React Router para navegación
- ✅ Context API para estado global
- ✅ Autenticación JWT
- ✅ Componentes reutilizables
- ✅ Hooks personalizados (useAuth, useProducts)
- ✅ Validación de formularios
- ✅ Tabla de datos con filtros y paginación
- ✅ Diseño responsive (desktop y mobile)
- ✅ Feedback visual (loaders, errores)
- ✅ Modo oscuro/claro
- ✅ Skeleton loaders
- ✅ Carrito de compras funcional

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
- **TypeScript** - Tipado estático

### Frontend
- **React 18** - Biblioteca de UI
- **Material-UI** - Componentes de UI
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Context API** - Estado global
- **TypeScript** - Tipado estático

## 📁 Estructura del Proyecto

```
fullstack-project/
├── ecommerce-backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── cartController.ts
│   │   │   ├── orderController.ts
│   │   │   └── productController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── Cart.ts
│   │   │   ├── Order.ts
│   │   │   ├── Product.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   ├── products.ts
│   │   │   └── users.ts
│   │   ├── services/
│   │   ├── utils/
│   │   │   ├── debugCart.ts
│   │   │   ├── mocks.json
│   │   │   └── seed.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── ecommerce-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useProducts.ts
│   │   ├── pages/
│   │   │   ├── AdminOrders.tsx
│   │   │   ├── AdminProducts.tsx
│   │   │   ├── AdminUsers.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Register.tsx
│   │   ├── store/
│   │   │   └── cartStore.ts
│   │   ├── utils/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── start.sh
├── QUICK_START.md
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB Atlas (configurado)
- npm o yarn

### 1. Clonar el proyecto
```bash
git clone <repository-url>
cd fullstack-project
```

### 2. Configurar Backend
```bash
cd ecommerce-backend
npm install
```

Crear archivo `.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Configurar Frontend
```bash
cd ../ecommerce-frontend
npm install
```

### 4. Ejecutar el Seed
```bash
cd ../ecommerce-backend
npm run seed
```

## 🏃‍♂️ Ejecución

### Desarrollo

#### Backend
```bash
cd ecommerce-backend
npm run dev
```
El servidor estará disponible en `http://localhost:5000`

#### Frontend
```bash
cd ecommerce-frontend
npm start
```
La aplicación estará disponible en `http://localhost:3000`

### Script de Inicio Rápido
```bash
./start.sh
```

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere autenticación)

### Productos
- `GET /api/products` - Listar productos (con paginación y filtros)
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (requiere autenticación admin)
- `PUT /api/products/:id` - Actualizar producto (requiere autenticación admin)
- `DELETE /api/products/:id` - Eliminar producto (requiere autenticación admin)

### Carrito
- `GET /api/cart` - Obtener carrito del usuario
- `POST /api/cart/add` - Agregar producto al carrito
- `PUT /api/cart/update` - Actualizar cantidad en carrito
- `DELETE /api/cart/remove/:productId` - Remover producto del carrito

### Órdenes
- `GET /api/orders` - Listar órdenes del usuario
- `POST /api/orders` - Crear nueva orden
- `GET /api/orders/:id` - Obtener orden por ID

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario (admin)

### Documentación
- `GET /api-docs` - Documentación Swagger completa

## 🎯 Funcionalidades Principales

### Autenticación y Autorización
- Registro de usuarios con validación
- Inicio de sesión seguro
- Tokens JWT para autenticación
- Protección de rutas
- Encriptación de contraseñas con bcrypt
- Roles de usuario (admin, user)

### Gestión de Productos
- CRUD completo de productos
- Paginación y filtros avanzados
- Búsqueda por nombre y categoría
- Imágenes reales de productos
- Stock y precios dinámicos

### Carrito de Compras
- Agregar/remover productos
- Actualizar cantidades
- Persistencia en base de datos
- Cálculo automático de totales

### Gestión de Órdenes
- Crear órdenes desde el carrito
- Historial de compras
- Estados de orden
- Información de envío

### Interfaz de Usuario
- Diseño responsive para todos los dispositivos
- Navegación intuitiva
- Feedback visual en tiempo real
- Formularios con validación
- Modo oscuro/claro
- Skeleton loaders
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
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Base de Datos
El proyecto usa MongoDB Atlas. Configuración:
- Base de datos: `ecommerce`
- Colecciones: `users`, `products`, `carts`, `orders`
- Seed automático con productos reales

## 🧪 Pruebas

### Backend
```bash
cd ecommerce-backend
npm test
```

### Frontend
```bash
cd ecommerce-frontend
npm test
```

## 📦 Despliegue

### Backend (Heroku, Railway, etc.)
```bash
cd ecommerce-backend
npm run build
```

### Frontend (Netlify, Vercel, etc.)
```bash
cd ecommerce-frontend
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

Desarrollado como proyecto fullstack e-commerce.

## 🙏 Agradecimientos

- Material-UI por los componentes
- Express.js por el framework
- MongoDB Atlas por la base de datos
- React por la biblioteca de UI
