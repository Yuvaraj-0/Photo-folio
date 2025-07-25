import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadManager from "./pages/UploadManager";
import ContentEditorPage from "./pages/ContentEditorPage";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import InquiriesPage from "./Inqueries/Inquires";
import UploadsPage from "./pages/UploadManager";
import ClientDetails from "./pages/ClientDetails";
import CUploadedImg  from "./pages/CUploadedImg"
import CSelectedImg from "./pages/CSelectedImg";
import Notify from "./pages/Notify";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";
import Unapproved from "./pages/SelecManagement.jsx/Unapproved";
import Approved from "./pages/SelecManagement.jsx/Approved";
import AdminRoute from "./routes/ProtectedRoute"
import { restoreAuth } from './redux/authSlice';
import { useDispatch } from 'react-redux';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("admin");
    setIsLoggedIn(!!user); // true if user exists
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {/* ✅ Show navbar only when logged in */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Public route (Login) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect to dashboard if root path */}

       <Route
    path="/"
    element={
      <Dashboard />
    }
  />

        {/* Admin protected routes */}
        

        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route path="/uploads" element={<UploadsPage />} />
        <Route path="/edit-content" element={<ContentEditorPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/client-details/:albumId" element={<CUploadedImg />} />
        <Route path="/client-details/selected/:albumId" element={<CSelectedImg />} />
        <Route path="/client-overview/:albumId" element={<ClientDetails />} />
        <Route path="/inquiry" element={<Notify />} />
        <Route path="/unapproved-img/:clientId" element={<Unapproved />} />
        <Route path="/approved-img/:clientId" element={<Approved />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;





// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import UploadManager from "./pages/UploadManager";
// import ContentEditorPage from "./pages/ContentEditorPage";
// import Sidebar from "./components/Sidebar";
// import LoginPage from "./pages/LoginPage";
// import InquiriesPage from "./Inqueries/Inquires";
// import UploadsPage from "./pages/UploadManager";
// import ClientDetails from "./pages/ClientDetails";
// import CUploadedImg  from "./pages/CUploadedImg"
// import CSelectedImg from "./pages/CSelectedImg";
// import Notify from "./pages/Notify";
// import Navbar from "./components/Navbar";

// import { useEffect, useState } from "react";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     const user = localStorage.getItem("admin");
//     setIsLoggedIn(!!user); // true if user exists
//   }, []);
//   return (
//     <BrowserRouter>
//     <Navbar />
    
//       {/* <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       {/* <Route path="/sidebar" element={<Sidebar />} /> */}
      
//         <Route path="/" element={<Navigate to="/admin/dashboard" replace />} /> */}
//         <Route path="/admin/dashboard" element={<Dashboard />} />
//         <Route path="/uploads" element={<UploadsPage />} />
// <Route path="/edit-content" element={<ContentEditorPage />} />
// <Route path="/inquiries" element={<InquiriesPage />} />
// {/* <Route path="/client-details" element={<ClientDetails />} /> */}
// <Route path="/client-details/:albumId" element={<CUploadedImg />} />
// <Route path="/client-details/selected/:albumId" element={<CSelectedImg />} />
// <Route path="/client-overview/:albumId" element={<ClientDetails />} />
// <Route path="/inquiry" element={<Notify />} />
// {/* <Route
//   path="/uploads"
//   element={
//     <ProtectedRoute roleRequired="admin">
//       <UploadsPage />
//     </ProtectedRoute>
//   }
// /> */}
    
//         {/* Add more admin routes as needed */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
