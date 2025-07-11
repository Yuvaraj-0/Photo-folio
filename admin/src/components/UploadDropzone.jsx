import { useDropzone } from 'react-dropzone';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImages } from '../redux/gallerySlice';

export default function UploadDropzone() {
  const dispatch = useDispatch();
  const [album, setAlbum] = useState('');
  const [files, setFiles] = useState([]); // Multiple files
  const [previews, setPreviews] = useState([]); // Image preview objects

  // Create and cleanup preview URLs
  useEffect(() => {
    if (!files.length) {
      setPreviews([]);
      return;
    }

    const urls = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPreviews(urls);

    return () => {
      urls.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [files]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!album) {
        alert('Please select an album before uploading.');
        return;
      }

      if (acceptedFiles.length === 0) {
        alert('No photos selected');
        return;
      }

      setFiles(acceptedFiles); // Save selected files for preview

      try {
        await dispatch(uploadImages({ images: acceptedFiles, album })).unwrap();
        alert('Upload successful ✅');
        setFiles([]); // Clear preview after success
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed ❌');
      }
    },
    [album, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
  });

  return (
    <>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ease-in-out ${
          isDragActive
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105 shadow-lg'
            : 'bg-white hover:bg-gray-50 text-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg
            className={`w-12 h-12 transition-transform duration-500 ${
              isDragActive ? 'animate-bounce text-white' : 'text-purple-500'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3.5 7.5M7 4l3.5 3.5M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0h4m-4 0V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
            />
          </svg>
          <p className="text-lg font-semibold">
            {isDragActive ? 'Drop the files here ✨' : 'Drag & drop images or click to upload'}
          </p>
          <p className="text-sm text-gray-400">PNG, JPG, max 10MB</p>
        </div>
      </div>

      {/* Album Selector */}
      <select
        name="album"
        id="album"
        onChange={(e) => setAlbum(e.target.value)}
        className="mt-4 w-full border p-2 rounded"
        value={album}
      >
        <option value="">Select Album</option>
        <option value="Portrait">Portrait</option>
        <option value="Pre-Wedding">Pre-Wedding</option>
        <option value="Wedding">Wedding</option>
        <option value="Engagement">Engagement</option>
        <option value="Birthday">Birthday</option>
        <option value="Baby">Baby</option>
        <option value="Functions">Functions</option>
        <option value="Photoshoot">Photoshoot</option>
      </select>

      {/* Preview */}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((file, idx) => (
            <img
              key={idx}
              src={file.url}
              alt={file.name}
              className="w-32 h-32 object-cover rounded shadow"
            />
          ))}
        </div>
      )}
    </>
  );
}

