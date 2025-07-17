// src/pages/UploadImages.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages, clearUploadStatus } from '../redux/imageUploadSlice';
import { fetchClientAlbums } from '../redux/clientAlbumSlice'; // Assuming you have this thunk

export default function UploadImages() {
  const dispatch = useDispatch();

  // Redux states
  const { albums, status: albumsStatus } = useSelector((state) => state.clientAlbum);
  const { uploading, success, error } = useSelector((state) => state.imageUpload);

  // Local states
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Fetch albums on mount
  useEffect(() => {
    if (!albums || albums.length === 0) {
      dispatch(fetchClientAlbums());
    }
  }, [dispatch, albums]);

  // Generate image previews when files change
  useEffect(() => {
    if (!selectedFiles.length) {
      setPreviewUrls([]);
      return;
    }
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Clean up URLs on unmount or files change
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  // Handle file input or drag-drop
  const handleFilesChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      setSelectedFiles(Array.from(files));
    }
  };

  // Upload images
  const handleUpload = () => {
    console.log('Selected album ID:', selectedAlbumId,selectedFiles);

    if (!selectedAlbumId) {
      alert('Please select a client album first');
      return;
    }
    if (selectedFiles.length === 0) {
      alert('Please select some images to upload');
      return;
    }
    dispatch(uploadImages({ clientId: selectedAlbumId, images: selectedFiles }));
  };

  // Clear messages on unmount
  useEffect(() => {
    return () => dispatch(clearUploadStatus());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Upload Images</h2>

      {/* Album selector */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Client Album</label>
        {albumsStatus === 'loading' ? (
          <p>Loading albums...</p>
        ) : (
          <select
            value={selectedAlbumId}
            onChange={(e) => setSelectedAlbumId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Album --</option>
            {albums?.map((album) => (
              <option key={album._id} value={album._id}>
                {album.name} ({album.client || 'No Client Name'})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* File input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Preview */}
      {previewUrls.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-4">
          {previewUrls.map((url, i) => (
            <img key={i} src={url} alt={`preview-${i}`} className="w-full h-32 object-cover rounded" />
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`px-6 py-2 rounded text-white ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Success/Error messages */}
      {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
