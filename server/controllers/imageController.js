import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import Image from '../models/Image.js';
import Album from '../models/Album.js'; // ✅ required to resolve album._id
import slugify from 'slugify';


export const uploadImage = async (req, res) => {
  const file = req.file;
  const albumName = req.body.album || '';
  console.log('🔥 Single file upload controller');
  console.log('📁 req.body.album:', albumName);
  console.log('🖼️ req.file:', req.file);
  console.log('🙋‍♂️ Uploaded by:', req.user?._id || req.user?.email);
  // 
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Check for Cloudinary env variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ Cloudinary environment variables are missing.');
      return res.status(500).json({ message: 'Cloudinary configuration error' });
    }
    // ✅ Find album by name to get its _id
    let albumDoc = await Album.findOne({ name: albumName });
    const slug = slugify(albumName, { lower: true });
    if (!albumDoc) {
      
      albumDoc = await Album.create({ name: albumName, slug });
      console.log("🆕 New Album created:", albumDoc._id);
    } else {
      console.log("✅ Album found:", albumDoc._id);
    }
    console.log("✅ Album found:", albumDoc._id);
console.log("📤 Starting Cloudinary upload...");

    const result = await new Promise((resolve, reject) => {
      let settled = false;
      const timeout = setTimeout(() => {
        if (!settled) {
          console.error("❌ Cloudinary stream did not complete after 10 seconds");
          settled = true;
          reject(new Error('Cloudinary upload timed out after 10 seconds'));
        }
      }, 10000); // 10 seconds
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio', resource_type: 'auto' },
        (error, result) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          if (error) {
            console.error("Cloudinary upload error:", error);
            if (error.response) {
              console.error("Cloudinary error response:", error.response.body || error.response.text);
            }
            reject(error);
          } else {
            console.log("Cloudinary upload success:", result);
            resolve(result);
          }
        }
      );
      console.log("📤 Starting stream to Cloudinary...");
console.log("📦 Buffer length:", file.buffer?.length);

      streamifier.createReadStream(file.buffer).pipe(stream);
      const readStream = streamifier.createReadStream(file.buffer);
readStream.on('error', err => console.error('❌ Read stream error:', err));
readStream.pipe(stream);

    });

    const image = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      album: albumDoc._id, // ✅ now a valid ObjectId
      uploadedBy: req.user._id,
    });

    await image.save();
    return res.status(201).json(image);
    
  } catch (err) {
    console.error('❌ Upload failed:', err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await cloudinary.uploader.destroy(image.public_id);
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
