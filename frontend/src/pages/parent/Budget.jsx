import React, { useState } from 'react';
import AlertError from '../../components/ui/AlertError';

const Budget = () => {
  const [budgetLimit, setBudgetLimit] = useState(100000);
  const totalExpenses = 85000; // Mock derived value
  const percentage = (totalExpenses / budgetLimit) * 100;
  
  const isExceeded = percentage > 100;
  const isNearLimit = percentage >= 80 && percentage <= 100;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Monthly Budget</h1>
      
      {isExceeded && <AlertError message="Budget Exceeded! Please review your expenses." />}

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Set Budget</h3>
        <div className="flex gap-4" style={{ marginTop: '1rem' }}>
          <input type="number" className="form-input" value={budgetLimit} onChange={e => setBudgetLimit(Number(e.target.value))} />
          <button className="btn btn-primary">Update Limit</button>
        </div>
      </div>

      <div className="card">
        <h3>Budget Progress</h3>
        <p style={{ marginTop: '1rem' }}>Spent: PKR {totalExpenses.toLocaleString()} / Limit: PKR {budgetLimit.toLocaleString()}</p>
        
        <div className="progress-container">
          <div 
            className={`progress-bar ${isExceeded ? 'exceeded' : isNearLimit ? 'near-limit' : ''}`} 
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
          {percentage.toFixed(1)}% used
        </p>
      </div>
    </div>
  );
};

export default Budget;
