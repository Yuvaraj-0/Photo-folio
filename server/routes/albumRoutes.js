// routes/albumRoutes.js
import express from 'express';
import { createAlbum, getAlbums } from '../controllers/albumController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/albums - Create new album (admin only)
router.post('/', authenticateJWT, isAdmin, createAlbum);

// GET /api/albums - Get all albums (public or protected)
router.get('/', getAlbums);

export default router;
