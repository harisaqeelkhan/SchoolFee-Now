import React from 'react';

const StudentDashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Welcome, Ahmed Ali!</h1>
      
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card metric-card black-bg" style={{ flex: 1 }}>
          <h3>Academic Term</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Grade 8</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Attendance</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>94%</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Upcoming Tests</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>3</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #3b82f6' }}>
        <h3>Tuition BNPL Status</h3>
        <p style={{ marginTop: '1rem' }}>
          <strong>Fee Structure:</strong> Grade 8 (PKR 45,000)<br />
          <strong>Payment Plan:</strong> 12 Months BNPL (Active)<br />
          <span style={{ display: 'inline-block', marginTop: '0.5rem', background: '#dcfce3', color: '#166534', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
            Managed by Parent Account
          </span>
        </p>
      </div>

      <div className="card">
        <h3>Recent Announcements</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          <li style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
            <strong>Science Fair Registration</strong> - May 15th
          </li>
          <li style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
            <strong>Parent-Teacher Meeting</strong> - May 22nd
          </li>
          <li style={{ padding: '1rem' }}>
            <strong>Summer Vacation Commences</strong> - June 10th
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
