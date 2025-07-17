import { Routes, Route, Link } from 'react-router-dom';
 // adjust path

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';

import Portrait from './pages/Portait';
import PreWedding from './pages/Pre-Wedding';
import BabyShoot from './pages/BabyShoot';
import BirthParty from './pages/Birth-Party';
import Wedding from './pages/Wedding';
import ClPage from './pages/ClPage';
import SelectedImg from './pages/SelectedImg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); // 👈 load into Redux
    }
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<LoginPage />} />
       
        {/* Add more routes as needed */}
        <Route path="/albums/portrait" element={<Portrait />} />
        <Route path="/albums/pre-wedding" element={<PreWedding />} />
        <Route path="/albums/birthday" element={<BirthParty />} />
        <Route path="/albums/baby-shoot" element={<BabyShoot />} />
        <Route path="/albums/wedding" element={<Wedding />} />  // ✅ Add this line
        <Route path="/client-home" element={<ClPage />} />
        <Route path="/client-home/selected-image" element={<SelectedImg />} />

      </Routes>
    </>
  );
}

export default App;
