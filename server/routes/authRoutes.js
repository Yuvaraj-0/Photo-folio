import express from 'express';
import {  register,login,  verifyToken,adminLogin , checkPhoneExists} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/refresh-token', refreshToken);
router.get('/verify', verifyToken);
router.post('/admin/login', adminLogin);
router.get('/check-phone', checkPhoneExists);
export default router;
