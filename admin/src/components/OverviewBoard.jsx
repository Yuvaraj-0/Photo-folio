import React from 'react';
import { useSelector } from 'react-redux';
import StatCard from './StatCard';

export default function OverviewBoard() {
  // Get stats data from Redux store
  const stats = useSelector(state => state.stats.data);
  const localImagesCount = useSelector(state => state.gallery.images.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Local Images" value={localImagesCount} />
      <StatCard title="Total Images" value={stats?.totalImages || 0} />
      <StatCard title="Total Albums" value={stats?.totalAlbums || 0} />
      <StatCard title="Inquiries" value={stats?.totalInquiries || 0} />
    </div>
  );
}
