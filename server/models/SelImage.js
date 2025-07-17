// models/CartItem.js
import mongoose from 'mongoose';

const SelImageSchema = new mongoose.Schema({
  // url: uploadedResult.secure_url,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientAlbum', required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientImage', required: true },
  approved: { type: Boolean, default: false }, // Updated by admin
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('SelImage', SelImageSchema);
