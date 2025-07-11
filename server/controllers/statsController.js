import Image from '../models/Image.js';
import Album from '../models/Album.js';
import Inquiry from '../models/Inquiry.js';

export const getStats = async (req, res) => {
  try {
    const totalImages = await Image.countDocuments();
    const totalAlbums = await Album.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();

    res.json({ totalImages, totalAlbums, totalInquiries });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
};
