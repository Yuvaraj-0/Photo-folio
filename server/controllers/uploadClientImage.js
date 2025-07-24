import cloudinary from '../config/cloudinary.js';
import ClientImage from '../models/ClientImage.js'; 
import ClientAlbum from '../models/ClientAlbum.js';
import SelImage from '../models/SelImage.js';
// import SelImage from '../models/SelImage'; 
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

// delete client image 

export const deleteClientImages = async (req, res) => {
  try {
    // Accept either single id or array of ids
    let { imageIds } = req.body;  // Expect { imageIds: ["id1", "id2", ...] } or { imageIds: "id1" }
    
    if (!imageIds) {
      return res.status(400).json({ message: "No image IDs provided" });
    }

    // Normalize imageIds to array
    if (!Array.isArray(imageIds)) {
      imageIds = [imageIds];
    }

    const deletionResults = await Promise.all(imageIds.map(async (id) => {
      const image = await ClientImage.findById(id);
      if (!image) return { id, status: "not found" };

      await cloudinary.uploader.destroy(image.public_id);
      await ClientImage.findByIdAndDelete(id);

      return { id, status: "deleted" };
    }));

    res.status(200).json({ message: "Deletion complete", results: deletionResults });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ message: "Failed to delete images", error: error.message });
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
