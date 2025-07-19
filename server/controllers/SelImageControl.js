


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


// controllers/selectedImageController.js


// export const approveSelImage = async (req, res) => {
//   const { selImageId } = req.params;

//   try {
//     const updated = await SelImage.findByIdAndUpdate(
//       selImageId,
//       { approved: true },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: 'Selected image not found' });
//     }

//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// In your backend routes/controller

// PATCH /api/selectedImg/approve/:selectedImageId
export const approveSelectedImage = async (req, res) => {
  const { selectedImageId } = req.params;

  try {
    const updated = await SelImage.findByIdAndUpdate(
      selectedImageId,
      { isDeleted: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Selected image not found' });

    res.status(200).json({ message: 'Image approved', updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller function to approve all selected images by clientId

// Controller function to approve all selected images by clientId
export const approveAllSelectedImages = async (req, res) => {
  const { clientId } = req.params;
  console.log("hittting -> controler ",clientId)

  try {
    const result = await SelImage.updateMany(
      { clientId, 
        approved: false },  // filter by clientId and unapproved
      { $set: { 
        approved: true } }
    );

    res.status(200).json({ 
      message: `Approved ${result.modifiedCount} images for client ${clientId}`, 
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  
// ✅ Get selected images for a specific client
// import SelImage from '../models/selImageModel.js'; // ✅ correct import

// export const getSelectedByClient = async (req, res) => {
//   try {
//     const { albumId } = req.params;

//     const images = await SelImage.find({
//       albumId,
//       isDeleted: false, // ✅ only if you're using this field
//     }).populate('imageId'); // ✅ if imageId is referenced from another model

//     if (!images.length) {
//       return res.status(404).json({ message: 'No selected images found.' });
//     }

//     res.status(200).json(images);
//   } catch (error) {
//     console.error('❌ Error in getSelectedImagesByAlbumId:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getSelectedByClient = async (req, res) => {
//   const { clientId } = req.params;

//   try {
//     // Populate only deleted images
//     const selected = await SelImage.find({ clientId })
//       .populate({
//         path: 'imageId',
//         match: { isDeleted: true }  // ✅ Get only soft-deleted images
//       });

  

//     res.status(200).json(deletedOnly);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getSelectedByClient = async (req, res) => {
  const { clientId } = req.params;
  try {
    // Populate 'imageId' to get full ClientImage documents, including url
    const selected = await SelImage.find({ clientId }).populate('imageId');

    // Log for debugging
    selected.forEach((item, idx) => {
      console.log(`👉 Image #${idx + 1} ID:`, item.imageId?._id);
      console.log(`👉 Image #${idx + 1} URL:`, item.imageId?.url);
    });

    res.status(200).json(selected);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Remove selected image (move back to general list)

// export const softRemoveSelectedImage = async (req, res) => {
//   const { clientAlbumId } = req.params;
//   console.log("hittting ==>SOFT REMOVE =<<<<")

//   try {
//     const images = await ClientImage.find({
//       clientAlbumId,
//       isDeleted: true  // ✅ Show only images not soft-deleted
//     });

//     res.status(200).json({ images });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// PUT /api/selectedImg/soft-remove/:id
// PUT /api/selectedImg/restore/:id
// export const restoreSelectedImage = async (req, res) => {
//   try {
//     const selImageId = req.params.id;

//     // 1. Set isDeleted false in SelImage
//     const updatedSel = await SelImage.findByIdAndUpdate(
//       selImageId,
//       { isDeleted: false },
//       { new: true }
//     );

//     if (!updatedSel) return res.status(404).json({ message: 'Selected image not found' });

//     // 2. Also restore in ClientImage
//     if (updatedSel.imageId) {
//       await ClientImage.findByIdAndUpdate(updatedSel.imageId, {
//         isDeleted: false,
//       });
//     }

//     res.json({ message: 'Image restored', id: selImageId });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };





