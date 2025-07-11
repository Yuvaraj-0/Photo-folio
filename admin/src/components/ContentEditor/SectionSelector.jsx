import { useSelector, useDispatch } from 'react-redux';
import { setSection } from '../../redux/contentSlice';

export default function SectionSelector() {
  const dispatch = useDispatch();
  const selectedSection = useSelector((state) => state.content.selectedSection);

  return (
    <select
      className="w-full p-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      value={selectedSection}
      onChange={(e) => dispatch(setSection(e.target.value))}
    >
      <option value="home">Home</option>
      <option value="about">About</option>
    </select>
  );
}
