// controllers/inquiryController.js
import Inquiry from '../models/Inquiry.js';

export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = new Inquiry({ name, email, message, date: new Date() });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted', inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
