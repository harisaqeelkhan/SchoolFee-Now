import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHome, FaWallet, FaMoneyBillWave, FaList, FaMoneyCheckAlt, FaChartPie, FaUsers, FaExclamationCircle } from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const parentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Wallet', path: '/wallet', icon: <FaWallet /> },
    { name: 'Apply BNPL', path: '/bnpl/apply', icon: <FaMoneyCheckAlt /> },
    { name: 'Transactions', path: '/transactions', icon: <FaList /> },
    { name: 'Expenses', path: '/expenses', icon: <FaMoneyBillWave /> },
    { name: 'Budget', path: '/budget', icon: <FaChartPie /> },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Manage Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Admin Wallets', path: '/admin/wallets', icon: <FaWallet /> },
    { name: 'Flagged Transactions', path: '/admin/transactions/flagged', icon: <FaExclamationCircle /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaList /> },
  ];

  const links = user.role === 'school_admin' ? adminLinks : parentLinks;

  return (
    <aside style={{ width: '250px', background: 'var(--surface)', borderRight: '1px solid var(--border-light)', padding: '1rem', height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <li key={link.path}>
              <Link 
                to={link.path} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.75rem', 
                  borderRadius: '4px',
                  background: isActive ? 'var(--bg-main)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-dark)',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                {link.icon} {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
