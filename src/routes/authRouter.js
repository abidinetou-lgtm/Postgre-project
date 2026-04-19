import { Router } from 'express';
import authController from '../controllers/authController.js';
import authenticate from '../middlewares/autthenticate.js';
 
const router = Router();
 
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authenticate, authController.me);
 
export default router;
