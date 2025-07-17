

// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import cloudinaryImagesRoutes from './routes/cloudinaryImages.js';
import statsRoutes from './routes/statsRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cloudinaryRoutes from './routes/cloudinaryImages.js';
import inquiriesRoutes from './routes/inquiries.js';
import contentRoutes from './routes/contentRoutes.js';
import imageByAlbum from  './routes/imageRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import imageById from './routes/imageRoutes.js'
import clientAlbumRoutes from './routes/clientAlbumRoutes.js';
import uploadClientImages from './routes/ClientImage.js';
import extendExpiry from './routes/ClientImage.js';

import authRoute from './routes/clientAlbumRoutes.js';
import clientImageRoutes from './routes/ClientImage.js';
import SelImageRoutes from './routes/SelImage.js'
import SelImageAprovalRoutes from './routes/SelImage.js'
import getselecttedimg from './routes/SelImage.js'
import SoftDelete from './routes/SelImage.js'
import RestoreDelete from './routes/SelImage.js'

dotenv.config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB Atlas
connectDB();

app.use('/api/cloudinary-images', cloudinaryImagesRoutes);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`➡️ Incoming: ${req.method} ${req.url}`);
  console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
  next();
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/images', cloudinaryRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/album',imageByAlbum)
app.use('/api/album', imageRoutes);
app.use('/api', imageRoutes);
app.use('/api', imageById);
app.use('/', cloudinaryRoutes);
// add client data
app.use('/api', clientAlbumRoutes);
// get client data
app.use('/api', clientAlbumRoutes);
//upload client photots
app.use('/api',uploadClientImages)
// admit set expiry phtots
app.use('/api',extendExpiry)

// ✅ Login route is now /api/login
app.use('/api', authRoute); 
// FETCH IMAGE BY USER :ID
app.use('/api/client-images', clientImageRoutes)
// CLIENT SELCTED IMAGE TO DB
app.use('/api',SelImageRoutes)

// GET SELECTED CLIENT-IMAGE
app.use('/api',getselecttedimg)
// ADMIN APROVE SELECTED IMG
app.use('/api',SelImageAprovalRoutes)
// SOFT REMOCE 
app.use('/api',SoftDelete)
// RESTORE SELECTD IMAGE
app.use('/api',RestoreDelete )



app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
