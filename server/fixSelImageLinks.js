import mongoose from 'mongoose';
import SelImage from './models/SelImage.js';
import ClientImage from './models/ClientImage.js';
import dotenv from 'dotenv';

dotenv.config();

async function fixLinks() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ DB Connected");

  const selImages = await SelImage.find().populate('imageId');

  for (const sel of selImages) {
    if (!sel.imageId || !sel.imageId.public_id) continue;

    const realClientImg = await ClientImage.findOne({ public_id: sel.imageId.public_id });

    if (realClientImg && realClientImg._id.toString() !== sel.imageId._id.toString()) {
      sel.imageId = realClientImg._id;
      await sel.save();
      console.log(`🔁 Updated SelImage ${sel._id} with correct imageId`);
    }
  }

  console.log("✅ Fix complete");
  process.exit();
}

fixLinks();
