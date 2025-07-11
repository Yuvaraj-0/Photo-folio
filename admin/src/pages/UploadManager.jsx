import { useSelector } from 'react-redux';
import UploadDropzone from '../components/UploadDropzone';
import GalleryGrid from '../components/GalleryGrid';
import EditModal from '../components/EditModal';

export default function UploadManager() {
  // const images = useSelector((state) => state.gallery.images);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upload & Gallery Management</h1>
      <UploadDropzone />
      {/* <GalleryGrid images={images} />
      <EditModal /> */}
    </div>
  );
}
