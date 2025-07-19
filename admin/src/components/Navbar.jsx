import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ArrowUpTrayIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/gallerySlice';
import { Link } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
    { to: '/uploads', label: 'Uploads', icon: ArrowUpTrayIcon },
    { to: '/edit-content', label: 'Edit Content', icon: PencilSquareIcon },
  ];

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow fixed top-0 left-0 right-0 z-40 h-16">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
        Dashboard
      </div>
     
      <Link to="/inquiry">Notification</Link>

      {/* Right: Upload + Menu */}
      <div className="flex items-center gap-4 relative">
       
        <button
          className="text-gray-600 hover:text-gray-800 relative"
          onClick={() => {
            setSidebarOpen((open) => !open);
            if (!sidebarOpen) dispatch(closeModal());
          }}
          aria-label="Toggle sidebar"
        >
          <FaBars className="w-6 h-6" />
        </button>
        {/* Sidebar Dropdown */}
        {sidebarOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded shadow-lg z-50 top-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold">Admin Panel</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded transition ${
                      isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
        {/* Overlay for closing dropdown when clicking outside */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
            style={{ top: '64px' }} // below navbar
          />
        )}
      </div>
    </div>
  );
}
