import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';

dotenv.config();

// Datos reales de productos extraídos del JSON
const realProducts = [
  {
    name: "Sweater Pati",
    description: "Sweater tejido en hilado multicolor generando motivo de rayas degradé. Cuello, puños, cintura en punto rib.",
    price: 52990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "sweaters",
    imageUrl: "https://dummyimage.com/400x400/ff6b6b/fff&text=Sweater+Pati",
    brand: "Cuesta Blanca"
  },
  {
    name: "Remera Básica Algodón",
    description: "Remera de algodón 100% premium, corte regular y cuello redondo. Ideal para uso diario.",
    price: 15990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "remeras",
    imageUrl: "https://dummyimage.com/400x400/4ecdc4/fff&text=Remera+Basica",
    brand: "Cuesta Blanca"
  },
  {
    name: "Jean Slim Fit",
    description: "Jean de denim premium con corte slim fit, 5 bolsillos y cierre con botón y bragueta.",
    price: 45990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "pantalones",
    imageUrl: "https://dummyimage.com/400x400/45b7d1/fff&text=Jean+Slim",
    brand: "Cuesta Blanca"
  },
  {
    name: "Campera Bomber",
    description: "Campera bomber con cierre frontal, bolsillos laterales y cuello rib. Perfecta para el día a día.",
    price: 78990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "camperas",
    imageUrl: "https://dummyimage.com/400x400/96ceb4/fff&text=Campera+Bomber",
    brand: "Cuesta Blanca"
  },
  {
    name: "Zapatillas Urbanas",
    description: "Zapatillas con suela de goma, diseño urbano y materiales premium. Ideales para caminar.",
    price: 65990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "zapatillas",
    imageUrl: "https://dummyimage.com/400x400/ffeaa7/fff&text=Zapatillas+Urbanas",
    brand: "Cuesta Blanca"
  },
  {
    name: "Sweater Oversize",
    description: "Sweater oversize con tejido suave y cómodo. Diseño moderno y versátil.",
    price: 38990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "sweaters",
    imageUrl: "https://dummyimage.com/400x400/dda0dd/fff&text=Sweater+Oversize",
    brand: "Cuesta Blanca"
  },
  {
    name: "Remera Estampada",
    description: "Remera con estampado exclusivo, corte regular y materiales de calidad premium.",
    price: 22990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "remeras",
    imageUrl: "https://dummyimage.com/400x400/98d8c8/fff&text=Remera+Estampada",
    brand: "Cuesta Blanca"
  },
  {
    name: "Jean Mom Fit",
    description: "Jean con corte mom fit, talle alto y diseño vintage. Perfecto para un look retro.",
    price: 52990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "pantalones",
    imageUrl: "https://dummyimage.com/400x400/f7dc6f/fff&text=Jean+Mom",
    brand: "Cuesta Blanca"
  },
  {
    name: "Campera de Cuero",
    description: "Campera de cuero sintético con cierre frontal y diseño clásico. Elegancia y estilo.",
    price: 89990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "camperas",
    imageUrl: "https://dummyimage.com/400x400/bb8fce/fff&text=Campera+Cuero",
    brand: "Cuesta Blanca"
  },
  {
    name: "Zapatillas Running",
    description: "Zapatillas deportivas con tecnología de amortiguación avanzada. Ideales para correr.",
    price: 75990,
    stock: Math.floor(Math.random() * 50) + 10,
    category: "zapatillas",
    imageUrl: "https://dummyimage.com/400x400/85c1e9/fff&text=Zapatillas+Running",
    brand: "Cuesta Blanca"
  }
];

const seedRealProducts = async () => {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
    await mongoose.connect(mongoUri);
    console.log('Conectado a MongoDB');

    // Limpiar productos existentes
    await Product.deleteMany({});
    console.log('Productos existentes eliminados');

    // Insertar productos reales
    await Product.insertMany(realProducts);
    console.log(`${realProducts.length} productos reales insertados`);

    // Verificar que el usuario admin existe
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Usuario admin creado');
    } else {
      console.log('Usuario admin ya existe');
    }

    console.log('Seed completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error en el seed:', error);
    process.exit(1);
  }
};

seedRealProducts(); 