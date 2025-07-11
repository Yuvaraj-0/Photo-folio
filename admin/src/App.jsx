import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadManager from "./pages/UploadManager";
import ContentEditorPage from "./pages/ContentEditorPage";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import InquiriesPage from "./Inqueries/Inquires";
import UploadsPage from "./pages/UploadManager";


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