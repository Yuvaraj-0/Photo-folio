import express from 'express';
import streamifier from 'streamifier';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/multer.js'; // multer config for file uploads
import cloudinary from '../config/cloudinary.js'; // your configured cloudinary instance
import Image from '../models/Image.js';
import { uploadImage } from '../controllers/imageController.js';

import { getImages } from '../controllers/cloudinaryController.js';
import { updateImage, getSignedUrl } from '../controllers/cloudinaryController.js';


const router = express.Router();

router.post(
  '/upload',
  upload.array('images'), 
  (req, res, next) => {
    console.log('📦 Multer processed file:', req.file);
    console.log('📩 Body:', req.body);
    next(); // must call next to reach controller
  },  
  authenticateJWT, 
  isAdmin, 
                       // 2️⃣ Optional admin check ✅authenticateJWT,               // 1️⃣ Auth first ✅ sets req.user
       // 3️⃣ Multer parses file ✅
  uploadImage                    // 4️⃣ Controller runs ✅
);

// router.get('/', getImages);
// router.put('/:id', authenticateJWT, isAdmin, updateImage);
// router.post('/api/cloudinary/signed-url', getSignedUrl);
  export default router;
