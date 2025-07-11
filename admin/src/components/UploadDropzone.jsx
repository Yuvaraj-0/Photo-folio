import { useDropzone } from 'react-dropzone';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addImages } from '../redux/gallerySlice';
import axios from 'axios';

export default function UploadDropzone() {
  const dispatch = useDispatch();
  const [album, setAlbum] = useState('');
  const [file, setFile] = useState(null); // Single file
  const [preview, setPreview] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview({ url: objectUrl, name: file.name });

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];

      if (!album) {
        alert('Please select an album before uploading.');
        return;
      }

      if (!selectedFile) {
        alert('No file selected');
        return;
      }

      setFile(selectedFile);

      const formData = new FormData();
      formData.append('files', selectedFile); // ✅ single file field name
      formData.append('album', album); // ✅ album name

      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${API_URL}/api/images/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data', // let browser set it
          },
        });

        dispatch(addImages(res.data.images));
        alert('Upload successful ✅');
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed ❌');
      }
    },
    [album, dispatch, API_URL]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1, // ✅ only one file allowed
  });

  return (
    <>
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
            {isDragActive ? 'Drop the file here ✨' : 'Drag & drop image or click to upload'}
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
      {preview && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-500 mb-2">Preview:</p>
          <img
            src={preview.url}
            alt={preview.name}
            className="w-40 h-40 object-cover rounded mx-auto"
          />
        </div>
      )}
    </>
  );
}

