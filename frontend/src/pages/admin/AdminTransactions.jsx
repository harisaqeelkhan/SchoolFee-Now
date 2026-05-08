import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminTransactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        const { data } = await api.get('/admin/transactions');
        setTransactions(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTxns();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="card">
      <h2>All System Transactions</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Flagged</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id}>
                <td>{t.transactionId}</td>
                <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
                <td>PKR {t.amount}</td>
                <td>{t.status}</td>
                <td style={{ color: t.suspiciousFlag ? 'red' : 'green' }}>
                  {t.suspiciousFlag ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;
