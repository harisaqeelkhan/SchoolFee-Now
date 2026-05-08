import React from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import AlertError from '../../components/ui/AlertError';
import MetricCard from '../../components/dashboard/MetricCard';
import { useFetch } from '../../hooks/useFetch';

const AdminDashboard = () => {
  const { data: stats, loading, error } = useFetch('/admin/dashboard');

  if (loading) return <LoadingSpinner />;
  
  if (error) return <AlertError message={error} />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>School Administration Portal</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        Welcome to your specific institution's dashboard. 
      </p>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: '2.5rem' }}>
          <MetricCard 
            title="Total Enrolled Users" 
            value={stats.totalUsers} 
          />
          <MetricCard 
            title="Total Transaction Volume" 
            value={`PKR ${stats.transactionVolume.toLocaleString()}`} 
            isHighlighted={true} 
          />
          <MetricCard 
            title="Blocked Users" 
            value={stats.blockedUsers} 
            valueColor="var(--accent-red)"
          />
          <MetricCard 
            title="Flagged Transactions" 
            value={stats.flaggedTransactions} 
            valueColor="var(--accent-orange)"
          />
        </div>
      ) : (
        <div className="empty-state" style={{ padding: '3rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Reporting Module Syncing</h3>
          <p style={{ fontSize: '0.95rem' }}>Your institutional data is currently being integrated with the live BNPL engine.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
