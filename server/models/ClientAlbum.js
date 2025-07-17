// server/models/ClientAlbum.js
import mongoose from 'mongoose';

const clientAlbumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    address: { type: String },
    isPrivate: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('ClientAlbum', clientAlbumSchema);
