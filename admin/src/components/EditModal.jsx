import { useSelector, useDispatch } from 'react-redux';
import { closeModal, updateMetadata } from '../redux/gallerySlice';
import { useState } from 'react';

export default function EditModal() {
  const { selectedImage, showModal } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();
  const [tags, setTags] = useState(selectedImage?.tags || '');
  const [album, setAlbum] = useState(selectedImage?.album || '');

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Image Metadata</h2>
        <input
          className="w-full border mb-3 p-2 rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          className="w-full border mb-4 p-2 rounded"
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={() => dispatch(closeModal())} className="px-4 py-2">Cancel</button>
          <button
            onClick={() => dispatch(updateMetadata({ ...selectedImage, tags, album }))}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
