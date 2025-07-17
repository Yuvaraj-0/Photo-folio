// src/pages/AddClient.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'slugify';
import { createClientAlbum, clearStatus } from '../redux/clientAlbumSlice';

export default function AddClient() {
  const dispatch = useDispatch();
  const { status, message, error } = useSelector((state) => state.clientAlbum);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = slugify(name, { lower: true });
    const payload = {
      name,
      mobile,
      address,
      slug,
      username,
      password,
      isPrivate: true,
    };
    dispatch(createClientAlbum(payload));
  };

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      const timer = setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Client Album</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Client Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Mobile Number</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating...' : 'Create Album'}
        </button>
      </form>
    </div>
  );
}
