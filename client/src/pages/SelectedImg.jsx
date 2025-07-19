import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedImages, restoreClientImage } from '../redux/ClientImageSlice';

const SelectedImg = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { selected, loading } = useSelector(state => state.clientImages);
  const [slideshowIndex, setSlideshowIndex] = useState(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(getSelectedImages(user._id));
    }
  }, [dispatch, user]);

  const handleRemove = (clientImageId) => {
    dispatch(restoreClientImage(clientImageId)).then(() => {
      dispatch(getSelectedImages(user._id));
    });
  };

  const downloadImage = (url, filename = 'download.jpg') => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
      });
  };

  const handleDownload = (url, filename) => {
    downloadImage(url, filename);
  };

  const downloadAllImages = async () => {
    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      if (item.approved && item.imageId?.url) {
        await new Promise((resolve) => {
          downloadImage(item.imageId.url, `image-${i + 1}.jpg`);
          setTimeout(resolve, 1000);
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (slideshowIndex === null) return;
    if (e.key === 'ArrowRight') {
      setSlideshowIndex((prev) => (prev + 1) % selected.length);
    } else if (e.key === 'ArrowLeft') {
      setSlideshowIndex((prev) => (prev - 1 + selected.length) % selected.length);
    } else if (e.key === 'Escape') {
      setSlideshowIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [slideshowIndex, selected]);

  return (
    <div className="p-6 pt-20 bg-white min-h-screen font-sans text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-[#B9975B]">Selected Images</h2>
        {selected.some(img => img.approved) && (
          <button
            onClick={downloadAllImages}
            className="flex items-center gap-2 bg-[#B9975B] hover:bg-[#a67c1f] text-white px-3 py-1.5 rounded-full font-semibold text-xs shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#B9975B] focus:ring-offset-2"
            title="Download all approved images"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10V3m6 7V3m-6 7l3 3 3-3M5 17h10" />
            </svg>
            Download All
          </button>
        )}
      </div>

      {loading && <p className="text-center text-[#B9975B] font-semibold">Loading...</p>}
      {!loading && selected.length === 0 && (
        <p className="text-center text-gray-600 italic">No images selected.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {selected.map((item, index) => (
          <div
            key={item._id}
            className=" relative group cursor-pointer rounded-lg overflow-hidden shadow-lg border-2 border-transparent hover:border-[#B9975B]"
          >
            <div onClick={() => setSlideshowIndex(index)}>
              <img
                src={item.imageId?.url}
                alt="Selected"
                className="w-full h-48 object-cover rounded-lg select-none"
                draggable={false}
              />
              {!item.approved && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white bg-opacity-30 rounded-lg">
                  <div className="px-3 py-1 text-sm text-[#B9975B] font-bold rounded-full select-none shadow-lg">
                    ★ MK STAR ★
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleRemove(item.imageId?._id)}
              className="absolute top-1 right-0 bg-transparent text-red-600 hover:text-red-800 rounded text-s font-semibold transition"
            >
              ✕
            </button>

            {item.approved && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(item.imageId?.url, `image-${index + 1}.jpg`);
                }}
                className="absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 font-bold text-green-600 px-2 py-1 rounded text-xs transition"
              >
                ↓
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Slideshow Modal with padding top to prevent overlap */}
      {slideshowIndex !== null && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center pt-24">
          <button
            onClick={() => setSlideshowIndex(null)}
            className="absolute top-12 right-6  text-[#edebe8] font-bold"
          >
            ✕
          </button>

          <button
            onClick={() =>
              setSlideshowIndex((slideshowIndex - 1 + selected.length) % selected.length)
            }
            className="absolute left-8 top-1/2 translate-y-8 z-10 font-bold text-[#B9975B] hover:text-[#a67c1f] bg-white bg-opacity-80 rounded-full px-3 py-2 shadow-lg"
          >
            {'<'}
          </button>

          <div className="max-w-[90vw] max-h-[80vh] p-2 rounded-lg shadow-lg bg-white relative">
            <img
              src={selected[slideshowIndex]?.imageId?.url}
              alt="Slideshow"
              className="max-w-full max-h-full rounded-lg"
              draggable={false}
            />
            {!selected[slideshowIndex]?.approved && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white bg-opacity-30 rounded-lg">
                <div className="px-4 py-2 text-lg text-[#B9975B] font-extrabold shadow-lg rounded-full">
                  ★ MK STAR ★
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setSlideshowIndex((slideshowIndex + 1) % selected.length)}
            className="absolute right-4 font-bold text-[#141412] hover:text-[#a67c1f] bg-transparent"
          >
            <span
              className="absolute right-8 -translate-y-1/2 z-10 font-bold text-[#B9975B] hover:text-[#a67c1f] bg-white bg-opacity-80 rounded-full px-3 py-2 shadow-lg"
            >
              {'>'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectedImg;





// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSelectedImages, restoreClientImage } from '../redux/ClientImageSlice';

// const SelectedImg = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth);
//   const { selected, loading } = useSelector(state => state.clientImages);

//   const [slideshowIndex, setSlideshowIndex] = useState(null);

//   useEffect(() => {
//     if (user?._id) {
//       dispatch(getSelectedImages(user._id));
//     }
//   }, [dispatch, user]);

//   const handleRemove = (clientImageId) => {
//     dispatch(restoreClientImage(clientImageId)).then(() => {
//       dispatch(getSelectedImages(user._id));
//     });
//   };

//   const handleDownload = (url, filename) => {
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = filename || 'download.jpg';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleDownloadAll = () => {
//     selected.forEach((item, index) => {
//       handleDownload(item.imageId?.url, `image-${index + 1}.jpg`);
//     });
//   };

//   const handleKeyDown = (e) => {
//     if (slideshowIndex === null) return;
//     if (e.key === 'ArrowRight') {
//       setSlideshowIndex((prev) => (prev + 1) % selected.length);
//     } else if (e.key === 'ArrowLeft') {
//       setSlideshowIndex((prev) => (prev - 1 + selected.length) % selected.length);
//     } else if (e.key === 'Escape') {
//       setSlideshowIndex(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [slideshowIndex, selected]);

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Selected Images</h2>
//         {selected.length > 0 && (
//           <button
//             onClick={handleDownloadAll}
//             className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
//           >
//             Download All
//           </button>
//         )}
//       </div>

//       {loading && <p>Loading...</p>}
//       {!loading && selected.length === 0 && <p>No images selected.</p>}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {selected.map((item, index) => (
//           <div key={item._id} className="relative group cursor-pointer">
//             <div onClick={() => setSlideshowIndex(index)}>
//               <div className="relative">
//                 <img
//                   src={item.imageId?.url}
//                   alt="Selected"
//                   className="rounded shadow w-full"
//                 />
//                 {/* Watermark Overlay */}
//                 {/* <div className="absolute bottom-10 left-1 px-1 py-0.5 text-[10px] bg-white bg-opacity-60 text-black rounded">
//                   MK STAR
//                 </div> */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//     <div className="px-2 py-1 text-xs bg-white bg-opacity-60 text-black rounded-full backdrop-blur-sm shadow-md">
//       ★ MK STAR ★
//     </div>
//   </div>
//               </div>
//             </div>

//             {/* Remove Button */}
//             <button
//               onClick={() => handleRemove(item.imageId?._id)}
//               className="absolute top-1 right-1 bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px]"
//             >
//               ✕
//             </button>

//             {/* Download Button */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDownload(item.imageId?.url, `image-${index + 1}.jpg`);
//               }}
//               className="absolute bottom-1 right-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px]"
//             >
//               ↓
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Slideshow Modal */}
//       {slideshowIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
//           <button
//             className="absolute top-4 right-6 text-white text-xl"
//             onClick={() => setSlideshowIndex(null)}
//           >
//             ✕
//           </button>

//           <button
//             className="absolute left-4 text-white text-3xl"
//             onClick={() =>
//               setSlideshowIndex((slideshowIndex - 1 + selected.length) % selected.length)
//             }
//           >
//             ‹
//           </button>

//           <div className="relative">
//             <img
//               src={selected[slideshowIndex]?.imageId?.url}
//               alt="Slideshow"
//               className="max-w-[90vw] max-h-[80vh] rounded"
//             />
//             <div className="absolute inset-0 flex items-center justify-center">
//     <div className="px-2 py-1 text-xs bg-white bg-opacity-60 text-black rounded-full backdrop-blur-sm shadow-md">
//       ★ MK STAR ★
//     </div>
//   </div>
//           </div>

//           <button
//             className="absolute right-4 text-white text-3xl"
//             onClick={() => setSlideshowIndex((slideshowIndex + 1) % selected.length)}
//           >
//             ›
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectedImg;


