import express from 'express';
import {
  SelectingImage,
  // approveSelImage,
  approveSelectedImage,
  approveAllSelectedImages,
  getSelectedByClient,
  
  deleteSelImages,
  getUnapprovedSelImagesByClientId ,
  getapprovedSelImagesByClientId 
} from '../controllers/SelImageControl.js';

const router = express.Router();

// Select an image (client selects an image)
router.post('/selectedImg/add', SelectingImage);

// Admin approval of selected image
router.put('/selectedImg/approve/:selectedImageId', approveSelectedImage);
router.put('/approve-all/:clientId', approveAllSelectedImages);

// Get all selected images for a client
router.get('/selectedImg/:clientId', getSelectedByClient);
router.delete('/delete/sel-images', deleteSelImages);

router.get('/unapproved/:clientId', getUnapprovedSelImagesByClientId);
router.get('/approved/:clientId', getapprovedSelImagesByClientId);
// Client show main image (by clientId)
// router.get('/client-images/:clientAlbumId', getClientImagesBySelection);
// router.put('/soft-remove/:id', softRemoveSelectedImage);
// router.put('/restore/:id', restoreSelectedImage);
export default router;
