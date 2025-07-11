import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  sectionName: { type: String, required: true, unique: true },
  heading: { type: String, default: '' },
  body: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
