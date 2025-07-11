import Content from '../models/Content.js';

// GET /api/content/:section
export const getContent = async (req, res) => {
  try {
    const section = req.params.section;
    const content = await Content.findOne({ sectionName: section });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch content', error: err.message });
  }
};

// POST /api/content
export const createContent = async (req, res) => {
  try {
    const { sectionName, heading, body } = req.body;

    const existing = await Content.findOne({ sectionName });
    if (existing) {
      return res.status(400).json({ message: 'Section already exists' });
    }

    const newContent = new Content({ sectionName, heading, body });
    await newContent.save();

    res.status(201).json(newContent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create content', error: err.message });
  }
};

// PUT /api/content/:section
export const updateContent = async (req, res) => {
  try {
    const section = req.params.section;
    const { heading, body } = req.body;

    const updated = await Content.findOneAndUpdate(
      { sectionName: section },
      { heading, body },
      { new: true, upsert: true } // upsert = create if not exists
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update content', error: err.message });
  }
};
