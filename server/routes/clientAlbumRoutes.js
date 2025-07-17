import express from 'express';
import { createClientAlbum ,getAllClientAlbums,loginClient} from '../controllers/clientAlbumController.js';

const router = express.Router();

// POST /api/client-albums
router.post('/client-albums', createClientAlbum);
router.get('/client-albums', getAllClientAlbums);
// backend/routes/authRoutes.js (or wherever your login route is)
router.post('/login', loginClient);

  
export default router;
