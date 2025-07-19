import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientImages } from '../redux/clientImage';

const CUploadedImg = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  useEffect(() => {
    if (albumId) {
      dispatch(fetchClientImages(albumId)); // now you can use albumId/clientId
    }
  }, [albumId]);
  // Grab user object safely
  const user = useSelector(state => state.auth?.user);
  console.log(user)
  // Select images state slice
  const { images, loading, error } = useSelector(state => state.clientImages);

  useEffect(() => {
    if (user?._id) {
        console.log("-->")
      dispatch(fetchClientImages(user._id));
      console.log(user._id)
    }
  }, [dispatch, user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome, {user?.username}</h2>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h3 className="text-lg font-semibold mt-4">All Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {Array.isArray(images) && images.length > 0 ? (
          images.map(img => (
            <div key={img._id} className="relative">
              <img
                src={img.url}
                alt="Client Upload"
                className="w-full h-48 object-cover rounded shadow-md"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images found.</p>
        )}
      </div>
    </div>
  );
};

export default CUploadedImg;
