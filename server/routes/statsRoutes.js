import express from 'express';
import { getStats } from '../controllers/statsController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateJWT, isAdmin, getStats);

export default router;
