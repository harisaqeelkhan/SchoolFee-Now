import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

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
      
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card metric-card">
          <h3>Total Schools</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.schools.length}</p>
        </div>
        <div className="card metric-card">
          <h3>Total Registered Parents</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.parents.length}</p>
        </div>
        <div className="card metric-card">
          <h3>Total Students Linked</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.students.length}</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Registered Schools</h3>
        <ul>
          {stats.schools.map(school => (
            <li key={school._id}>{school.name} (Reg: {school.registrationNo})</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>All Students</h3>
        <ul>
          {stats.students.map(student => (
            <li key={student._id}>{student.fullName} (School ID: {student.studentId}) - Parent: {student.parentId?.name || 'Unlinked'}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SystemDashboard;
