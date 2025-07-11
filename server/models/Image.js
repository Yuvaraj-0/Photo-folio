import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true, unique: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);
export default Image;
