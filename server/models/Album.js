// models/Album.js
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
  {
    type: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }, // e.g., homepage-gallery
  },
  { timestamps: true }
);

export default mongoose.model('Album', albumSchema);
