"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.getMyOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('USER ID:', req.user.id);
        const cart = yield Cart_1.default.findOne({ user: req.user.id }).populate('items.product');
        console.log('CARRITO ENCONTRADO:', cart ? 'SÍ' : 'NO');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }
        console.log('CARRITO PARA ORDEN:', JSON.stringify(cart, null, 2));
        console.log('ITEMS EN CARRITO:', cart.items.length);
        let total = 0;
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const prod = item.product;
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
        const order = yield Order_1.default.create({
            items: cart.items.map(i => ({ product: i.product, quantity: i.quantity })),
            total,
            user: req.user.id,
            status: 'pending',
        });
        cart.items = [];
        yield cart.save();
        res.status(201).json(order);
    }
    catch (err) {
        console.error('ERROR COMPLETO:', err);
        res.status(500).json({ message: 'Error al crear la orden', error: err });
    }
});
exports.createOrder = createOrder;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al obtener órdenes', error: err });
    }
});
exports.getMyOrders = getMyOrders;
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find().populate('user').sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al obtener todas las órdenes', error: err });
    }
});
exports.getAllOrders = getAllOrders;
