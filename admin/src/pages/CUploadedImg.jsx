import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientImages } from '../redux/clientImage';
import {
  deleteClientImages,
} from '../redux/imageUploadSlice';
import { Trash2 } from "lucide-react";

const CUploadedImg = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const user = useSelector(state => state.auth?.user);
  const { images, loading, error } = useSelector(state => state.clientImages);
  const [selectedImages, setSelectedImages] = useState([]);

  // Fetch images on load or when album/user changes
  useEffect(() => {
    if (albumId) {
      dispatch(fetchClientImages(albumId));
    } else if (user?._id) {
      dispatch(fetchClientImages(user._id));
    }
  }, [albumId, user, dispatch]);

  const refreshImages = () => {
    if (albumId) {
      dispatch(fetchClientImages(albumId));
    } else if (user?._id) {
      dispatch(fetchClientImages(user._id));
    }
  };

  const toggleImageSelection = (id) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const handleSingleDelete = async (id) => {
    await dispatch(deleteClientImages([id]));
    setSelectedImages(prev => prev.filter(imgId => imgId !== id));
    refreshImages(); // Refresh list after delete
  };

  const handleMultipleDelete = async () => {
    if (selectedImages.length === 0) return;
    await dispatch(deleteClientImages(selectedImages));
    setSelectedImages([]);
    refreshImages(); // Refresh list after delete
  };

  // New: Delete all images in one click with confirmation popup
  const handleDeleteAll = async () => {
    if (!images.length) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL images? This action cannot be undone."
    );
    if (!confirmDelete) return;  // Abort if user cancels
    const allImageIds = images.map(img => img._id);
    await dispatch(deleteClientImages(allImageIds));
    setSelectedImages([]);
    refreshImages(); // Refresh list after delete
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome, {user?.username}</h2>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Delete All Images Button */}
      {images.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="bg-red-700 text-white px-4 py-2 rounded mb-4 mr-2"
        >
          Delete All Images
        </button>
      )}

      {/* Delete Selected Button */}
      {selectedImages.length > 0 && (
        <button
          onClick={handleMultipleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded mb-4"
        >
          Delete Selected ({selectedImages.length})
        </button>
      )}

      <h3 className="text-lg font-semibold mt-4">All Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {Array.isArray(images) && images.length > 0 ? (
          images.map(img => (
            <div key={img._id} className="relative border rounded shadow-md p-1">
              <input
                type="checkbox"
                className="absolute top-2 left-2 z-10"
                checked={selectedImages.includes(img._id)}
                onChange={() => toggleImageSelection(img._id)}
              />
              <img
                src={img.url}
                alt="Client Upload"
                className="w-full h-48 object-cover rounded"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                onClick={() => handleSingleDelete(img._id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images found.</p>
        )}
      </div>
    </div>
  );
};

export default CUploadedImg;





// import React, { useEffect } from 'react';
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchClientImages } from '../redux/clientImage';

// const CUploadedImg = () => {
//   const dispatch = useDispatch();
//   const { albumId } = useParams();
//   useEffect(() => {
//     if (albumId) {
//       dispatch(fetchClientImages(albumId)); // now you can use albumId/clientId
//     }
//   }, [albumId]);
//   // Grab user object safely
//   const user = useSelector(state => state.auth?.user);
//   console.log(user)
//   // Select images state slice
//   const { images, loading, error } = useSelector(state => state.clientImages);

//   useEffect(() => {
//     if (user?._id) {
//         console.log("-->")
//       dispatch(fetchClientImages(user._id));
//       console.log(user._id)
//     }
//   }, [dispatch, user]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Welcome, {user?.username}</h2>

//       {loading && <p>Loading images...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <h3 className="text-lg font-semibold mt-4">All Images</h3>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//         {Array.isArray(images) && images.length > 0 ? (
//           images.map(img => (
//             <div key={img._id} className="relative">
//               <img
//                 src={img.url}
//                 alt="Client Upload"
//                 className="w-full h-48 object-cover rounded shadow-md"
//               />
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No images found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CUploadedImg;
