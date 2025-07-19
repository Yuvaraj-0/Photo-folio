import express from 'express';
import { createInquiry, getAllInquiries,deleteInquiry  } from '../controllers/inquiryController.js';
// import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/post-quiry', createInquiry);
router.use((req, res, next) => {
    console.log('🔁 Inquiry route middleware triggered');
    next();
  });
router.get('/get-quiry',  getAllInquiries ); // Admin-only
router.delete('/delete-quiry/:id', deleteInquiry);
export default router;
