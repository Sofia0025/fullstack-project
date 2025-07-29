#!/bin/bash

echo "🚀 Iniciando E-commerce Fullstack Project..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

print_info() {
    echo -e "${BLUE}$1${NC}"
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "❌ Node.js no está instalado. Por favor instala Node.js v18 o superior."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warning "⚠️  Se recomienda Node.js v18 o superior. Versión actual: $(node -v)"
fi

print_message "✅ Node.js encontrado: $(node -v)"

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "❌ npm no está instalado."
    exit 1
fi

print_message "✅ npm encontrado: $(npm -v)"

# Verificar si las carpetas existen
if [ ! -d "ecommerce-backend" ]; then
    print_error "❌ Carpeta ecommerce-backend no encontrada."
    exit 1
fi

if [ ! -d "ecommerce-frontend" ]; then
    print_error "❌ Carpeta ecommerce-frontend no encontrada."
    exit 1
fi

print_message "✅ Estructura de carpetas verificada"

# Función para instalar dependencias del backend
install_backend() {
    print_info "📦 Instalando dependencias del backend..."
    cd ecommerce-backend
    
    if [ ! -f "package.json" ]; then
        print_error "❌ package.json no encontrado en ecommerce-backend"
        exit 1
    fi
    
    npm install
    if [ $? -eq 0 ]; then
        print_message "✅ Dependencias del backend instaladas"
    else
        print_error "❌ Error instalando dependencias del backend"
        exit 1
    fi
    cd ..
}

# Función para instalar dependencias del frontend
install_frontend() {
    print_info "📦 Instalando dependencias del frontend..."
    cd ecommerce-frontend
    
    if [ ! -f "package.json" ]; then
        print_error "❌ package.json no encontrado en ecommerce-frontend"
        exit 1
    fi
    
    npm install
    if [ $? -eq 0 ]; then
        print_message "✅ Dependencias del frontend instaladas"
    else
        print_error "❌ Error instalando dependencias del frontend"
        exit 1
    fi
    cd ..
}

# Función para verificar archivo .env del backend
check_backend_env() {
    cd ecommerce-backend
    if [ ! -f ".env" ]; then
        print_warning "⚠️  Archivo .env no encontrado en ecommerce-backend"
        print_info "📝 Creando archivo .env de ejemplo..."
        cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key_here
EOF
        print_warning "⚠️  Por favor edita el archivo .env con tus credenciales de MongoDB Atlas"
    else
        print_message "✅ Archivo .env encontrado"
    fi
    cd ..
}

# Función para ejecutar el seed
run_seed() {
    print_info "🌱 Ejecutando seed de la base de datos..."
    cd ecommerce-backend
    npm run seed
    if [ $? -eq 0 ]; then
        print_message "✅ Seed ejecutado correctamente"
    else
        print_warning "⚠️  Error ejecutando seed. Verifica la conexión a MongoDB Atlas"
    fi
    cd ..
}

# Función para iniciar el backend
start_backend() {
    print_info "🔧 Iniciando backend..."
    cd ecommerce-backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    print_message "✅ Backend iniciado (PID: $BACKEND_PID)"
}

# Función para iniciar el frontend
start_frontend() {
    print_info "🎨 Iniciando frontend..."
    cd ecommerce-frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    print_message "✅ Frontend iniciado (PID: $FRONTEND_PID)"
}

# Función para mostrar URLs
show_urls() {
    echo ""
    print_message "🌐 URLs de acceso:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:5000"
    echo "   API Docs: http://localhost:5000/api-docs"
    echo ""
    print_message "🔑 Credenciales de prueba:"
    echo "   Email: admin@example.com"
    echo "   Password: admin123"
    echo ""
}

# Función para manejar la interrupción
cleanup() {
    print_info "🛑 Deteniendo servicios..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        print_message "✅ Backend detenido"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        print_message "✅ Frontend detenido"
    fi
    exit 0
}

# Capturar interrupción (Ctrl+C)
trap cleanup INT

# Ejecutar instalación
print_message "🚀 Iniciando instalación y configuración..."

install_backend
install_frontend
check_backend_env
run_seed

# Preguntar si quiere iniciar los servicios
echo ""
print_info "¿Deseas iniciar los servicios ahora? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    start_backend
    
    # Esperar un poco para que el backend se inicie
    sleep 3
    
    start_frontend
    show_urls
    
    print_message "🎉 ¡Proyecto iniciado correctamente!"
    print_info "Presiona Ctrl+C para detener los servicios"
    
    # Mantener el script corriendo
    wait
else
    print_message "✅ Instalación completada"
    print_info "Para iniciar los servicios manualmente:"
    echo "   Backend:  cd ecommerce-backend && npm run dev"
    echo "   Frontend: cd ecommerce-frontend && npm start"
fi 