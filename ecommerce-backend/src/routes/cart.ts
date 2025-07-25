import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, cartController.getCart);
router.post('/add', authenticate, cartController.addToCart);
router.post('/remove', authenticate, cartController.removeFromCart);
router.post('/clear', authenticate, cartController.clearCart);

export default router; 