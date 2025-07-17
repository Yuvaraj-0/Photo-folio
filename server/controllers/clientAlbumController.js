// server/controllers/clientAlbumController.js
import ClientAlbum from '../models/ClientAlbum.js';
import jwt from 'jsonwebtoken';

export const loginClient = async (req, res) => {
  try {
    const { username, password } = req.body; // Use POST body ideally

    const client = await ClientAlbum.findOne({ username });
    if (!client || client.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: client._id, username: client.username },
      process.env.JWT_SECRET,  // store secret in .env
      { expiresIn: '1h' }
    );

    res.json({ user: client, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




export const createClientAlbum = async (req, res) => {
  try {
    const { name, slug, mobile, address, isPrivate, username, password } = req.body;

    // check duplicate username
    const exists = await ClientAlbum.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newAlbum = new ClientAlbum({ name, slug, mobile, address, isPrivate, username, password });
    await newAlbum.save();

    res.status(201).json({ message: 'Client album created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating client album', error: err.message });
  }
};


// get user details 
export const getAllClientAlbums = async (req, res) => {
    try {
      const albums = await ClientAlbum.find().sort({ createdAt: -1 });
      res.json(albums);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching client albums' });
    }
  };