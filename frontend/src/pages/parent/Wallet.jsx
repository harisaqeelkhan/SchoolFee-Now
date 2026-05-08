import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import api from '../../services/api';

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data } = await api.get('/wallet');
        setBalance(data.data.balance);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Demo Wallet</h1>
      
      <div className="card metric-card black-bg" style={{ marginBottom: '2rem', textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: 'var(--text-light)' }}>Current Balance</h3>
        <h1 style={{ color: 'var(--surface)', fontSize: '4rem', margin: '1rem 0' }}>PKR {balance.toLocaleString()}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Deposit</button>
        <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Withdraw</button>
        <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Transfer</button>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-light)' }}>* Transfer modal requires Receiver's Email/ID and Amount.</p>
      </div>
    </div>
  );
};

export default Wallet;
