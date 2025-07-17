import cloudinary from '../config/cloudinary.js';
import ClientImage from '../models/ClientImage.js'; 
import ClientAlbum from '../models/ClientAlbum.js';

export const uploadClientImages = async (req, res) => {
  try {
    const {clientId } = req.params;
    const files = req.files;
    console.log('🔥 Multiple files upload controller');

    console.log('🖼️ req.files:', files);

console.log('Received clientId:', clientId);
    const album = await ClientAlbum.findById(clientId);
    if (!album) return res.status(404).json({ message: 'Client album not found' });

    const folder = `Client-Albums/${album.slug || clientId}`;

    const uploads = await Promise.all(
      files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder }, async (error, result) => {
            if (error) return reject(error);
            const image = await ClientImage.create({
              url: result.secure_url,
              public_id: result.public_id,
              clientAlbumId: clientId,
            });
            resolve(image);
          }).end(file.buffer);
        })
      )
    );

    res.status(201).json({ message: 'Images uploaded', uploads });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};


//Admin Expiry Set
export const extendExpiry = async (req, res) => {
  const { clientId, days } = req.body;

  try {
    const album = await ClientAlbum.findById(clientId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    const newExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    album.expiresAt = newExpiry;
    await album.save();

    res.json({ message: `Album expiry extended to ${newExpiry.toDateString()}` });
  } catch (err) {
    res.status(500).json({ message: 'Error extending expiry', error: err.message });
  }
};
