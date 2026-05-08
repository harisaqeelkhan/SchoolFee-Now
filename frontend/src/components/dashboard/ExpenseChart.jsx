import React from 'react';

const ExpenseChart = ({ data }) => {
  // Mock data if none provided
  const chartData = data || [
    { label: 'Jan', expense: 40000, bnpl: 15000 },
    { label: 'Feb', expense: 30000, bnpl: 15000 },
    { label: 'Mar', expense: 50000, bnpl: 20000 },
    { label: 'Apr', expense: 25000, bnpl: 15000 },
    { label: 'May', expense: 60000, bnpl: 25000 },
    { label: 'Jun', expense: 35000, bnpl: 15000 },
  ];

  const maxVal = chartData.length > 0 
    ? Math.max(...chartData.map(d => d.expense + d.bnpl), 1000) 
    : 1000;

  return (
    <div className="card" style={{ padding: '2rem', height: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-muted)' }}>Monthly Outflow (PKR)</h3>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, gap: '8px' }}>
        {chartData.map((item, index) => {
          const expenseHeight = (item.expense / maxVal) * 100;
          const bnplHeight = (item.bnpl / maxVal) * 100;
          
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', padding: '0 10%' }}>
                {/* BNPL Stack */}
                {bnplHeight > 0 && (
                  <div style={{ 
                    width: '100%', 
                    height: `${bnplHeight}%`, 
                    backgroundColor: 'var(--primary)',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    marginBottom: '2px'
                  }}></div>
                )}
                {/* Expense Stack */}
                {expenseHeight > 0 && (
                  <div style={{ 
                    width: '100%', 
                    height: `${expenseHeight}%`, 
                    backgroundColor: 'var(--text-dark)',
                    borderTopLeftRadius: bnplHeight === 0 ? '4px' : '0',
                    borderTopRightRadius: bnplHeight === 0 ? '4px' : '0',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '4px'
                  }}></div>
                )}
              </div>
              <span style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.label}</span>
            </div>
          );
        })}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--text-dark)', borderRadius: '2px' }}></div>
          <span style={{ fontSize: '0.85rem' }}>Direct Payment</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', borderRadius: '2px' }}></div>
          <span style={{ fontSize: '0.85rem' }}>BNPL Funded</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
