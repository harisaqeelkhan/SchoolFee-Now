import React from 'react';

const StudentDashboard = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Student Portal</h1>
      <p style={{ color: 'var(--text-light)', marginTop: '1rem', fontSize: '1.2rem' }}>
        Welcome! Your school fee payments and active BNPL plans are managed by your linked Parent account.
      </p>
      <div className="card" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
        <h3 style={{ color: 'var(--text-light)' }}>Academic Records Pending</h3>
        <p>Your institutional data is syncing.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
