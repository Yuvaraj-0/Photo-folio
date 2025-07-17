


// CLIENT SLECRTEED IMAGE

// controller/clientImageController.js
import SelImage from '../models/SelImage.js'; // or '../models/SelImage.js' if filename changed
import ClientImage from '../models/ClientImage.js';
// CLIENT SELECTED IMAGE
export const SelectingImage = async (req, res) => {
  const { clientId, imageId } = req.body;

  if (!clientId || !imageId) {
    return res.status(400).json({ message: 'clientId and imageId are required' });
  }

  try {
    const image = await ClientImage.findById(imageId);
    if (!image) {
      return res.status(400).json({ message: 'Invalid imageId' });
    }

    const existing = await SelImage.findOne({ clientId, imageId });
    if (existing) {
      // 🔥 But maybe isDeleted is not set? Try fixing that here:
      if (!image.isDeleted) {
        await ClientImage.findByIdAndUpdate(imageId, { isDeleted: true });
      }

      return res.status(400).json({ message: 'Image already selected' });
    }

    // ✅ New selection
    const selectedImage = new SelImage({ clientId, imageId });
    await selectedImage.save();

    // ✅ Update ClientImage
    const update = await ClientImage.findByIdAndUpdate(imageId, { isDeleted: true }, { new: true });
    console.log("🟢 Updated ClientImage:", update);

    res.status(201).json({ message: 'Image selected', selectedImage });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: err.message });
  }
};







//ADMIN APROVAL 


export const approveSelImage= async (req, res) => {
    const { SelectedImage} = req.body;
  
    try {
      const updated = await CartItem.findByIdAndUpdate(cartItemId, { approved: true }, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// ✅ Get selected images for a specific client

export const getSelectedByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    // Populate only deleted images
    const selected = await SelImage.find({ clientId })
      .populate({
        path: 'imageId',
        match: { isDeleted: true }  // ✅ Get only soft-deleted images
      });

    // Filter out entries where populate didn't match (null imageId)
    const deletedOnly = selected.filter(item => item.imageId !== null);

    // Optional: Debug
    deletedOnly.forEach((item, idx) => {
      console.log(`🗑️ Deleted #${idx + 1} ID:`, item.imageId?._id);
      console.log(`🗑️ Deleted #${idx + 1} URL:`, item.imageId?.url);
    });

    res.status(200).json(deletedOnly);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const getSelectedByClient = async (req, res) => {
//   const { clientId } = req.params;
//   try {
//     // Populate 'imageId' to get full ClientImage documents, including url
//     const selected = await SelImage.find({ clientId }).populate('imageId');

//     // Log for debugging
//     selected.forEach((item, idx) => {
//       console.log(`👉 Image #${idx + 1} ID:`, item.imageId?._id);
//       console.log(`👉 Image #${idx + 1} URL:`, item.imageId?.url);
//     });

//     res.status(200).json(selected);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// ✅ Remove selected image (move back to general list)

export const softRemoveSelectedImage = async (req, res) => {
  const { clientAlbumId } = req.params;
  console.log("hittting ==>SOFT REMOVE =<<<<")

  try {
    const images = await ClientImage.find({
      clientAlbumId,
      isDeleted: true  // ✅ Show only images not soft-deleted
    });

    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/selectedImg/soft-remove/:id
// PUT /api/selectedImg/restore/:id
export const restoreSelectedImage = async (req, res) => {
  try {
    const selImageId = req.params.id;

    // 1. Set isDeleted false in SelImage
    const updatedSel = await SelImage.findByIdAndUpdate(
      selImageId,
      { isDeleted: false },
      { new: true }
    );

    if (!updatedSel) return res.status(404).json({ message: 'Selected image not found' });

    // 2. Also restore in ClientImage
    if (updatedSel.imageId) {
      await ClientImage.findByIdAndUpdate(updatedSel.imageId, {
        isDeleted: false,
      });
    }

    res.json({ message: 'Image restored', id: selImageId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};





