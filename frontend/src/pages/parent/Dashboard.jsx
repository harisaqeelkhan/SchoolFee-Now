import React from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import AlertError from '../../components/ui/AlertError';
import MetricCard from '../../components/dashboard/MetricCard';
import TransactionTable from '../../components/dashboard/TransactionTable';
import ExpenseChart from '../../components/dashboard/ExpenseChart';
import { useFetch } from '../../hooks/useFetch';

const Dashboard = () => {
  const { data: walletData, loading: walletLoading, error: walletError } = useFetch('/wallet');
  const { data: txnData, loading: txnLoading, error: txnError } = useFetch('/transactions?limit=5');
  const { data: plansData, loading: plansLoading } = useFetch('/bnpl/plans');
  const { data: summaryData, loading: summaryLoading } = useFetch('/transactions/summary');

  if (walletLoading || txnLoading || plansLoading || summaryLoading) return <LoadingSpinner />;
  
  if (walletError || txnError) {
    return <AlertError message={walletError || txnError} />;
  }

  const activePlansCount = plansData ? plansData.filter(p => p.status === 'active').length : 0;
  const totalExpenses = summaryData ? summaryData.reduce((acc, curr) => acc + curr.totalAmount, 0) : 0;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = summaryData && summaryData.length > 0 
    ? summaryData.slice(0, 6).reverse().map(item => {
        const d = new Date(item._id + '-01');
        return {
          label: monthNames[d.getMonth()],
          expense: item.totalAmount,
          bnpl: 0 // Mocked split for MVP
        };
      }) 
    : undefined;

  const dashboardData = {
    balance: walletData?.balance || 0,
    activePlans: activePlansCount,
    totalExpenses: totalExpenses,
    transactions: txnData || []
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: 0 }}>Parent Dashboard</h1>
        <button className="btn btn-primary" onClick={() => window.location.href='/bnpl/apply'}>Apply for BNPL</button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '2rem' }}>
        <MetricCard 
          title="Total Demo Balance" 
          value={`PKR ${dashboardData.balance.toLocaleString()}`} 
          isHighlighted={true} 
        />
        <MetricCard 
          title="Active BNPL Plans" 
          value={dashboardData.activePlans} 
        />
        <MetricCard 
          title="Total Expenses" 
          value={`PKR ${dashboardData.totalExpenses.toLocaleString()}`} 
        />
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <ExpenseChart data={chartData} />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Recent Transactions</h3>
        </div>
        <TransactionTable transactions={dashboardData.transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
