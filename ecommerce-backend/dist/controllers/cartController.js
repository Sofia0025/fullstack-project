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
exports.clearCart = exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findOne({ user: req.user.id }).populate('items.product');
        if (!cart)
            return res.json({ items: [] });
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: err });
    }
});
exports.getCart = getCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity)
            return res.status(400).json({ message: 'Faltan datos' });
        const product = yield Product_1.default.findById(productId);
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        let cart = yield Cart_1.default.findOne({ user: req.user.id });
        if (!cart) {
            cart = yield Cart_1.default.create({ user: req.user.id, items: [{ product: productId, quantity }] });
        }
        else {
            const item = cart.items.find(i => i.product.toString() === productId);
            if (item) {
                item.quantity += quantity;
            }
            else {
                cart.items.push({ product: productId, quantity });
            }
            yield cart.save();
        }
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al agregar al carrito', error: err });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        let cart = yield Cart_1.default.findOne({ user: req.user.id });
        if (!cart)
            return res.status(404).json({ message: 'Carrito no encontrado' });
        cart.items = cart.items.filter(i => i.product.toString() !== productId);
        yield cart.save();
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al quitar del carrito', error: err });
    }
});
exports.removeFromCart = removeFromCart;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield Cart_1.default.findOne({ user: req.user.id });
        if (!cart)
            return res.status(404).json({ message: 'Carrito no encontrado' });
        cart.items = [];
        yield cart.save();
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al limpiar el carrito', error: err });
    }
});
exports.clearCart = clearCart;
