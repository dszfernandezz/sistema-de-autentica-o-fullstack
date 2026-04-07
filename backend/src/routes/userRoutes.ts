import { Router } from 'express';
import { registerUser, loginUser, checkEmail, checkPhone, preSignin } from '../controllers/userController.js';

const router = Router();

// quando chegar um POST em /register chama o controller
router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/check-email', checkEmail)
router.post('/check-phone', checkPhone)
router.post('/pre-signin', preSignin);

export default router;