import React, { useState } from 'react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Math Books', category: 'Books', amount: 5000, date: '2026-05-02' }
  ]);
  const [formData, setFormData] = useState({ title: '', category: '', amount: '', date: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { id: Date.now(), ...formData }]);
    setFormData({ title: '', category: '', amount: '', date: '' });
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Educational Expenses</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Add Expense</h3>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mt-4" style={{ marginTop: '1rem' }}>
          <input type="text" className="form-input" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <input type="text" className="form-input" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
          <input type="number" className="form-input" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
          <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>

      <div className="card">
        <h3>All Expenses</h3>
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
                  <td>{exp.title}</td>
                  <td>{exp.category}</td>
                  <td>{exp.amount.toLocaleString()}</td>
                  <td>{exp.date}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Edit</button>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'red', borderColor: 'red' }} onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))}>Delete</button>
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
