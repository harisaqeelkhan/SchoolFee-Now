import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <img src={logo} alt="SchoolFee Now Logo" style={{ height: '100px', marginBottom: '1rem', objectFit: 'contain' }} />
      <h1>Welcome to SchoolFee Now</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
        The smarter way to manage and pay school fees with our BNPL solutions.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ width: '200px' }}>
          <h3>Parent Portal</h3>
          <Link to="/login" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Login as Parent</Link>
        </div>
        <div className="card" style={{ width: '200px' }}>
          <h3>Student Portal</h3>
          <Link to="/login" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>Login as Student</Link>
        </div>
        <div className="card" style={{ width: '200px' }}>
          <h3>School Portal</h3>
          <Link to="/login" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>Login as School</Link>
        </div>
        <div className="card" style={{ width: '200px', border: '2px solid var(--primary)' }}>
          <h3>App Admin Portal</h3>
          <Link to="/admin/login" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>Master Login</Link>
        </div>
      </div>

      <h2>How it Works</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center" style={{ marginTop: '2rem' }}>
        <div className="card" style={{ flex: 1 }}>
          <h3>1. Sign Up</h3>
          <p>Create a parent account and verify your CNIC.</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3>2. Load Wallet</h3>
          <p>Deposit demo funds into your secure wallet.</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3>3. Apply BNPL</h3>
          <p>Select your child's school and choose a 3, 6, or 12-month plan.</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3>4. Manage Payments</h3>
          <p>Track your budget, expenses, and transaction history.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
