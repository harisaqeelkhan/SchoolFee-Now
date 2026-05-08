import React, { useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'Parent One', email: 'parent1@test.com', status: 'active' },
    { id: '2', name: 'Parent Two', email: 'parent2@test.com', status: 'blocked' },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
  };

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
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge" style={{ background: u.status === 'active' ? '#e0e0e0' : 'var(--primary)', color: u.status === 'active' ? 'var(--primary)' : 'var(--surface)' }}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => toggleStatus(u.id)}>
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
