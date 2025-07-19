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

export const getAllClientImages = async (req, res) => {
  const { clientAlbumId } = req.params;

  try {
    const images = await ClientImage.find({
      clientAlbumId // ✅ This will return all images under that album, regardless of approval
    });

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const restoreClientImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await ClientImage.findByIdAndUpdate(
//       id,
//       { isDeleted: false },
//       { new: true }
//     );
//     if (!updated) {
//       return res.status(404).json({ message: 'Image not found' });
//     }
//     res.status(200).json({ message: 'Image restored', image: updated });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to restore image', error: err.message });
//   }
// };

// controllers/clientImage.js or SelImageControl.js (wherever your logic fits)
// import ClientImage from '../models/ClientImage.js';
import SelImage from '../models/SelImage.js';

export const restoreClientImage = async (req, res) => {
  const { id } = req.params; // This is the ClientImage _id

  try {
    // 1. Delete the selection record from SelImage collection
    const deletedSelImage = await SelImage.findOneAndDelete({ imageId: id });

    if (!deletedSelImage) {
      return res.status(404).json({ message: 'Selection not found for this image' });
    }

    // 2. Update the ClientImage isDeleted status to false
    const updatedImage = await ClientImage.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'ClientImage not found' });
    }

    res.status(200).json({
      message: 'Image restored and selection removed',
      image: updatedImage
    });
  } catch (err) {
    console.error('Error restoring image:', err.message);
    res.status(500).json({ message: 'Failed to restore image', error: err.message });
  }
};


