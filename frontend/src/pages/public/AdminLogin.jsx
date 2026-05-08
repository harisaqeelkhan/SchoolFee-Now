import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AlertError from '../../components/ui/AlertError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import api from '../../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      if (data.data.role !== 'system_admin') {
        throw new Error('Access Denied. You must be an App Admin to use this portal.');
      }

      login(data.data, data.data.token);
      navigate('/system/dashboard');
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <div className="card" style={{ borderTop: '4px solid red' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'red' }}>App Admin Portal</h2>
        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Restricted Access</p>
        {error && <AlertError message={error} />}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Master Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Master Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ background: 'red' }}>
            {loading ? <LoadingSpinner /> : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
