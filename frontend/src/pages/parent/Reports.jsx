import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data: res } = await api.get('/reports/user-dashboard');
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return <p>Failed to load reports.</p>;

  // Formatting Wallet Summary for BarChart
  const walletData = [
    { name: 'Deposits', amount: data.walletSummary?.totalDeposits || 0 },
    { name: 'Withdrawals', amount: data.walletSummary?.totalWithdrawals || 0 },
    { name: 'Transfers Out', amount: data.walletSummary?.totalTransfersOut || 0 },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>User Analytics & Reports</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1 1 400px' }}>
          <h3>Spending by Category</h3>
          {data.categorySpending.length === 0 ? <p>No expenses recorded.</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categorySpending}
                  dataKey="totalAmount"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {data.categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card" style={{ flex: '1 1 400px' }}>
          <h3>Wallet Cashflow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={walletData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
