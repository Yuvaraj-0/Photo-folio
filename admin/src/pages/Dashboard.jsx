import AdminLayout from '../layouts/AdminLayout';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchStats } from '../redux/statsSlice';  
import Navbar from '../components/Navbar';
export default function Dashboard() {


  const dispatch = useDispatch();

  // Assuming your Redux slice state is at state.stats
  const stats = useSelector(state => state.stats.data);
  const loading = useSelector(state => state.stats.loading);
  const error = useSelector(state => state.stats.error);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading stats...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;


  return (
    <AdminLayout>
     <Navbar />
      <main className="flex-1 p-4">
      <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Images" value={stats?.totalImages || 0} />
        <StatCard title="Albums" value={stats?.totalAlbums || 0} />
        <StatCard title="Inquiries" value={stats?.totalInquiries || 0} />
      </div>
    </div>
      </main>
    </AdminLayout>
  );
}
