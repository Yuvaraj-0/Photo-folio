import express from 'express';
import {
  SelectingImage,
  approveSelImage,
  getSelectedByClient,
  // getClientImagesBySelection,
 
  softRemoveSelectedImage,
  restoreSelectedImage
} from '../controllers/SelImageControl.js';

const router = express.Router();

// Select an image (client selects an image)
router.post('/selectedImg/add', SelectingImage);

// Admin approval of selected image
router.post('/approve', approveSelImage);

// Get all selected images for a client
router.get('/selectedImg/:clientId', getSelectedByClient);

// Client show main image (by clientId)
// router.get('/client-images/:clientAlbumId', getClientImagesBySelection);
router.put('/soft-remove/:id', softRemoveSelectedImage);
router.put('/restore/:id', restoreSelectedImage);
export default router;
