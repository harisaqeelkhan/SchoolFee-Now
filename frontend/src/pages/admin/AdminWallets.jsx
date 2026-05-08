import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const { data } = await api.get('/admin/wallets');
        setWallets(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Wallets View</h1>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Current Demo Balance (PKR)</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(w => (
                <tr key={w._id}>
                  <td>{w.userId?.name || 'N/A'}</td>
                  <td>{w.userId?.email || 'N/A'}</td>
                  <td>{w.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWallets;
