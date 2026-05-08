import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const TransactionTable = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No recent activity found.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="badge success">Completed</span>;
      case 'pending':
        return <span className="badge warning">Pending</span>;
      case 'failed':
      case 'flagged':
        return <span className="badge danger">{status}</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="table-container card" style={{ padding: 0, overflow: 'hidden' }}>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id || txn.transactionId}>
              <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{txn.transactionId}</td>
              <td style={{ textTransform: 'capitalize', fontWeight: '500' }}>{txn.type}</td>
              <td style={{ fontWeight: '600' }}>{formatCurrency(txn.amount)}</td>
              <td>{getStatusBadge(txn.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
