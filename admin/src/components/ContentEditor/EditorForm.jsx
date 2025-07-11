import { useSelector, useDispatch } from 'react-redux';
import { updateContent } from '../../redux/contentSlice';
import { useState, useEffect } from 'react';

export default function EditorForm() {
  const dispatch = useDispatch();
  const { selectedSection, content } = useSelector((state) => state.content);
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setHeading(content[selectedSection].heading);
    setBody(content[selectedSection].body);
  }, [selectedSection, content]);

  const handleSave = () => {
    dispatch(updateContent({ section: selectedSection, heading, body }));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1500);
  };

  const handleReset = () => {
    setHeading(content[selectedSection].heading);
    setBody(content[selectedSection].body);
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Heading"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <textarea
        className="w-full h-40 p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Body content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button onClick={handleReset} className="px-4 py-2 border rounded hover:bg-gray-100">Reset</button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
      </div>
      {showSaved && <p className="text-green-500 text-sm mt-2">Saved ✅</p>}
    </div>
  );
}

