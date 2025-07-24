import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchUnapprovedImages } from '../../redux/adminAproval';

const Unapproved = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();

  const {
    unapproved = [],
    loading,
    error,
  } = useSelector((state) => state.images || {});

  useEffect(() => {
    if (clientId) {
      dispatch(fetchUnapprovedImages(clientId));
    }
  }, [dispatch, clientId]);

  if (loading) return <p>Loading unapproved images...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="pt-16">
      {/* Navigation Tabs */}
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

      {/* Empty State */}
      {unapproved.length === 0 && (
        <p className="text-center mt-6">No unapproved images found.</p>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {unapproved.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={item.imageId?.url}
              alt="Unapproved"
              className="w-full h-48 object-cover rounded shadow-md"
            />
            {item.imageId?.isDeleted && (
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

export default Unapproved;
