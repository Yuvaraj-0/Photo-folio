// src/components/AlbumPhotoshoot.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotosByAlbum } from '../redux/imageSlice';

export default function AlbumPhotoshoot() {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.images);

  useEffect(() => {
    const photoshootAlbumId = "6870e60ed673daf8bb81cecf"; // Replace with your MongoDB album ID
    dispatch(fetchPhotosByAlbum(photoshootAlbumId));
  }, [dispatch]);

  if (status === 'loading') return <p className="text-center text-yellow-600">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-xl shadow-lg">
      {/* SEO-friendly heading */}
      <h1 className="text-4xl md:text-5xl font-serif font-semibold text-center text-yellow-600 mb-8 leading-tight">
        Selected <span className="text-gray-900">Photoshoots</span>
      </h1>

      {/* SEO meta-friendly subtitle */}
      <p className="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
        Explore our exclusive handpicked collection of artistic and professional photoshoots tailored to inspire.
      </p>

      {/* Responsive Masonry Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img) => (
          <img
            key={img._id}
            src={img.url}
            alt={img.title || "Photoshoot image"}
            loading="lazy"
            className="w-full rounded-xl shadow-md hover:scale-105 transition-transform duration-300 object-cover"
          />
        ))}
      </div>
    </section>
  );
}
