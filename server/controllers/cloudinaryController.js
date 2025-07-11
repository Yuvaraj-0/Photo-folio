import streamifier from 'streamifier';
import cloudinary from 'cloudinary';
import Album from '../models/Album.js';
import Image from '../models/Image.js';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary config:", cloudinary.v2.config());


function uploadToCloudinary(fileBuffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}
export const getSignedUrl = (req, res) => {
  const { public_id } = req.body;

  if (!public_id) return res.status(400).json({ message: 'public_id is required' });

  try {
    const signedUrl = cloudinary.utils.private_download_url(public_id, {
      resource_type: 'raw', // for PDFs
      type: 'private',
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    });

    res.json({ signedUrl });
  } catch (err) {
    console.error('Signed URL error:', err);
    res.status(500).json({ message: 'Could not generate signed URL' });
  }
};

// DEBUGGING INSTRUCTIONS:
// 1. Test this endpoint with Postman/cURL using a small image, album, and valid token.
//    - If it fails, the backend or server config is the issue.
//    - If it succeeds, the frontend request is the issue.
// 2. For Cloudinary-only test, create a minimal script to upload a buffer using your .env credentials.
// 3. Check Cloudinary dashboard for quota/errors if uploads fail.
export const uploadImage = async (req, res) => {
  console.log('🔥 Single file upload controller');
  console.log('📁 req.body.album:', req.body.album);
  console.log('🖼️ req.file:', req.file);

  try {
    const { album } = req.body;
    const file = req.file;

    if (!file || !file.buffer) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!album) {
      return res.status(400).json({ message: 'Album not provided' });
    }

    const albumDoc = await Album.findOne({ name: album });
    if (!albumDoc) {
      return res.status(400).json({ message: 'Album not found' });
    }

    const result = await uploadToCloudinary(file.buffer, 'portfolio');
    console.log('✅ Uploaded to Cloudinary:', result.secure_url);

    const image = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      album: albumDoc._id,
      uploadedBy: req.user.id,
    });

    await image.save();

    res.status(201).json({ message: 'Upload successful', image });

  } catch (err) {
    console.error('🔥 Upload failed:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};



//  GET IMAGES


export const getImages = async (req, res) => {
  try {
    const result = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'portfolio/',  // Change 'portfolio/' to your Cloudinary folder name
      resource_type: 'image',
      max_results: 100,      // Max number of images to fetch
    });

    // Map to only required data
    const images = result.resources.map(img => ({
      url: img.secure_url,
      public_id: img.public_id,
      width: img.width,
      height: img.height,
      format: img.format,
      created_at: img.created_at,
    }));

    res.json(images);
  } catch (error) {
    console.error('Cloudinary getImages error:', error);
    res.status(500).json({ message: 'Failed to get images', error: error.message });
  }
};


///updat by id


export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { tags, album } = req.body; // fields to update

  try {
    // Find image by ID and update with new fields
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { 
        ...(tags !== undefined && { tags }),
        ...(album !== undefined && { album }),
      },
      { new: true } // return the updated document
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(updatedImage);
  } catch (error) {
    console.error('Update image error:', error);
    res.status(500).json({ message: 'Failed to update image', error: error.message });
  }
};