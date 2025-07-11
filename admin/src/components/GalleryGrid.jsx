import { useDispatch } from 'react-redux';
import {  selectImage } from '../redux/gallerySlice';

export default function GalleryGrid({ images }) {
  const dispatch = useDispatch();
  console.log('Gallery images:', images);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4">
      {images.map((img) => 
  img && img.url && img.public_id ? (
    <div key={img.public_id} className="relative group rounded shadow-md overflow-hidden">
      <img
        src={img.url}
        alt="gallery"
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => dispatch(selectImage(img))}
          className="bg-white text-sm px-2 py-1 rounded shadow"
        >
          Edit
        </button>
        <button
          onClick={() => dispatch(removeImage(img.public_id))}
          className="bg-red-600 text-white text-sm px-2 py-1 rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  ) : null
)}

    </div>
  );
}
