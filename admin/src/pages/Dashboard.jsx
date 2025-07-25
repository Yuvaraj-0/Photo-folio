import AdminLayout from '../layouts/AdminLayout';
import OverviewBoard from '../components/OverviewBoard';
import AlbumGallery from '../components/AlbumGaller';
import ClientManager from './ClientManager';
import UploadClientBT from './UploadClientBT';
import ClientStatus from './ClientStatus';
import Analytics from './Analytics';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchStats } from '../redux/statsSlice';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(state => state.stats.loading);
  const error = useSelector(state => state.stats.error);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchStats({ navigate }));
  }, [dispatch, navigate]);

  if (loading) return <p className="p-6">Loading stats...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <AdminLayout>
      <main className="flex-1 p-4">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>
          <OverviewBoard />
        </div>
        <AlbumGallery />
        <div className="flex items-center gap-4 mb-6">
          <ClientManager />
          <UploadClientBT />
        </div>
        <ClientStatus />
        <Analytics />
      </main>
    </AdminLayout>
  );
}


// import AdminLayout from '../layouts/AdminLayout';
// import Sidebar from '../components/Sidebar';
// import StatCard from '../components/StatCard';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchStats } from '../redux/statsSlice';  
// import OverviewBoard from '../components/OverviewBoard'
// import Navbar from '../components/Navbar';
// import AlbumGallery from '../components/AlbumGaller';
// import AddClient from './AddClient';
// import ClientManager from './ClientManager';
// import ClientStatus from './ClientStatus';
// import UploadImages from './UploadImages';
// import UploadClientBT from './UploadClientBT';
// import Analytics from './Analytics';
// import { useNavigate } from "react-router-dom";
// export default function Dashboard() {

//   const dispatch = useDispatch();

//   // Assuming your Redux slice state is at state.stats
//   const navigate = useNavigate();
//   useEffect(() => {
//     const isAuthenticated = !!localStorage.getItem("token");
//     if (!isAuthenticated) {
//       navigate("/login"); // ✅ this will work only inside useEffect or event
//     }
//   }, []);
//   const loading = useSelector(state => state.stats.loading);
//   const error = useSelector(state => state.stats.error);
// ;
// useEffect(() => {
//   dispatch(fetchStats());
// }, [dispatch]); // ✅ include dispatch in dependency array



//   if (loading) return <p className="p-6">Loading stats...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;


//   return (
//     <AdminLayout>
//      {/* <Navbar /> */}
//       <main className="flex-1 p-4">
//       <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>
//       <OverviewBoard />
//     </div>
//     <AlbumGallery />
//     <div className="flex items-center gap-4 mb-6">
//   <ClientManager />
//   <UploadClientBT />
// </div>


//     <ClientStatus />
//     <Analytics />
//       </main>
//     </AdminLayout>
   
//   );
// }
