import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SystemDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/system-admin/stats');
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
      <h1>System Master Dashboard</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>Global view of all Schools, Students, and Parents.</p>
      
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div className="card metric-card" style={{ flex: '1 1 200px' }}>
          <h3>Total Schools</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.schools.length}</p>
        </div>
        <div className="card metric-card" style={{ flex: '1 1 200px' }}>
          <h3>Total Registered Parents</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.parents.length}</p>
        </div>
        <div className="card metric-card" style={{ flex: '1 1 200px' }}>
          <h3>Total Students Linked</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.students.length}</p>
        </div>
        <div className="card metric-card black-bg" style={{ flex: '1 1 200px' }}>
          <h3>School Admins</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.schoolAdmins?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default SystemDashboard;
