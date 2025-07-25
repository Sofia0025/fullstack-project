import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/auth';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    console.log('USER ID:', req.user.id);
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    console.log('CARRITO ENCONTRADO:', cart ? 'SÍ' : 'NO');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }
    console.log('CARRITO PARA ORDEN:', JSON.stringify(cart, null, 2));
    console.log('ITEMS EN CARRITO:', cart.items.length);
    
    let total = 0;
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      const prod = item.product as any;
      console.log(`ITEM ${i}:`, {
        quantity: item.quantity,
        productId: prod._id,
        productName: prod.name,
        productPrice: prod.price,
        priceType: typeof prod.price
      });
      if (!prod || typeof prod.price !== 'number') {
        console.log(`PRODUCTO ${i} INVÁLIDO:`, prod);
        continue;
      }
      total += item.quantity * prod.price;
      console.log(`SUBTOTAL ${i}: ${item.quantity} * ${prod.price} = ${item.quantity * prod.price}`);
    }
    console.log('TOTAL FINAL:', total);
    
    const order = await Order.create({
      items: cart.items.map(i => ({ product: i.product, quantity: i.quantity })),
      total,
      user: req.user.id,
      status: 'pending',
    });
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('ERROR COMPLETO:', err);
    res.status(500).json({ message: 'Error al crear la orden', error: err });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener órdenes', error: err });
  }
};

export const getAllOrders = async (_req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().populate('user').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener todas las órdenes', error: err });
  }
}; 