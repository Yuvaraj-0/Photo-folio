import { useState } from 'react';
import UploadImages from './UploadImages';

export default function UploadClientBT() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
 
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload to Client Album
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ❌
            </button>
            <UploadImages />
          </div>
        </div>
      )}
    </div>
  );
}
