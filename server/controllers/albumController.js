// controllers/albumController.js
import Album from '../models/Album.js';
import slugify from 'slugify';

export const createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name.toLowerCase());

    // Check if slug already exists
    const exists = await Album.findOne({ slug });
    if (exists) return res.status(400).json({ message: 'Album already exists' });

    const album = new Album({ name, slug });
    await album.save();

    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
