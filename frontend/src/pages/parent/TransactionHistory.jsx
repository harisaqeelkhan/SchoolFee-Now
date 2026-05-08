import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';

const TransactionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setTransactions([
        { id: 'TXN-001', type: 'deposit', amount: 50000, status: 'successful', date: '2026-05-01' },
        { id: 'TXN-002', type: 'fee_payment', amount: 15000, status: 'successful', date: '2026-05-05' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Transaction History</h1>
      
      <div className="flex gap-4" style={{ marginBottom: '1rem' }}>
        <select className="form-input">
          <option>All Types</option>
          <option>Deposit</option>
          <option>Withdrawal</option>
          <option>Transfer</option>
        </select>
        <select className="form-input">
          <option>All Statuses</option>
          <option>Successful</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <div className="card">
        {transactions.length === 0 ? (
          <EmptyState message="No transactions found" />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount (PKR)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => (
                  <tr key={txn.id}>
                    <td>{txn.date}</td>
                    <td>{txn.id}</td>
                    <td style={{ textTransform: 'capitalize' }}>{txn.type.replace('_', ' ')}</td>
                    <td>{txn.amount.toLocaleString()}</td>
                    <td>
                      <span className="badge" style={{ background: txn.status === 'successful' ? '#e0e0e0' : 'var(--primary)', color: txn.status === 'successful' ? 'var(--primary)' : 'var(--surface)' }}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
