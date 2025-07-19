import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientAlbums } from '../redux/clientAlbumSlice';
import { Link } from 'react-router-dom';

export default function ClientStatus() {
  const dispatch = useDispatch();
  const { albums, status } = useSelector((state) => state.clientAlbum);

  useEffect(() => {
    dispatch(fetchClientAlbums());
  }, [dispatch]);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <header>
        <h1 className="text-3xl font-bold mb-6 text-center text-[#B9975B]">
          Client Albums
        </h1>
      </header>

      {status === 'loading' ? (
        <p className="text-center text-[#B9975B] font-semibold">Loading...</p>
      ) : albums.length === 0 ? (
        <p className="text-center italic text-gray-600">No albums found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <main className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#B9975B] text-white">
                <tr>
                  <th className="p-3 text-left">Album Name</th>
                  <th className="p-3 text-left">Client Name</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Private</th>
                  <th className="p-3 text-left">Created At</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album) => (
                  <tr
                    key={album._id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-3">{album.name}</td>
                    <td className="p-3">{album.name.split(' ')[0]}</td>
                    <td className="p-3">{album.mobile}</td>
                    <td className="p-3">{album.address}</td>
                    <td className="p-3">{album.isPrivate ? '✅' : '❌'}</td>
                    <td className="p-3">
                      {new Date(album.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/client-overview/${album._id}`}
                        className="text-indigo-600 hover:underline"
                        aria-label={`View more details for album ${album.name}`}
                      >
                        View More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>

          {/* Mobile Cards */}
          <main className="md:hidden space-y-6">
            {albums.map((album) => (
              <article
                key={album._id}
                className="bg-white rounded-lg shadow-md p-5 border border-[#B9975B]"
                aria-label={`Album ${album.name} details`}
              >
                <h2 className="text-xl font-semibold text-[#B9975B] mb-3">
                  {album.name}
                </h2>
                <dl className="space-y-1 text-gray-700">
                  <div>
                    <dt className="font-semibold inline">Client:</dt>{' '}
                    <dd className="inline">{album.name.split(' ')[0]}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Mobile:</dt>{' '}
                    <dd className="inline">{album.mobile}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Address:</dt>{' '}
                    <dd className="inline">{album.address}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Private:</dt>{' '}
                    <dd className="inline">{album.isPrivate ? '✅' : '❌'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Created At:</dt>{' '}
                    <dd className="inline">
                      {new Date(album.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
                <Link
                  to={`/client-overview/${album._id}`}
                  className="mt-4 inline-block bg-[#B9975B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#a67c1f]"
                  aria-label={`View more details for album ${album.name}`}
                >
                  View More
                </Link>
              </article>
            ))}
          </main>
        </>
      )}
    </section>
  );
}
