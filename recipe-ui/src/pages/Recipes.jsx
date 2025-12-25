import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadCategories();
    loadRecipes();
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [searchTerm, selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const categoryId = selectedCategory || null;
      const data = await api.getRecipes(searchTerm, categoryId);
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await api.deleteRecipe(id);
      loadRecipes();
    } catch (err) {
      alert('Failed to delete recipe');
      console.error(err);
    }
  };

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1>Recipes</h1>
        <Link to="/recipes/new" className="btn btn-primary">Add Recipe</Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading recipes...</div>}
      {error && <div className="error">{error}</div>}

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            {recipe.imageUrl && (
              <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
            )}
            <div className="recipe-content">
              <h3>{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span>Prep: {recipe.prepTimeMinutes}m</span>
                <span>Cook: {recipe.cookTimeMinutes}m</span>
                <span>Servings: {recipe.servings}</span>
                <span className={`difficulty ${recipe.difficulty?.toLowerCase()}`}>
                  {recipe.difficulty}
                </span>
              </div>
              <div className="recipe-actions">
                <Link to={`/recipes/${recipe.id}`} className="btn btn-secondary">View</Link>
                <Link to={`/recipes/${recipe.id}/edit`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(recipe.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && recipes.length === 0 && (
        <div className="empty-state">
          <p>No recipes found. Try adjusting your search or create a new recipe.</p>
        </div>
      )}
    </div>
  );
}

export default Recipes;
