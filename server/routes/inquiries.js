import express from 'express';
import { createInquiry, getInquiries } from '../controllers/inquiryController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', authenticateJWT, isAdmin, getInquiries); // Admin-only

export default router;
