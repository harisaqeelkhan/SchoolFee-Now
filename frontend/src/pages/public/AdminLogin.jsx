import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AlertError from '../../components/ui/AlertError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import api from '../../services/api';
import { getDefaultRouteForRole } from '../../utils/roleConfig';

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
      navigate(getDefaultRouteForRole(data.data.role));
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '420px', margin: '5rem auto' }}>
      <div className="card" style={{ borderTop: '4px solid var(--accent-red)', padding: '2.5rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem', letterSpacing: '-0.02em', color: 'var(--accent-red)' }}>System Portal</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Authorized personnel only.</p>
        {error && <AlertError message={error} />}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Master Username</label>
            <input 
              type="text" 
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
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ backgroundColor: 'var(--accent-red)' }}>
            {loading ? <LoadingSpinner /> : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
