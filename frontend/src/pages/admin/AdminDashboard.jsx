import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>School Administration Portal</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        Welcome to your specific institution's dashboard. 
      </p>
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--text-light)' }}>Reporting Module Syncing...</h3>
        <p>Your institutional data is currently being integrated with the live BNPL engine.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
