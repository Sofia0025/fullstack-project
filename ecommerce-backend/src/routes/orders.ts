import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Usuario
router.post('/', authenticate, orderController.createOrder);
router.get('/my', authenticate, orderController.getMyOrders);

// Admin
router.get('/', authenticate, authorize(['admin']), orderController.getAllOrders);

export default router; 