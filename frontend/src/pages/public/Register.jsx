import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertError from '../../components/ui/AlertError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import api from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', cnic: '', age: '', role: 'parent' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.cnic.length !== 13) {
      setError('CNIC must be exactly 13 characters');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/register', { ...formData, name: formData.fullName });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register Account</h2>
        {error && <AlertError message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>CNIC</label>
            <input type="text" name="cnic" className="form-input" value={formData.cnic} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Register As (Role)</label>
            <select name="role" className="form-input" value={formData.role} onChange={handleChange} required>
              <option value="parent">Parent</option>
              <option value="student">Student</option>
              <option value="school_admin">School Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
