import mongoose from 'mongoose';
import User from '../models/User';
import Product from '../models/Product';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Leer y parsear el archivo mocks.json
const mocksPath = path.join(__dirname, 'mocks.json');
const mocksData = JSON.parse(fs.readFileSync(mocksPath, 'utf-8'));

// Extraer todos los productos reales del JSON
const realProducts = mocksData.data.productSearch.products.map((p: any) => {
  // Buscar la primera imagen disponible
  let imageUrl = '';
  if (p.items && p.items.length > 0 && p.items[0].images && p.items[0].images.length > 0) {
    imageUrl = p.items[0].images[0].imageUrl;
  }
  return {
    name: p.productName,
    description: p.description,
    price: p.priceRange?.sellingPrice?.lowPrice || 0,
    stock: Math.floor(Math.random() * 50) + 10,
    category: (p.categories && p.categories.length > 0) ? p.categories[0].replace(/\//g, '').toLowerCase() : 'otros',
    imageUrl,
    brand: p.brand || 'Sin marca'
  };
});

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Conectado a MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('Usuario admin creado');

    await Product.insertMany(realProducts);
    console.log(`${realProducts.length} productos reales insertados desde mocks.json`);

    console.log('Seed completado exitosamente con datos reales de mocks.json');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
};

seed(); 