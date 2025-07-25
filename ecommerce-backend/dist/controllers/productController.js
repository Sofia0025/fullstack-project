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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, category, name } = req.query;
        const query = {};
        if (category)
            query.category = category;
        if (name)
            query.name = { $regex: name, $options: 'i' };
        const products = yield Product_1.default.find(query)
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const total = yield Product_1.default.countDocuments(query);
        res.json({ products, total });
    }
    catch (err) {
        res.status(500).json({ message: 'Error al obtener productos', error: err });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al obtener producto', error: err });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al crear producto', error: err });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Error al actualizar producto', error: err });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error al eliminar producto', error: err });
    }
});
exports.deleteProduct = deleteProduct;
