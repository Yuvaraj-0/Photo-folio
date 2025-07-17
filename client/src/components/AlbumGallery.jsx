import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotosByAlbum } from '../redux/imageSlice';

export default function AlbumGallery({ albumId }) {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.images);

  useEffect(() => {
    if (albumId) dispatch(fetchPhotosByAlbum(albumId));
  }, [dispatch, albumId]);

  if (status === 'loading') return <p className="text-center mt-10">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((img) => (
        <div key={img._id} className="overflow-hidden rounded shadow">
          <img src={img.url} alt="album" className="w-full h-64 object-cover" />
        </div>
      ))}
    </div>
  );
}
