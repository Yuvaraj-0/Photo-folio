// src/pages/ClientStatus.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientAlbums } from '../redux/clientAlbumSlice';

export default function ClientStatus() {
  const dispatch = useDispatch();
  const { albums, status } = useSelector((state) => state.clientAlbum);

  useEffect(() => {
    dispatch(fetchClientAlbums());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Client Albums</h2>

      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Album Name</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Address</th>
              <th className="p-2">Private</th>
              <th className="p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album._id} className="text-center border-t">
                <td className="p-2">{album.name}</td>
                <td className="p-2">{album.name.split(' ')[0]}</td>
                <td className="p-2">{album.mobile}</td>
                <td className="p-2">{album.address}</td>
                <td className="p-2">{album.isPrivate ? '✅' : '❌'}</td>
                <td className="p-2">{new Date(album.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
