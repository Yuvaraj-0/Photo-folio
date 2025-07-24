import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApprovedImages } from '../../redux/adminAproval'; // adjust path if needed
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Approved = () => {
  const dispatch = useDispatch();
  const { clientId } = useParams();

  const { approved = [], loading, error } = useSelector((state) => state.images || {});

  useEffect(() => {
    if (clientId) {
      dispatch(fetchApprovedImages(clientId));
    }
  }, [dispatch, clientId]);

  if (loading) return <p>Loading approved images...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
        <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
        <div className="grid grid-cols-2 text-center">
          <Link
            to={`/approved-img/${clientId}`}
            className="py-3 text-base font-semibold text-blue-700 hover:bg-blue-100 border-r"
          >
            Approved
          </Link>
          <Link
            to={`/unapproved-img/${clientId}`}
            className="py-3 text-base font-semibold text-red-700 hover:bg-red-100"
          >
            Unapproved
          </Link>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Approved Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {approved.map((img) => (
          <div key={img._id} className="border rounded-lg overflow-hidden">
            <img
              src={img.imageId?.url}
              alt="Approved"
              className="w-full object-cover"
              style={{ height: '200px' }} // optionally fix height to show full image nicely
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approved;
