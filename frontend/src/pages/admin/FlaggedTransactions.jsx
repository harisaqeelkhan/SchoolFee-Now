import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const FlaggedTransactions = () => {
  const [flagged, setFlagged] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlagged = async () => {
      try {
        const { data } = await api.get('/admin/transactions/flagged');
        setFlagged(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlagged();
  }, []);

  if (loading) return <LoadingSpinner />;

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
                <tr key={f._id}>
                  <td>{f.transactionId}</td>
                  <td>{f.senderId?.name || 'N/A'}</td>
                  <td>{f.amount.toLocaleString()}</td>
                  <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                  <td>
                    {f.suspiciousReasons?.map((reason, idx) => (
                      <span key={idx} className="badge badge-flagged" style={{ marginRight: '4px', marginBottom: '4px', display: 'inline-block' }}>
                        {reason}
                      </span>
                    ))}
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
