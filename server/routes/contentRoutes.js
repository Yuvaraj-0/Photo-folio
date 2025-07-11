import express from 'express';
import {
  getContent,
  updateContent,
  createContent,
} from '../controllers/contentController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/:section', getContent);
router.post('/', authenticateJWT, isAdmin, createContent);
router.put('/:section', authenticateJWT, isAdmin, updateContent);

export default router;
