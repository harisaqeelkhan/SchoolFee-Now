import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Layout from '../components/layout/Layout';

// Public Pages
import Landing from '../pages/public/Landing';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import NotFound from '../pages/public/NotFound';

// Parent Pages
import Dashboard from '../pages/parent/Dashboard';
import Wallet from '../pages/parent/Wallet';
import BNPLApply from '../pages/parent/BNPLApply';
import TransactionHistory from '../pages/parent/TransactionHistory';
import Expenses from '../pages/parent/Expenses';
import Budget from '../pages/parent/Budget';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminWallets from '../pages/admin/AdminWallets';
import FlaggedTransactions from '../pages/admin/FlaggedTransactions';
import FeeCategories from '../pages/admin/FeeCategories';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Parent Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/bnpl/apply" element={<BNPLApply />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/wallets" element={<AdminWallets />} />
          <Route path="/admin/transactions/flagged" element={<FlaggedTransactions />} />
          <Route path="/admin/categories" element={<FeeCategories />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
