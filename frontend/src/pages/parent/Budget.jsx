import React, { useState } from 'react';
import AlertError from '../../components/ui/AlertError';

const Budget = () => {
  const [budgetLimit, setBudgetLimit] = useState(150000);
  const totalExpenses = 112000; // Mock derived value
  const percentage = (totalExpenses / budgetLimit) * 100;
  
  const isExceeded = percentage > 100;
  const isNearLimit = percentage >= 80 && percentage <= 100;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Monthly Household Budgeting</h1>
      
      {isExceeded && <AlertError message="Warning: Budget Exceeded! Please review your expenses." />}
      {isNearLimit && <div style={{ background: '#fef3c7', color: '#92400e', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>You are approaching your monthly limit.</div>}

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Set Monthly Education Limit</h3>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem', marginBottom: '1rem' }}>Adjust your limit below to dynamically update the progress bar.</p>
        <div className="flex gap-4">
          <input type="number" className="form-input" value={budgetLimit} onChange={e => setBudgetLimit(Number(e.target.value))} />
          <button className="btn btn-primary">Save Limit</button>
        </div>
      </div>

      <div className="card">
        <h3>Budget Progress (May 2026)</h3>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          <strong>Spent:</strong> PKR {totalExpenses.toLocaleString()} / 
          <strong> Limit:</strong> PKR {budgetLimit.toLocaleString()}
        </p>
        
        <div className="progress-container" style={{ marginTop: '1.5rem', height: '24px', background: '#e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            className={`progress-bar ${isExceeded ? 'exceeded' : isNearLimit ? 'near-limit' : ''}`} 
            style={{ width: `${Math.min(percentage, 100)}%`, height: '100%', background: isExceeded ? 'red' : isNearLimit ? 'orange' : '#22c55e', transition: 'width 0.3s ease' }}
          ></div>
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'var(--text-light)', fontWeight: 'bold' }}>
          {percentage.toFixed(1)}% of budget utilized
        </p>
      </div>
    </div>
  );
};

export default Budget;
