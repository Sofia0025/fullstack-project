import mongoose from 'mongoose';
import Product from '../models/Product';
import User from '../models/User';
import bcrypt from 'bcryptjs';

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
  // Aquí agregaremos más productos cuando tengas el JSON completo
];

async function seedRealProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Conectado a MongoDB');

    // Limpiar productos existentes
    await Product.deleteMany({});
    console.log('Productos existentes eliminados');

    // Insertar productos reales
    await Product.insertMany(realProducts);
    console.log(`${realProducts.length} productos reales insertados`);

    // Verificar si existe el usuario admin
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
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
}

seedRealProducts(); 