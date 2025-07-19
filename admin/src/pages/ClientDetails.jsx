// src/pages/ClientDetails.jsx
import { useParams, Link } from "react-router-dom";

const ClientDetails = () => {
  const { albumId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Album Overview 📸
        </h1>

        <p className="text-gray-600 text-center mb-8">
          View all uploaded and selected images for your album.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to={`/client-details/${albumId}`}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md text-center transition duration-300"
          >
            📤 See Uploaded Images
          </Link>

          <Link
            to={`/client-details/selected/${albumId}`}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md text-center transition duration-300"
          >
            ✅ See Selected Images
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;



// // src/pages/ClientStatus.jsx
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchClientAlbums } from '../redux/clientAlbumSlice';
// import { Link } from "react-router-dom";

// const ClientStatus = () => {
//   const { clientId } = useParams(); // 👈 get clientId from route
//   const dispatch = useDispatch();
//   const { albums, status } = useSelector((state) => state.clientAlbum);

//   useEffect(() => {
//     if (clientId) {
//       dispatch(fetchClientAlbums(clientId));
//     }
//   }, [dispatch, clientId]);

//   return (
//     <div>
//       <h2>Client Albums</h2>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'succeeded' && albums.map((album) => (
//         <div key={album._id}>
//           <p>{album.name}</p>
//           <Link to={`/client-details/${album._id}`}>Uploaded Images</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClientStatus;
