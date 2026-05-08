import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AlertError from '../../components/ui/AlertError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import api from '../../services/api';
import { getDefaultRouteForRole } from '../../utils/roleConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user) {
      if (location.state?.expectedRole && user.role !== location.state.expectedRole) {
        setError(`You are currently logged in as a ${user.role}. Please log out first.`);
        return;
      }
      navigate(getDefaultRouteForRole(user.role));
    }
  }, [user, navigate, location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.data, data.data.token);
      navigate(getDefaultRouteForRole(data.data.role));
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '420px', margin: '5rem auto' }}>
      <div className="card" style={{ borderTop: '4px solid var(--primary)', padding: '2.5rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', letterSpacing: '-0.02em' }}>Welcome Back</h2>
        {error && <AlertError message={error} />}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
