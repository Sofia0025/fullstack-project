import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';
import bcrypt from 'bcryptjs';

dotenv.config();

const categories = ['remeras', 'pantalones', 'camperas', 'zapatillas', 'accesorios'];

const productNames = [
  'Remera Básica Blanca', 'Remera Estampada', 'Remera Oversize', 'Remera Rayada',
  'Jean Slim Azul', 'Jean Mom', 'Jean Roto', 'Jean Negro',
  'Campera Negra', 'Campera de Cuero', 'Campera de Jean', 'Campera Rompevientos',
  'Zapatillas Urbanas', 'Zapatillas Running', 'Zapatillas Skate', 'Zapatillas Blancas',
  'Gorra Bordada', 'Gorra Plana', 'Bufanda Lana', 'Cinturón Cuero',
  'Short Deportivo', 'Short de Baño', 'Pantalón Jogger', 'Pantalón Cargo',
  'Camisa de Lino', 'Camisa a Cuadros', 'Camisa Manga Corta', 'Sweater Tejido',
  'Chaleco Inflable', 'Chaleco de Jean', 'Medias Altas', 'Medias Invisibles',
  'Mochila Urbana', 'Riñonera', 'Bolso de Mano', 'Guantes Invierno',
  'Parka', 'Abrigo Largo', 'Poncho', 'Pijama',
  'Top Deportivo', 'Leggings', 'Falda Plisada', 'Vestido Casual',
  'Sandalias', 'Ojotas', 'Botines', 'Botas',
  'Cartera', 'Porta Notebook', 'Lentes de Sol', 'Pulsera',
  'Collar', 'Anillo', 'Aros', 'Reloj',
  'Chomba', 'Polo', 'Chalina', 'Capa',
  'Babucha', 'Pantalón Sastrero', 'Remera Polo', 'Sweatshirt',
  'Sudadera', 'Pantalón de Vestir', 'Chaleco de Punto', 'Camiseta Interior',
  'Camisón', 'Buzo con Capucha', 'Buzo Crop', 'Buzo Estampado',
  'Remera Manga Larga', 'Remera Sin Mangas', 'Remera Deportiva', 'Remera Vintage',
  'Pantalón Chino', 'Pantalón Slim', 'Pantalón Recto', 'Pantalón Oxford',
  'Campera Puffer', 'Campera Liviana', 'Campera de Lluvia', 'Campera Bomber',
  'Zapatillas Running Mujer', 'Zapatillas Running Hombre', 'Zapatillas Trekking', 'Zapatillas Slip On',
  'Gorra Trucker', 'Gorra Snapback', 'Cinturón Trenzado', 'Cinturón Casual',
  'Short de Jean', 'Short de Algodón', 'Short de Running', 'Short de Vestir',
  'Camisa Denim', 'Camisa Formal', 'Camisa Slim', 'Sweater Cuello V',
  'Sweater Cuello Redondo', 'Sweater Oversize', 'Sweater Crop', 'Sweater Rayado',
];

function generateProducts(count: number) {
  const generated = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    const name = productNames[(i - 1) % productNames.length] + (i > productNames.length ? ` ${Math.ceil(i / productNames.length)}` : '');
    generated.push({
      name,
      description: `Descripción de la prenda: ${name}`,
      price: Math.floor(Math.random() * 20000) + 1000,
      stock: Math.floor(Math.random() * 100) + 1,
      category,
      imageUrl: `https://dummyimage.com/400x400/${(Math.random()*0xFFFFFF<<0).toString(16).padStart(6,'0')}/fff&text=${encodeURIComponent(name)}`,
    });
  }
  return generated;
}

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
    const generatedProducts = generateProducts(153);
    await Product.insertMany(generatedProducts);
    console.log('153 productos generados e insertados');

    process.exit(0);
  } catch (err) {
    console.error('Error en el seed:', err);
    process.exit(1);
  }
}

seed(); 