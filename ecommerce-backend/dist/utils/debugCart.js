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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URI || '');
        console.log('=== VERIFICANDO CARRITO ===');
        const cart = yield Cart_1.default.findOne({ user: '6882dc8b97c0a777fc92027e' }).populate('items.product');
        console.log('Carrito encontrado:', JSON.stringify(cart, null, 2));
        console.log('\n=== VERIFICANDO PRODUCTO ===');
        const productId = '6882d5b322f83671e5ed4629';
        const product = yield Product_1.default.findById(productId);
        console.log('Producto encontrado:', JSON.stringify(product, null, 2));
        console.log('\n=== VERIFICANDO TODOS LOS PRODUCTOS ===');
        const allProducts = yield Product_1.default.find();
        console.log('Total de productos en DB:', allProducts.length);
        console.log('IDs de productos:', allProducts.map(p => p._id));
        process.exit(0);
    });
}
main().catch(console.error);
