// src/pages/ClientManager.jsx
import { useState } from 'react';
import AddClient from './AddClient';

export default function ClientManager() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Client
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded shadow-lg p-6 w-full max-w-md">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
            >
              ✖
            </button>
            <AddClient />
          </div>
        </div>
      )}
    </div>
  );
}
