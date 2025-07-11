import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // fetchAlbums,
  fetchPhotosByAlbum,
  deleteImage,
  setSelectedAlbum,
  toggleSelectImage,
  clearSelectedImages,
  fetchAlbums,
} from '../redux/gallerySlice';

export default function AlbumGallery() {
   

  const dispatch = useDispatch();

  const { albums, selectedAlbumId, images, selectedImages, loading, error } = useSelector(
    (state) => state.gallery
  );
  const [showConfirm, setShowConfirm] = useState(false);
//   console.log("ckkk",albums.map(a => a.id));
//   console.log('Albums from Redux:', albums);
useEffect(() => {
  dispatch(fetchAlbums());
}, [dispatch]);

  useEffect(() => {
    if (selectedAlbumId) dispatch(fetchPhotosByAlbum(selectedAlbumId));
  }, [dispatch, selectedAlbumId]);

  const onAlbumClick = (id) => dispatch(setSelectedAlbum(id));
  const onPhotoClick = (id) => dispatch(toggleSelectImage(id));
  const onDeleteClick = () => setShowConfirm(true);

  const confirmDelete = async () => {
    try {
      const publicIdsToDelete = images
  .filter((img) => selectedImages.includes(img.id || img.public_id))
  .map((img) => img.public_id);

      await dispatch(deleteImage(publicIdsToDelete)).unwrap();
      dispatch(clearSelectedImages());
      setShowConfirm(false);
    } catch (err) {
      console.error('Delete failed:', err);
      // handle error, maybe show message to user
    }
  };

  const cancelDelete = () => setShowConfirm(false);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Album Gallery</h1>

      {/* Albums */}
      <div className="flex gap-2 flex-wrap mb-6">
     {
         albums.slice(0, 8).map(album => (
            <button
              key={album._id}
              onClick={() => onAlbumClick(album._id)}
              className={`px-4 py-2 rounded border ${
                album._id === selectedAlbumId ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
            >
              {album.name}
            </button>
          ))
     }
      </div>

      {/* Loading & error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Images grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id || img.public_id}
            className={`relative cursor-pointer rounded border overflow-hidden ${
              selectedImages.includes(img.id || img.public_id) ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => onPhotoClick(img.id || img.public_id)}
          >
            <img
              src={img.url || img.secure_url}
              alt={img.title || 'Photo'}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
            <input
              type="checkbox"
              checked={selectedImages.includes(img.id || img.public_id)}
              onChange={() => onPhotoClick(img.id || img.public_id)}
              className="absolute top-1 right-1 w-5 h-5"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      {/* Delete button */}
      {selectedImages.length > 0 && (
        <button
          onClick={onDeleteClick}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete {selectedImages.length} Photo{selectedImages.length > 1 ? 's' : ''}
        </button>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete {selectedImages.length} selected photo
              {selectedImages.length > 1 ? 's' : ''}?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={cancelDelete} className="px-4 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
