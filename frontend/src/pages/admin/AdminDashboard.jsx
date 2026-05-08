import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>School Administration Portal</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        Welcome to your specific institution's dashboard. 
      </p>

      {stats ? (
        <div className="flex flex-col md:flex-row gap-4" style={{ flexWrap: 'wrap' }}>
          <div className="card metric-card" style={{ flex: '1 1 200px' }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalUsers}</p>
          </div>
          <div className="card metric-card" style={{ flex: '1 1 200px' }}>
            <h3>Blocked Users</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{stats.blockedUsers}</p>
          </div>
          <div className="card metric-card" style={{ flex: '1 1 200px' }}>
            <h3>Flagged Transactions</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.flaggedTransactions}</p>
          </div>
          <div className="card metric-card black-bg" style={{ flex: '1 1 200px' }}>
            <h3>Total Transaction Volume</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PKR {stats.transactionVolume.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-light)' }}>Reporting Module Syncing...</h3>
          <p>Your institutional data is currently being integrated with the live BNPL engine.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
