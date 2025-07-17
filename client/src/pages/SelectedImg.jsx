import { getSelectedImages, restoreClientImage } from '../redux/ClientImageSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const SelectedImg = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { selected, loading } = useSelector(state => state.clientImages);
  useEffect(() => {
    if (user?._id) {
      console.log('📥 Fetching selected images for client ID:', user._id);
      dispatch(getSelectedImages(user._id));
    }
  }, [dispatch, user]);
  
  const handleRemove = (clientImageId) => {
    console.log('🗑️ Remove button clicked for image:', clientImageId);
    dispatch(restoreClientImage(clientImageId)).then(() => {
      console.log('🔄 Refetching selected images after restore...');
      dispatch(getSelectedImages(user._id));
    });
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Selected Images</h2>

      {loading && <p>Loading...</p>}
      {!loading && selected.length === 0 && <p>No images selected.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {selected.map(item => (
  <div key={item._id} className="relative">
    <img src={item.imageId?.url} alt="Selected" className="rounded shadow" />
    
    <button
      onClick={() => handleRemove(item.imageId?._id)}
      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
    >
      Remove
    </button>
  </div>
))}

      </div>
    </div>
  );
};
export default SelectedImg;
