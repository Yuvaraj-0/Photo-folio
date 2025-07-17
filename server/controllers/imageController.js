import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import Image from '../models/Image.js';
import Album from '../models/Album.js'; // ✅ required to resolve album._id
import slugify from 'slugify';

// Fetch photos by albumId
export const getPhotosByAlbum = async (req, res) => {
  try {
    const albumId = req.params.albumId;

    // Query photos where album field matches albumId
    const photos = await Image.find({ album: albumId });
    console.log('Album ID:', albumId);
console.log('Photos:', photos);


    if (!photos) {
      return res.status(404).json({ message: 'No photos found for this album' });
    }

    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Server error fetching photos' });
  }
};

//UPLOED TO CLOUDINARY


export const uploadImage = async (req, res) => {
  const files = req.files; // for multiple files, multer must be configured with .array()
  const albumName = req.body.album || '';
  console.log('🔥 Multiple files upload controller');
  console.log('📁 req.body.album:', albumName);
  console.log('🖼️ req.files:', files);
  console.log('🙋‍♂️ Uploaded by:', req.user?._id || req.user?.email);

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    // Check Cloudinary env vars
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ Cloudinary environment variables are missing.');
      return res.status(500).json({ message: 'Cloudinary configuration error' });
    }

    // Find or create album doc
    let albumDoc = await Album.findOne({ name: albumName });
    const slug = slugify(albumName, { lower: true });
    if (!albumDoc) {
      albumDoc = await Album.create({ name: albumName, slug });
      console.log("🆕 New Album created:", albumDoc._id);
    } else {
      console.log("✅ Album found:", albumDoc._id);
    }

    const savedImages = [];

    for (const file of files) {
      console.log("📤 Starting Cloudinary upload for a file...");

      const result = await new Promise((resolve, reject) => {
        let settled = false;
        const timeout = setTimeout(() => {
          if (!settled) {
            console.error("❌ Cloudinary stream did not complete after 10 seconds");
            settled = true;
            reject(new Error('Cloudinary upload timed out after 10 seconds'));
          }
        }, 10000);

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

        console.log("📦 Buffer length:", file.buffer?.length);
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      const image = new Image({
        url: result.secure_url,
        public_id: result.public_id,
        album: albumDoc._id,
        uploadedBy: req.user._id,
      });

      await image.save();
      savedImages.push(image);
    }

    return res.status(201).json(savedImages);

  } catch (err) {
    console.error('❌ Upload failed:', err);
    return res.status(500).json({ message: err.message });
  }
};


//DELETE IMAGE FORM BOTH


export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id || public_id.length === 0) {
      return res.status(400).json({ message: 'No public_id provided' });
    }

    // Delete from Cloudinary
    const cloudResult = await cloudinary.uploader.destroy(public_id[0]); // Use array if that's how you're sending it
    console.log('☁️ Cloudinary deletion result:', cloudResult);

    // Optional: if Cloudinary deletion fails, throw
    if (cloudResult.result !== 'ok' && cloudResult.result !== 'not found') {
      throw new Error('Cloudinary deletion failed');
    }

    // Delete from MongoDB
    await Image.deleteOne({ public_id: public_id[0] });

    res.status(200).json({ message: 'Deleted from Cloudinary and MongoDB' });
  } catch (error) {
    console.error('❌ Delete failed:', error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};


// imageController.js

export const getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(image); // returns full image object: url, public_id, etc.
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

