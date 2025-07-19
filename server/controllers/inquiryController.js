

// controllers/inquiryController.js
import Inquiry from '../models/Inquiry.js';

// POST: Submit an inquiry
export const createInquiry = async (req, res) => {
  try {
    console.log('🔍 Inquiry body:', req.body);
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({ message: 'Inquiry submitted successfully', data: newInquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Fetch all inquiries
export const getAllInquiries = async (req, res) => {
  console.log("--> hitig get all")
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
