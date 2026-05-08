import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import AlertError from '../../components/ui/AlertError';
import api from '../../services/api';

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  
  // Modal State
  const [modalType, setModalType] = useState(null); // 'deposit', 'withdraw', 'transfer'
  const [amount, setAmount] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchWallet = async () => {
    try {
      const { data } = await api.get('/wallet');
      setBalance(data.data.balance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const payload = { amount: Number(amount) };
      if (modalType === 'transfer') payload.receiverEmail = receiverEmail;

      await api.post(`/wallet/${modalType}`, payload);
      
      setSuccess(`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} successful!`);
      setAmount('');
      setReceiverEmail('');
      setModalType(null); // Close modal on success
      fetchWallet(); // Refresh balance
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ position: 'relative' }}>
      <h1 style={{ marginBottom: '2rem' }}>Demo Wallet</h1>
      
      {success && <div style={{ color: 'green', marginBottom: '1rem', padding: '1rem', background: '#e6ffe6', borderRadius: '5px' }}>{success}</div>}

      <div className="card metric-card black-bg" style={{ marginBottom: '2rem', textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: 'var(--text-light)' }}>Current Balance</h3>
        <h1 style={{ color: 'var(--surface)', fontSize: '4rem', margin: '1rem 0' }}>PKR {balance.toLocaleString()}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button onClick={() => setModalType('deposit')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Deposit</button>
        <button onClick={() => setModalType('withdraw')} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Withdraw</button>
        <button onClick={() => setModalType('transfer')} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Transfer</button>
      </div>

      {/* Basic Custom Modal Overlay */}
      {modalType && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="card" style={{ width: '400px', backgroundColor: 'var(--surface)', padding: '2rem' }}>
            <h2 style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>{modalType} Funds</h2>
            {error && <AlertError message={error} />}
            
            <form onSubmit={handleTransaction}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Amount (PKR)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  required 
                  min="1"
                  style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
                />
              </div>

              {modalType === 'transfer' && (
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Receiver Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={receiverEmail} 
                    onChange={(e) => setReceiverEmail(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ flex: 1 }}>
                  {submitting ? 'Processing...' : 'Confirm'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setModalType(null)} style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
