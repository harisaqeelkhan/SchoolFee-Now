import React from 'react';

const Expenses = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Educational Expenses</h1>
      <p style={{ color: 'var(--text-light)', marginTop: '1rem', fontSize: '1.2rem' }}>
        Track your child's non-fee expenses (Books, Uniforms, etc.) here.
      </p>
      <div className="card" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
        <h3 style={{ color: 'var(--text-light)' }}>Module in Development</h3>
        <p>This analytics module will be integrated in the upcoming release.</p>
      </div>
    </div>
  );
};

export default Expenses;
