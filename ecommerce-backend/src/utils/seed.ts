import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';
import bcrypt from 'bcryptjs';

dotenv.config();

const products = [
  {
    name: 'Remera Básica Blanca',
    description: 'Remera de algodón 100% blanca, unisex.',
    price: 5999,
    stock: 100,
    category: 'remeras',
    imageUrl: 'https://dummyimage.com/400x400/fff/000&text=Remera+Blanca',
  },
  {
    name: 'Jean Slim Azul',
    description: 'Jean azul corte slim fit.',
    price: 12999,
    stock: 50,
    category: 'pantalones',
    imageUrl: 'https://dummyimage.com/400x400/87ceeb/000&text=Jean+Slim',
  },
  {
    name: 'Campera Negra',
    description: 'Campera de abrigo negra, impermeable.',
    price: 24999,
    stock: 30,
    category: 'camperas',
    imageUrl: 'https://dummyimage.com/400x400/000/fff&text=Campera+Negra',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');

    // Admin
    const adminEmail = 'admin@ecommerce.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({ email: adminEmail, password: hashed, name: 'Admin', role: 'admin' });
      console.log('Usuario admin creado');
    } else {
      console.log('El usuario admin ya existe');
    }

    // Productos
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Productos dummy insertados');

    process.exit(0);
  } catch (err) {
    console.error('Error en el seed:', err);
    process.exit(1);
  }
}

seed(); 