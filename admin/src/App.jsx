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


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/uploads" element={<UploadsPage />} />
<Route path="/edit-content" element={<ContentEditorPage />} />
<Route path="/inquiries" element={<InquiriesPage />} />
{/* <Route path="/client-details" element={<ClientDetails />} /> */}
<Route path="/client-details/:albumId" element={<CUploadedImg />} />
<Route path="/client-details/selected/:albumId" element={<CSelectedImg />} />
<Route path="/client-overview/:albumId" element={<ClientDetails />} />
<Route path="/inquiry" element={<Notify />} />
{/* <Route
  path="/uploads"
  element={
    <ProtectedRoute roleRequired="admin">
      <UploadsPage />
    </ProtectedRoute>
  }
/> */}
    
        {/* Add more admin routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;