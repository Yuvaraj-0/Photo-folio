import { useState } from 'react';

export default function GalleryGrid({ images }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPreview = (index) => {
    setCurrentIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No images to display</p>;
  }

  return (
    <div className="p-4">
      {/* GRID VIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img
            key={img.public_id}
            src={img.url}
            alt="Gallery"
            className="w-full h-48 object-cover rounded cursor-pointer"
            onClick={() => openPreview(index)}
          />
        ))}
      </div>

      {/* PREVIEW SLIDESHOW MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full">
            <img
              src={images[currentIndex].url}
              alt="Preview"
              className="w-full h-[80vh] object-contain rounded"
            />
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-60 px-3 py-1 rounded"
            >
              ✕
            </button>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 px-3 py-1 rounded"
            >
              ⬅
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 px-3 py-1 rounded"
            >
              ➡
            </button>
            <p className="text-center text-white mt-4 text-sm">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
