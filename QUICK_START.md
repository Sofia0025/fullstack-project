# 🚀 Inicio Rápido - Fullstack Project

## ⚡ Ejecución Rápida

### Opción 1: Script Automático (Recomendado)
```bash
./start.sh
```

### Opción 2: Manual

#### 1. Backend
```bash
cd backend
npm install
cp env.example .env
npm run dev
```

#### 2. Frontend (en otra terminal)
```bash
cd frontend
npm install
npm start
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Docs**: http://localhost:5000/public-api

## 🔑 Credenciales de Prueba

Puedes crear un usuario desde la interfaz o usar estos datos de ejemplo:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "123456"
}
```

## 📱 Funcionalidades Disponibles

### Sin Autenticación
- ✅ Ver página de inicio
- ✅ Registrarse
- ✅ Iniciar sesión
- ✅ Ver documentación API

### Con Autenticación
- ✅ Ver lista de usuarios
- ✅ Crear nuevos usuarios
- ✅ Editar usuarios
- ✅ Eliminar usuarios
- ✅ Ver perfil personal
- ✅ Filtrar y buscar usuarios

## 🛠️ Solución de Problemas

### MongoDB no conecta
- Verifica que MongoDB esté corriendo
- Usa MongoDB Atlas como alternativa
- Revisa la URL en `.env`

### Puerto ocupado
- Cambia el puerto en `.env` (backend)
- Cambia el puerto en `package.json` (frontend)

### Errores de CORS
- Verifica que el backend esté corriendo
- Revisa la URL de la API en el frontend

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en la consola
2. Verifica la configuración de `.env`
3. Asegúrate de que MongoDB esté disponible 