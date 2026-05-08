import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { useAuth } from '../../context/AuthContext';
import { getDefaultRouteForRole } from '../../utils/roleConfig';

const Landing = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div className="text-center" style={{ marginBottom: '5rem' }}>
        <img src={logo} alt="SchoolFee Now" style={{ height: '80px', marginBottom: '2rem', objectFit: 'contain' }} />
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
          Education should be an investment, not a burden.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          We built SchoolFee Now because paying tuition shouldn't require draining your savings at once. 
          Split the cost into manageable 3, 6, or 12-month chunks.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '6rem' }}>
        {user ? (
          <div className="card col-span-1 md:col-span-2" style={{ borderTop: '3px solid var(--primary)', textAlign: 'center' }}>
            <h3>Welcome back, {user.name}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              You are currently logged in as a {user.role}.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to={getDefaultRouteForRole(user.role)} className="btn btn-primary">Go to Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </div>
          </div>
        ) : (
          <>
            <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
              <h3>Parents</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Pay fees on your terms without breaking the monthly budget.
              </p>
              <Link to="/login" state={{ expectedRole: 'parent' }} className="btn btn-primary w-full">Login as Parent</Link>
            </div>

            <div className="card">
              <h3>Schools</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Get paid instantly while giving parents flexible options.
              </p>
              <Link to="/login" state={{ expectedRole: 'school_admin' }} className="btn btn-secondary w-full">Institution Login</Link>
            </div>

            <div className="card">
              <h3>Students</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Check your fee clearance and upcoming deadlines.
              </p>
              <Link to="/login" state={{ expectedRole: 'student' }} className="btn btn-secondary w-full">Student Portal</Link>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-main)' }}>
              <h3>Administration</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Internal oversight and transaction management.
              </p>
              <Link to="/admin/login" className="btn btn-secondary w-full">System Access</Link>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '3rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Here is how it actually works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h4 style={{ color: 'var(--primary)' }}>1. Prove who you are</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Create an account and verify your identity using your CNIC. We keep this secure.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--primary)' }}>2. Top up</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Add funds to your digital wallet using standard banking channels.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--primary)' }}>3. Choose a plan</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Select your child's school and pick a repayment schedule that makes sense for you.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--primary)' }}>4. Track everything</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Keep an eye on what you owe, what you've paid, and when the next payment hits.
            </p>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Landing;
