import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="card metric-card black-bg" style={{ flex: 1 }}>
          <h3>Total System Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,245</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Total Demo Funds in System</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>PKR 45,000,000</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Total Active BNPL Plans</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>312</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
