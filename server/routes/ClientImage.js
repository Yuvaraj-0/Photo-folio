import express from 'express';
import upload from '../middleware/multer.js';
import { authenticateJWT, isUser } from '../middleware/auth.js';
import { uploadClientImages, extendExpiry } from '../controllers/uploadClientImage.js';
import { getClientImages, restoreClientImage,getAllClientImages } from '../controllers/clientImage.js';

const router = express.Router();
//  ADMIN UPLOAD BY ID ROUTE
router.post('/upload/:clientId', upload.array('images'),  uploadClientImages);
router.patch('/extend-expiry', extendExpiry);
router.get('/:clientAlbumId', getClientImages);
router.get('/getAll/:clientAlbumId', getAllClientImages);
router.put('/restore/:id', restoreClientImage)

export default router;
//authenticateJWT, isUser,