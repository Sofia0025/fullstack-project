import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cart from '../models/Cart';
import Product from '../models/Product';

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI || '');
  
  console.log('=== VERIFICANDO CARRITO ===');
  const cart = await Cart.findOne({ user: '6882dc8b97c0a777fc92027e' }).populate('items.product');
  console.log('Carrito encontrado:', JSON.stringify(cart, null, 2));
  
  console.log('\n=== VERIFICANDO PRODUCTO ===');
  const productId = '6882d5b322f83671e5ed4629';
  const product = await Product.findById(productId);
  console.log('Producto encontrado:', JSON.stringify(product, null, 2));
  
  console.log('\n=== VERIFICANDO TODOS LOS PRODUCTOS ===');
  const allProducts = await Product.find();
  console.log('Total de productos en DB:', allProducts.length);
  console.log('IDs de productos:', allProducts.map(p => p._id));
  
  process.exit(0);
}

main().catch(console.error); 