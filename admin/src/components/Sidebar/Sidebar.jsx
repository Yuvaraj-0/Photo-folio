import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ArrowUpTrayIcon,
  PencilSquareIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/gallerySlice';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Remove admin login data
    window.location.href = "/login"; // Redirect to login page
  };
  
  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
    { to: '/uploads', label: 'Uploads', icon: ArrowUpTrayIcon },
    { to: '/edit-content', label: 'Edit Content', icon: PencilSquareIcon },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) dispatch(closeModal());
        }}
        className="lg:hidden p-4 fixed top-4 right-4 z-20 bg-gray-800 rounded-md text-white"
        aria-label="Toggle sidebar"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Desktop hamburger button */}
      <button
        onClick={() => {
          setIsDesktopOpen(!isDesktopOpen);
          if (!isDesktopOpen) dispatch(closeModal());
        }}
        className="hidden lg:block p-4 fixed top-4 right-4 z-20 bg-gray-800 rounded-md text-white"
        aria-label="Toggle sidebar"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="absolute top-0 right-0 h-full w-64 bg-gray-800 text-white p-6
                       transition-transform duration-300 ease-in-out transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <button onClick={() => setIsOpen(false)} className="lg:hidden text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
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

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded hover:bg-red-700 transition text-red-500 font-semibold"
              >
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      {isDesktopOpen && (
        <div className="fixed inset-0 z-30 hidden lg:block">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsDesktopOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="absolute top-0 right-0 h-full w-64 bg-gray-800 text-white p-6
                       transition-transform duration-300 ease-in-out transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <button onClick={() => setIsDesktopOpen(false)} className="text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsDesktopOpen(false)}
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

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded hover:bg-red-700 transition text-red-500 font-semibold"
              >
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   HomeIcon,
//   ArrowUpTrayIcon,
//   PencilSquareIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline';
// import { useDispatch } from 'react-redux';
// import { closeModal } from '../../redux/gallerySlice';

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDesktopOpen, setIsDesktopOpen] = useState(true);
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     localStorage.removeItem("admin"); // Remove admin login data
//     window.location.href = "/login"; // Redirect to login page
//   };
  
//   const navItems = [
//     { to: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
//     { to: '/uploads', label: 'Uploads', icon: ArrowUpTrayIcon },
//     { to: '/edit-content', label: 'Edit Content', icon: PencilSquareIcon },
   
//   ];

//   return (
//     <>
//       {/* Mobile hamburger button, positioned outside the main content flow */}
//       <button
//         onClick={() => {
//           setIsOpen(!isOpen);
//           if (!isOpen) dispatch(closeModal());
//         }}
//         className="lg:hidden p-4 fixed top-4 right-4 z-20 bg-gray-800 rounded-md text-white"
//         aria-label="Toggle sidebar"
//       >
//         <Bars3Icon className="w-6 h-6" />
//       </button>

//       {/* Desktop hamburger button */}
//       <button
//         onClick={() => {
//           setIsDesktopOpen(!isDesktopOpen);
//           if (!isDesktopOpen) dispatch(closeModal());
//         }}
//         className="hidden lg:block p-4 fixed top-4 right-4 z-20 bg-gray-800 rounded-md text-white"
//         aria-label="Toggle sidebar"
//       >
//         <Bars3Icon className="w-6 h-6" />
//       </button>
//       <nav className="space-y-4">
//   {navItems.map(/* ... */)}

// </nav>


//       {/* Overlay and Sidebar Container for Mobile */}
//       {isOpen && (
//         <div className="fixed inset-0 z-30 lg:hidden">
//           {/* Overlay - covers entire screen */}
//           <div
//             className="absolute inset-0 bg-black/30"
//             onClick={() => setIsOpen(false)}
//             aria-hidden="true"
//           />
          
//           {/* Sidebar - positioned on top of overlay, right side */}
//           <aside
//             className="absolute top-0 right-0 h-full w-64 bg-gray-800 text-white p-6
//                        transition-transform duration-300 ease-in-out
//                        transform translate-x-0"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold">Admin Panel</h2>
//                 {/* Mobile close button */}
//                 <button onClick={() => setIsOpen(false)} className="lg:hidden text-white">
//                     <XMarkIcon className="w-6 h-6" />
//                 </button>
//             </div>

//             <nav className="space-y-4">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => {
//                     if (window.innerWidth < 1024) { // 'lg' breakpoint
//                       setIsOpen(false);
//                     }
//                   }}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2 rounded transition ${
//                       isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-5 h-5" />
//                   {item.label}
//                 </NavLink>
//               ))}
//             </nav>

           
//           </aside>
//         </div>
//       )}

//       {/* Desktop Sidebar with Overlay */}
//       {isDesktopOpen && (
//         <div className="fixed inset-0 z-30 hidden lg:block">
//           {/* Overlay - covers entire screen */}
//           <div
//             className="absolute inset-0 bg-black/30"
//             onClick={() => setIsDesktopOpen(false)}
//             aria-hidden="true"
//           />
          
//           {/* Desktop Sidebar - right side */}
//           <aside
//             className="absolute top-0 right-0 h-full w-64 bg-gray-800 text-white p-6
//                        transition-transform duration-300 ease-in-out
//                        transform translate-x-0"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold">Admin Panel</h2>
//                 {/* Desktop close button */}
//                 <button onClick={() => setIsDesktopOpen(false)} className="text-white">
//                     <XMarkIcon className="w-6 h-6" />
//                 </button>
//             </div>

//             <nav className="space-y-4">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setIsDesktopOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2 rounded transition ${
//                       isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-5 h-5" />
//                   {item.label}
//                 </NavLink>
//               ))}
//               <h1>hiiii</h1>
//             </nav>
//           </aside>
//         </div>
//       )}
//     </>
//   );
// }
