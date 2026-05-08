import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const StatusBadge = ({ status }) => (
  <span 
    className="badge" 
    style={{ 
      background: status === 'active' ? '#e0e0e0' : 'var(--primary)', 
      color: status === 'active' ? 'var(--primary)' : 'var(--surface)' 
    }}
  >
    {status}
  </span>
);

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/block`);
      // Update local state to reflect change without full reload
      setUsers(users.map(u => u._id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Manage Users</h1>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <StatusBadge status={u.status} />
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => toggleStatus(u._id)}>
                      {u.status === 'active' ? 'Block User' : 'Unblock User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
