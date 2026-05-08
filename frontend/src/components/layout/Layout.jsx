import React, { useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {user && <Sidebar />}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'var(--bg-main)' }}>
          <div className="max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
