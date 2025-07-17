import express from 'express';
import { getPhotosByAlbum ,deleteImage,getImageById} from '../controllers/imageController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.get('/:albumId/photos', getPhotosByAlbum); // ✅ Correct route

router.delete('/images', authenticateJWT, isAdmin, deleteImage);
// In route
router.get('/image/:id', getImageById);
export default router;
