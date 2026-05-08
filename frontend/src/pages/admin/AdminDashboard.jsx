import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>School Administration Portal</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        Welcome to your specific institution's dashboard. Here you can manage your students and fee structures.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="card metric-card black-bg" style={{ flex: 1 }}>
          <h3>Total Enrolled Students</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>42</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Pending BNPL Settlements</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>PKR 125,000</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Active Fee Structures</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>8</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
