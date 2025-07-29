# 🚀 Inicio Rápido - E-commerce Fullstack Project

## ⚡ Ejecución Rápida

### Opción 1: Script Automático (Recomendado)
```bash
./start.sh
```

### Opción 2: Manual

#### 1. Backend
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

```bash
npm run seed
npm run dev
```

#### 2. Frontend (en otra terminal)
```bash
cd ecommerce-frontend
npm install
npm start
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs

## 🔑 Credenciales de Prueba

### Usuario Admin (creado automáticamente)
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Crear Usuario Nuevo
Puedes registrar un nuevo usuario desde la interfaz o usar la API:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Test",
    "email": "test@example.com",
    "password": "123456"
  }'
```

## 📱 Funcionalidades Disponibles

### Sin Autenticación
- ✅ Ver catálogo de productos
- ✅ Registrarse
- ✅ Iniciar sesión
- ✅ Ver documentación API
- ✅ Modo oscuro/claro

### Con Autenticación (Usuario)
- ✅ Ver perfil personal
- ✅ Agregar productos al carrito
- ✅ Ver carrito de compras
- ✅ Actualizar cantidades
- ✅ Realizar compras
- ✅ Ver historial de órdenes

### Con Autenticación (Admin)
- ✅ Gestión completa de productos
- ✅ Gestión de usuarios
- ✅ Ver todas las órdenes
- ✅ Estadísticas de ventas

## 🛍️ Funcionalidades del E-commerce

### Productos
- ✅ Catálogo con paginación
- ✅ Filtros por categoría
- ✅ Búsqueda por nombre
- ✅ Imágenes reales de productos
- ✅ Precios y stock dinámico

### Carrito de Compras
- ✅ Agregar/remover productos
- ✅ Actualizar cantidades
- ✅ Cálculo automático de totales
- ✅ Persistencia en base de datos

### Órdenes
- ✅ Crear órdenes desde el carrito
- ✅ Historial de compras
- ✅ Estados de orden
- ✅ Información de envío

### Usuarios
- ✅ Registro e inicio de sesión
- ✅ Perfiles de usuario
- ✅ Roles (admin/user)
- ✅ Gestión de usuarios (admin)

## 🛠️ Solución de Problemas

### MongoDB Atlas no conecta
- Verifica la URL de conexión en `.env`
- Asegúrate de que la IP esté en la whitelist
- Revisa las credenciales de usuario

### Puerto ocupado
- Cambia el puerto en `.env` (backend)
- Cambia el puerto en `package.json` (frontend)

### Errores de CORS
- Verifica que el backend esté corriendo
- Revisa la URL de la API en el frontend

### Seed no funciona
- Verifica la conexión a MongoDB Atlas
- Revisa el archivo `.env`
- Ejecuta `npm run seed` manualmente

### Productos no aparecen
- Ejecuta el seed: `npm run seed`
- Verifica que la base de datos tenga productos
- Revisa los logs del backend

## 📊 Base de Datos

### Colecciones
- **users**: Usuarios del sistema
- **products**: Catálogo de productos
- **carts**: Carritos de compra
- **orders**: Órdenes de compra

### Seed Automático
El proyecto incluye un seed que:
- Crea usuario admin automáticamente
- Pobla la base de datos con productos reales
- Usa datos de `mocks.json`

## 🔧 Configuración Avanzada

### Variables de Entorno (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### MongoDB Atlas
1. Crea una cuenta en MongoDB Atlas
2. Crea un cluster
3. Obtén la URL de conexión
4. Agrega tu IP a la whitelist
5. Crea un usuario de base de datos

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en la consola
2. Verifica la configuración de `.env`
3. Asegúrate de que MongoDB Atlas esté configurado
4. Ejecuta el seed: `npm run seed`
5. Verifica que todos los servicios estén corriendo 