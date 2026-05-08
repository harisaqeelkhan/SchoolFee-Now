import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SystemSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/system-admin/stats');
        setSchools(data.data.schools);
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
      <h1 style={{ marginBottom: '2rem' }}>Registered Schools</h1>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>School Name</th>
                <th>Registration Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schools.map(school => (
                <tr key={school._id}>
                  <td style={{ fontWeight: 'bold' }}>{school.name}</td>
                  <td>{school.registrationNo}</td>
                  <td>
                    <span className="badge" style={{ background: '#10b981', color: 'white' }}>Active</span>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-light)' }}>No schools registered.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemSchools;
