import { useState, useEffect } from 'react';
import api from '../services/api';
import './Ingredients.css';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: ''
  });

  useEffect(() => {
    loadIngredients();
  }, [searchTerm]);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await api.getIngredients(searchTerm);
      setIngredients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load ingredients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateIngredient(editingId, formData);
      } else {
        await api.createIngredient(formData);
      }
      resetForm();
      loadIngredients();
    } catch (err) {
      alert('Failed to save ingredient');
      console.error(err);
    }
  };

  const handleEdit = (ingredient) => {
    setFormData({
      name: ingredient.name,
      category: ingredient.category || '',
      unit: ingredient.unit || ''
    });
    setEditingId(ingredient.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ingredient?')) {
      return;
    }

    try {
      await api.deleteIngredient(id);
      loadIngredients();
    } catch (err) {
      alert('Failed to delete ingredient');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', unit: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="ingredients-page">
      <div className="page-header">
        <h1>Ingredients</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'Add Ingredient'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="ingredient-form">
          <h3>{editingId ? 'Edit Ingredient' : 'New Ingredient'}</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Category (e.g., Dairy, Produce)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Default Unit (e.g., cup, tbsp)"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <div className="loading">Loading ingredients...</div>}
      {error && <div className="error">{error}</div>}

      <div className="ingredients-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Default Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(ingredient => (
              <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.category || '-'}</td>
                <td>{ingredient.unit || '-'}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(ingredient)} className="btn-small btn-secondary">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ingredient.id)} className="btn-small btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && ingredients.length === 0 && (
        <div className="empty-state">
          <p>No ingredients found. Create your first ingredient to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Ingredients;
