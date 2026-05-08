import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', margin: '6rem auto' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page Not Found</p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
};

export default NotFound;
