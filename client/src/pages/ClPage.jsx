//the page contain onlu view the admin uploaded image with selected box and each image hace selection option with slideshow 



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClientImages, sendSelectedImage } from '../redux/ClientImageSlice';

const WatermarkedImage = ({ src, watermark, selected, onToggleSelect, onClickImage }) => (
  <div
    className={`relative rounded overflow-hidden shadow-lg border-2 ${
      selected ? 'border-[#B9975B]' : 'border-transparent'
    } cursor-pointer`}
    role="checkbox"
    aria-checked={selected}
    tabIndex={0}
    onClick={onClickImage}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClickImage();
      }
    }}
  >
    <img
      src={src}
      alt="Client upload"
      className="w-full h-48 object-cover select-none pointer-events-none"
      draggable={false}
    />

    {/* Centered watermark */}
    {watermark && (
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(185, 157, 85, 0.5)',
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '16px',
          fontWeight: 'bold',
          pointerEvents: 'none',
          userSelect: 'none',
          padding: '6px 16px',
          borderRadius: '24px',
          textShadow: '1px 1px 3px black',
          whiteSpace: 'nowrap',
          letterSpacing: '1px',
        }}
      >
        MK Photos
      </span>
    )}

    {/* Small checkbox top-left */}
    <input
      type="checkbox"
      checked={selected}
      onChange={e => {
        e.stopPropagation();
        onToggleSelect();
      }}
      onClick={e => e.stopPropagation()}
      className="absolute top-2 left-2 w-5 h-5 cursor-pointer accent-[#B9975B]"
      aria-label={selected ? 'Deselect image' : 'Select image'}
    />
  </div>
);

const ClPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { images = [], loading, error } = useSelector(state => state.clientImages);
  const [selectedImages, setSelectedImages] = useState([]);

  // Slideshow modal state: index of current slideshow image in images array
  const [previewIndex, setPreviewIndex] = useState(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchClientImages(user._id));
    }
  }, [dispatch, user]);

  const toggleSelectById = (imgId) => {
    setSelectedImages(prev =>
      prev.find(i => i._id === imgId)
        ? prev.filter(i => i._id !== imgId)
        : [...prev, images.find(img => img._id === imgId)]
    );
  };

  const isSelected = (imgId) => selectedImages.some(img => img._id === imgId);

  const showWatermark = user?.role !== 'admin';

  const handleSubmitSelected = () => {
    selectedImages.forEach(img => {
      dispatch(sendSelectedImage({ clientId: user._id, imageId: img._id }));
    });
    setSelectedImages([]);
    setPreviewIndex(null);
  };

  const prevPreview = () => {
    setPreviewIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextPreview = () => {
    setPreviewIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const closePreview = () => setPreviewIndex(null);

  const startSlideshow = () => {
    if (selectedImages.length > 0) {
      const firstSelectedIndex = images.findIndex(img => img._id === selectedImages[0]._id);
      setPreviewIndex(firstSelectedIndex !== -1 ? firstSelectedIndex : 0);
    }
  };

  // Shared button style for slideshow controls: no background, small circle with border and accent color
  const controlButtonClass =
    "w-8 h-8 rounded-full border border-[#B9975B] text-[#B9975B] flex items-center justify-center cursor-pointer hover:bg-[#B9975B] hover:text-white transition select-none";

  // Smaller checkbox style for slideshow
  const checkboxStyle = "w-6 h-6 cursor-pointer accent-[#B9975B]";

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 pt-28 relative font-sans">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#B9975B]">Welcome, {user?.username}</h1>
        <Link
          to="/client-home/selected-image"
          className="text-[#B9975B] hover:underline font-semibold"
        >
          View Selected
        </Link>
      </header>

      {/* Selected count badge top-left */}
      {selectedImages.length > 0 && (
        <div
          className="fixed top-24 left-6 bg-[#B9975B] text-white px-4 py-2 rounded-full font-semibold shadow-md cursor-pointer select-none z-40"
          onClick={startSlideshow}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              startSlideshow();
              e.preventDefault();
            }
          }}
          aria-label={`Selected images count: ${selectedImages.length}. Click to start slideshow.`}
          title="Click to start slideshow"
        >
          Selected: {selectedImages.length}
        </div>
      )}

      {loading && <p className="text-center text-gray-500">Loading images...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Grid of all images */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((img, idx) => (
            <WatermarkedImage
              key={img._id}
              src={img.url}
              watermark={showWatermark}
              selected={isSelected(img._id)}
              onToggleSelect={() => toggleSelectById(img._id)}
              onClickImage={() => setPreviewIndex(idx)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No images found.</p>
        )}
      </section>

      {/* Manual slideshow modal */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview slideshow"
        >
          <div
            className="relative flex items-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Selection checkbox left side */}
            <input
              type="checkbox"
              checked={isSelected(images[previewIndex]._id)}
              onChange={() => toggleSelectById(images[previewIndex]._id)}
              className={checkboxStyle + " mr-4"}
              aria-label={isSelected(images[previewIndex]._id) ? 'Deselect image' : 'Select image'}
            />

            <img
              src={images[previewIndex].url}
              alt={`Preview ${previewIndex + 1}`}
              className="max-w-[90vw] max-h-[80vh] rounded-lg object-contain select-none"
              draggable={false}
            />

            {/* Selection checkbox right side */}
            <input
              type="checkbox"
              checked={isSelected(images[previewIndex]._id)}
              onChange={() => toggleSelectById(images[previewIndex]._id)}
              className={checkboxStyle + " ml-4"}
              aria-label={isSelected(images[previewIndex]._id) ? 'Deselect image' : 'Select image'}
            />

            {/* Centered watermark */}
            {showWatermark && (
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(185, 157, 85, 0.5)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  textShadow: '1px 1px 3px black',
                  whiteSpace: 'nowrap',
                  letterSpacing: '1.5px',
                }}
              >
                MK Photos
              </span>
            )}

            {/* Close button */}
            <button
              className={controlButtonClass + " absolute top-2 right-2"}
              onClick={closePreview}
              aria-label="Close preview"
            >
              &times;
            </button>

            {/* Prev / Next */}
            <button
              className={controlButtonClass + " absolute left-2 top-1/2 transform -translate-y-1/2"}
              onClick={prevPreview}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className={controlButtonClass + " absolute right-2 top-1/2 transform -translate-y-1/2"}
              onClick={nextPreview}
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          {/* Single selection checkbox fixed at bottom of modal */}
          <div
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-6 py-3 rounded-full flex items-center space-x-3 z-50"
            onClick={e => e.stopPropagation()} // prevent modal close when clicking this box
          >
            <input
              type="checkbox"
              checked={isSelected(images[previewIndex]._id)}
              onChange={() => toggleSelectById(images[previewIndex]._id)}
              className="w-6 h-6 cursor-pointer accent-[#B9975B]"
              aria-label={isSelected(images[previewIndex]._id) ? 'Deselect image' : 'Select image'}
            />
            <span className="text-white font-semibold select-none">
              {isSelected(images[previewIndex]._id) ? 'Selected' : 'Not Selected'}
            </span>
          </div>
        </div>
      )}

      {/* Fixed bottom finish button when selections exist */}
      {selectedImages.length > 0 && (
        <button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-[#B9975B] hover:bg-[#a67c1f] text-white rounded-full font-semibold shadow-lg transition z-40"
          onClick={handleSubmitSelected}
        >
          Finish Selection ({selectedImages.length})
        </button>
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


