import mongoose from 'mongoose';



const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
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
        return v || this.email;
      },
      message: 'Phone or email is required',
    },
  },
  message: { type: String, trim: true }, // Optional if not used
  eventLocation: { type: String, trim: true },
  eventDetails: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Inquiry', inquirySchema); 