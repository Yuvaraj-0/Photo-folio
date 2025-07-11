// models/Inquiry.js
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Optional: allow only if phone is not provided
        return v || this.phone;
      },
      message: 'Email or phone is required',
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        // Optional: allow only if email is not provided
        return v || this.email;
      },
      message: 'Phone or email is required',
    },
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Inquiry', inquirySchema);
