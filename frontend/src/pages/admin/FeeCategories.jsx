import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const FeeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/admin/categories');
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/admin/categories', newCat);
      setCategories([...categories, data.data]);
      setNewCat({ name: '', description: '' });
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  if (loading) return <LoadingSpinner />;

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
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Edit</button>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'red', borderColor: 'red' }} onClick={() => handleDelete(c._id)}>Delete</button>
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
