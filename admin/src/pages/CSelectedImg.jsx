import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSelectedImages,
  approveSelectedImage,
  approveAllImagesByClient,
} from '../redux/clientImage';

const CSelectedImg = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const { selectedImages = [], selectStatus, selectError } = useSelector(
    (state) => state.clientImages || {}
  );

  useEffect(() => {
    if (albumId) {
      dispatch(getSelectedImages(albumId));
      console.log('Album ID:', albumId);
    }
  }, [dispatch, albumId]);

  const handleApprove = (id) => {
    dispatch(approveSelectedImage(id));
  };

  const handleApproveAll = () => {
    if (albumId) {
      dispatch(approveAllImagesByClient(albumId)).then(() => {
        dispatch(getSelectedImages(albumId)); // refresh after all approved
      });
    }
  };

  if (selectStatus === 'loading') return <p>Loading selected images...</p>;
  if (selectError) return <p>Error: {selectError}</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleApproveAll}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Approve All
        </button>
      </div>

      {selectedImages.length === 0 && <p>No selected images found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedImages.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={item.imageId?.url}
              alt="Selected"
              className="w-full h-48 object-cover rounded shadow-md"
            />
            {!item.isDeleted ? (
              <button
                onClick={() => handleApprove(item._id)}
                className="absolute bottom-2 right-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Approve
              </button>
            ) : (
              <span className="absolute bottom-2 right-2 bg-gray-400 text-white px-2 py-1 rounded">
                Approved
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSelectedImg;

