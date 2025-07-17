// src/components/AlbumPhotoshoot.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotosByAlbum } from '../redux/imageSlice';
import GalleryGrid from './GalleryGrid';

export default function Uniq() {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.images);

  useEffect(() => {
    const photoshootAlbumId = "6870e60ed673daf8bb81cecf"; // 🔁 Replace with real MongoDB _id
    dispatch(fetchPhotosByAlbum(photoshootAlbumId));
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif text-center mb-8 tracking-wider">Selected Work</h1>
      <GalleryGrid images={images} />
    </div>
  );
}
