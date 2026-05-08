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
import Reports from '../pages/parent/Reports';
import TransactionReceipt from '../pages/parent/TransactionReceipt';
import Notifications from '../pages/shared/Notifications';
import Profile from '../pages/shared/Profile';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminWallets from '../pages/admin/AdminWallets';
import FlaggedTransactions from '../pages/admin/FlaggedTransactions';
import AdminTransactions from '../pages/admin/AdminTransactions';
import FeeCategories from '../pages/admin/FeeCategories';
import AdminReports from '../pages/admin/AdminReports';

// New Portals
import SystemDashboard from '../pages/admin/SystemDashboard';
import StudentDashboard from '../pages/public/StudentDashboard';

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
          <Route path="/transactions/:id/receipt" element={<TransactionReceipt />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/wallets" element={<AdminWallets />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/transactions/flagged" element={<FlaggedTransactions />} />
          <Route path="/admin/categories" element={<FeeCategories />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/system/dashboard" element={<SystemDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
