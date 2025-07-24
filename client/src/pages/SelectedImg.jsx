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

  const downloadAllImages = async () => {
    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      if (item.approved && item.imageId?.url) {
        await new Promise(resolve => {
          downloadImage(item.imageId.url, `image-${i + 1}.jpg`);
          setTimeout(resolve, 800);
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
    <div className="min-h-screen w-full bg-white text-gray-900 font-sans pt-[80px]">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Selected Images</h2>
        {selected.some(img => img.approved) && (
          <button
            onClick={downloadAllImages}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded shadow-sm transition"
            title="Download all approved images"
          >
            Download All
          </button>
        )}
      </header>

      {loading && <p className="text-center text-yellow-600 font-medium">Loading...</p>}
      {!loading && selected.length === 0 && (
        <p className="text-center text-gray-400 italic">No images selected.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {selected.map((item, index) => (
          <div
            key={item._id}
            className="relative cursor-pointer rounded shadow border border-gray-200 hover:shadow-md transition"
          >
            <img
              src={item.imageId?.url}
              alt="Selected"
              className={`w-full h-40 object-cover rounded ${!item.approved ? 'opacity-70' : ''}`}
              onClick={() => setSlideshowIndex(index)}
              draggable={false}
            />
            {!item.approved && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 rounded">
                <span className="text-yellow-500 font-bold text-sm select-none">★ MK STAR ★</span>
              </div>
            )}

<button
  onClick={(e) => {
    e.stopPropagation();
    handleRemove(item.imageId?._id);
  }}
  className="bg-white rounded-full border border-gray-200 w-1 h-6 flex items-center justify-center absolute top-1 right-1 text-red-600 hover:text-red-800 text-xlg font-bold transition bg-transparent focus:outline-none focus:ring-0"
  title="Remove from selected"
>
  &times;
</button>


            {item.approved && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(item.imageId?.url, `image-${index + 1}.jpg`);
                }}
                className="absolute bottom-1 right-1 bg-green-100 text-green-700 rounded px-2 text-xs font-semibold hover:bg-green-200 transition"
                title="Download image"
              >
                ↓
              </button>
            )}
          </div>
        ))}
      </div>

      {slideshowIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95 p-4">
          <button
            onClick={() => setSlideshowIndex(null)}
            className="absolute top-5 right-5 text-gray-700 text-3xl font-bold hover:text-gray-900"
            title="Close slideshow"
          >
            &times;
          </button>

          <button
            onClick={() => setSlideshowIndex((slideshowIndex - 1 + selected.length) % selected.length)}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full px-3 py-2 text-xl hover:bg-gray-300"
            title="Previous image"
          >
            ‹
          </button>

          <img
            src={selected[slideshowIndex]?.imageId?.url}
            alt="Slideshow"
            className="max-w-full max-h-[80vh] rounded shadow-lg"
            draggable={false}
          />

          {!selected[slideshowIndex]?.approved && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 rounded-lg pointer-events-none">
              <span className="text-yellow-500 font-bold text-xl select-none">★ MK STAR ★</span>
            </div>
          )}

          <button
            onClick={() => setSlideshowIndex((slideshowIndex + 1) % selected.length)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full px-3 py-2 text-xl hover:bg-gray-300"
            title="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectedImg;



