import React from 'react';

const FlaggedTransactions = () => {
  const flagged = [
    { id: 'TXN-999', user: 'Parent One', amount: 500000, date: '2026-05-07', reason: 'Amount exceeded 100,000 PKR limit' },
    { id: 'TXN-1002', user: 'Parent Two', amount: 200, date: '2026-05-08', reason: 'Multiple micro-transactions detected' },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Flagged Transactions</h1>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Amount (PKR)</th>
                <th>Date</th>
                <th>Suspicious Reason</th>
              </tr>
            </thead>
            <tbody>
              {flagged.map(f => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.user}</td>
                  <td>{f.amount.toLocaleString()}</td>
                  <td>{f.date}</td>
                  <td>
                    <span className="badge badge-flagged">{f.reason}</span>
                  </td>
                </tr>
              ))}
              {flagged.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-light)' }}>No flagged transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlaggedTransactions;
