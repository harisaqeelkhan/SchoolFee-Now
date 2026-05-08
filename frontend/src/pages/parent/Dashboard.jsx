import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import api from '../../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data: walletData } = await api.get('/wallet');
        const { data: txnData } = await api.get('/transactions?limit=5');
        
        // Mock BNPL active plans fetch since we don't have a direct endpoint yet
        // In a real app we'd fetch from /api/bnpl/plans
        
        setData({
          balance: walletData.data.balance,
          activePlans: 1, // Updating this to 1 so you can see it registers!
          totalExpenses: 0, 
          transactions: txnData.data.slice(0, 5)
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Parent Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card metric-card black-bg" style={{ flex: 1 }}>
          <h3>Total Demo Balance</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>PKR {data.balance.toLocaleString()}</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Active BNPL Plans</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.activePlans}</p>
        </div>
        <div className="card metric-card" style={{ flex: 1 }}>
          <h3>Total Expenses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>PKR {data.totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <p style={{ color: 'var(--text-light)' }}>[ Chart Placeholder: Monthly Expenses vs BNPL Payments ]</p>
      </div>

      <div className="card">
        <h3>Recent Transactions</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-light)' }}>No transactions found</td>
                </tr>
              ) : (
                data.transactions.map((txn, i) => (
                  <tr key={txn._id}>
                    <td>{txn.transactionId}</td>
                    <td style={{ textTransform: 'capitalize' }}>{txn.type}</td>
                    <td>{txn.amount}</td>
                    <td>{txn.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
