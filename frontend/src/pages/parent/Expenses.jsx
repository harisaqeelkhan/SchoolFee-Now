import React, { useState } from 'react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Math Books', category: 'Books', amount: 5000, date: '2026-05-02' },
    { id: 2, title: 'School Uniforms', category: 'Clothing', amount: 8500, date: '2026-05-04' },
    { id: 3, title: 'Science Project Kit', category: 'Supplies', amount: 3200, date: '2026-05-06' }
  ]);
  const [formData, setFormData] = useState({ title: '', category: '', amount: '', date: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { id: Date.now(), ...formData }]);
    setFormData({ title: '', category: '', amount: '', date: '' });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Educational Expenses Tracker</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        Manage your child's out-of-pocket educational expenses.
      </p>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Log New Expense</h3>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mt-4" style={{ marginTop: '1rem', alignItems: 'center' }}>
          <input type="text" className="form-input" placeholder="Title (e.g. Notebooks)" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ flex: 1 }} />
          <input type="text" className="form-input" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={{ flex: 1 }} />
          <input type="number" className="form-input" placeholder="Amount (PKR)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required style={{ flex: 1 }} />
          <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required style={{ flex: 1 }} />
          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap', height: '42px', padding: '0 1.5rem' }}>Save Expense</button>
        </form>
      </div>

      <div className="card">
        <h3>Recent Expenses</h3>
        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount (PKR)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td style={{ fontWeight: 'bold' }}>{exp.title}</td>
                  <td><span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{exp.category}</span></td>
                  <td style={{ color: 'red', fontWeight: 'bold' }}>- {Number(exp.amount).toLocaleString()}</td>
                  <td>{exp.date}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: 'red', borderColor: 'red' }} onClick={() => deleteExpense(exp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
