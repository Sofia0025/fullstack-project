import { Router } from 'express';
import User from '../models/User';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize(['admin']), async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

export default router; 