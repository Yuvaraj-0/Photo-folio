// server/controllers/clientImageController.js
import ClientImage from '../models/ClientImage.js';

// export const getClientImages = async (req, res) => {
//   try {
//     const { clientAlbumId } = req.params;

//     const images = await ClientImage.find({ clientAlbumId });

//     if (!images || images.length === 0) {
//       return res.status(404).json({ message: 'No images found for this client' });
//     }

//     res.status(200).json({ images });
//   } catch (error) {
//     console.error('Error fetching client images:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
export const getClientImages = async (req, res) => {
  const { clientAlbumId } = req.params;

  try {
    const images = await ClientImage.find({
      clientAlbumId,
      isDeleted: false  // ✅ Show only active images
    });

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const restoreClientImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ClientImage.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image restored', image: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to restore image', error: err.message });
  }
};

