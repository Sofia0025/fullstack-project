import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Público
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin
router.post('/', authenticate, authorize(['admin']), productController.createProduct);
router.put('/:id', authenticate, authorize(['admin']), productController.updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), productController.deleteProduct);

export default router; 