import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchClientImages,
  sendSelectedImage,
} from '../redux/ClientImageSlice';

const WatermarkedImage = ({ src, watermark, onSelect, selected }) => (
  <div
    style={{ position: 'relative', display: 'inline-block', userSelect: 'none' }}
    // Right click is now enabled: onContextMenu handler removed
    onDragStart={(e) => e.preventDefault()}
  >
    <input
      type="checkbox"
      checked={selected}
      onChange={onSelect}
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
        transform: 'scale(1.5)',
      }}
    />
    <img
      src={src}
      alt="Client"
      className="rounded shadow"
      draggable={false}
      style={{ userSelect: 'none', width: '100%', height: 'auto' }}
    />
    {watermark && (
      <span
        style={{
          position: 'absolute',
          bottom: '70px',
          right: '50px',
          width: '100px',
          height: '100px',
          backgroundColor: 'rgba(155, 155, 155, 0.3)',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '18px',
          fontWeight: 'bold',
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: '1px 1px 2px black',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '10px',
          boxSizing: 'border-box',
          lineHeight: '1.2',
          whiteSpace: 'normal',
        }}
      >
        mk photos
      </span>
    )}
  </div>
);

const ClPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { images = [], loading, error } = useSelector((state) => state.clientImages);
  const [selectedImages, setSelectedImages] = useState([]);

  // ✅ Fetch images on mount
  useEffect(() => {
    if (user?._id) {
      console.log('📥 Dispatching fetchClientImages for:', user._id);
      dispatch(fetchClientImages(user._id));
    }
    // Right click is now enabled: contextmenu event listener removed
  }, [dispatch, user]);

  // ✅ Debug logs when images update
  useEffect(() => {
    console.log('🖼️ Images from Redux store:', images);
  }, [images]);

  const handleSelect = (img) => {
    setSelectedImages((prev) =>
      prev.find((i) => i._id === img._id)
        ? prev.filter((i) => i._id !== img._id)
        : [...prev, img]
    );
  };

  const isSelected = (imgId) => selectedImages.some((img) => img._id === imgId);
  const showWatermark = user?.role !== 'admin';

  const handleSubmitSelected = () => {
    selectedImages.forEach((img) => {
      const payload = { clientId: user._id, imageId: img._id };
      
      dispatch(sendSelectedImage(payload));
      console.log('<=>Selecting image with payload:', payload);
    });
    setSelectedImages([]);
  };

  return (
    <div className="p-4">
      <h1 className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
        <Link to="/client-home/selected-image">Selected Image</Link>
      </h1>

      <h2 className="text-xl font-bold mb-4">Welcome, {user?.username}</h2>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h3 className="text-lg font-semibold mt-4">All Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {Array.isArray(images) && images.length > 0 ? (
          images.map((img) => (
            <WatermarkedImage
              key={img._id}
              src={img.url}
              watermark={showWatermark}
              selected={isSelected(img._id)}
              onSelect={() => handleSelect(img)}
            />
          ))
        ) : (
          <p className="text-gray-500">No images found.</p>
        )}
      </div>

      {selectedImages.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6">Selected Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {selectedImages.map((img) => (
              <WatermarkedImage
                key={img._id}
                src={img.url}
                watermark={showWatermark}
                selected={true}
                onSelect={() => handleSelect(img)}
              />
            ))}
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmitSelected}
          >
            Finish Selection
          </button>
        </>
      )}
    </div>
  );
};

export default ClPage;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchClientImages } from '../redux/ClientImageSlice';

// const WatermarkedImage = ({ src, watermark }) => {
//   return (
//     <div
//       style={{ position: 'relative', display: 'inline-block', userSelect: 'none' }}
//       onContextMenu={(e) => e.preventDefault()}
//       onDragStart={(e) => e.preventDefault()}
//     >
//       <img
//         src={src}
//         alt="Client"
//         className="rounded shadow"
//         draggable={false}
//         style={{ userSelect: 'none', width: '100%', height: 'auto' }}
//       />
//       {watermark && (
//         <span
//           style={{
//             position: 'absolute',
//             bottom: '70px',
//             right: '50px',
//             width: '100px',
//             height: '100px',
//             backgroundColor: 'rgba(155, 155, 155, 0.3)',
//             color: 'rgba(255, 255, 255, 0.8)',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             pointerEvents: 'none',
//             userSelect: 'none',
//             textShadow: '1px 1px 2px black',
//             borderRadius: '50%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             textAlign: 'center',
//             padding: '10px',
//             boxSizing: 'border-box',
//             lineHeight: '1.2',
//             whiteSpace: 'normal',
//           }}
//         >
//           mk photos
//         </span>
//       )}
//     </div>
//   );
// };

// const ClPage = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { images, loading, error } = useSelector((state) => state.clientImages);

//   useEffect(() => {
//     if (user?._id) {
//       dispatch(fetchClientImages(user._id));
//     }

//     // Disable right-click for entire page
//     const handleContextMenu = (e) => e.preventDefault();
//     document.addEventListener('contextmenu', handleContextMenu);
//     return () => {
//       document.removeEventListener('contextmenu', handleContextMenu);
//     };
//   }, [dispatch, user]);

//   const showWatermark = user?.role !== 'admin';

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Welcome, {user?.username}</h2>

//       {loading && <p>Loading images...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//         {images.map((img) => (
//           <WatermarkedImage key={img._id} src={img.url} watermark={showWatermark} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClPage;


