import React, { useState } from 'react';

const FeeCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Tuition', description: 'Monthly tuition fees' },
    { id: 2, name: 'Transport', description: 'Bus and van fees' },
  ]);
  const [newCat, setNewCat] = useState({ name: '', description: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setCategories([...categories, { id: Date.now(), ...newCat }]);
    setNewCat({ name: '', description: '' });
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Fee Categories</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Add Category</h3>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mt-4" style={{ marginTop: '1rem' }}>
          <input type="text" className="form-input" placeholder="Category Name" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} required />
          <input type="text" className="form-input" placeholder="Description" value={newCat.description} onChange={e => setNewCat({...newCat, description: e.target.value})} required style={{ flex: 1 }} />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>

      <div className="card">
        <h3>Current Categories</h3>
        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Edit</button>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'red', borderColor: 'red' }} onClick={() => setCategories(categories.filter(cat => cat.id !== c.id))}>Delete</button>
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

export default FeeCategories;
