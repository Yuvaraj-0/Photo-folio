

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
app.use('/', cloudinaryRoutes);
// app.use('/api/auth', express.json());
// Root route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
