// server/models/ClientImage.js
import mongoose from 'mongoose';

const clientImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  clientAlbumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientAlbum',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
,  
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ClientImage', clientImageSchema);
