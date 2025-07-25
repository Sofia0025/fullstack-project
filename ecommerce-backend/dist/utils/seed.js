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
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
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
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI || '', {
                // @ts-ignore
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB conectado');
            // Admin
            const adminEmail = 'admin@ecommerce.com';
            const adminExists = yield User_1.default.findOne({ email: adminEmail });
            if (!adminExists) {
                const hashed = yield bcryptjs_1.default.hash('admin123', 10);
                yield User_1.default.create({ email: adminEmail, password: hashed, name: 'Admin', role: 'admin' });
                console.log('Usuario admin creado');
            }
            else {
                console.log('El usuario admin ya existe');
            }
            // Productos
            yield Product_1.default.deleteMany({});
            yield Product_1.default.insertMany(products);
            console.log('Productos dummy insertados');
            process.exit(0);
        }
        catch (err) {
            console.error('Error en el seed:', err);
            process.exit(1);
        }
    });
}
seed();
