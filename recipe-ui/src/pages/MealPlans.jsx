import { useState, useEffect } from 'react';
import api from '../services/api';
import { MealType } from '../types';
import './MealPlans.css';

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    recipeId: '',
    date: '',
    mealType: MealType.DINNER,
    servings: 1,
    notes: ''
  });

  useEffect(() => {
    loadMealPlans();
    loadRecipes();
  }, []);

  const loadMealPlans = async () => {
    try {
      setLoading(true);
      const data = await api.getMealPlans();
      setMealPlans(data);
      setError(null);
    } catch (err) {
      setError('Failed to load meal plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadRecipes = async () => {
    try {
      const data = await api.getRecipes();
      setRecipes(data);
    } catch (err) {
      console.error('Failed to load recipes:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      recipeId: parseInt(formData.recipeId),
      servings: parseInt(formData.servings)
    };

    try {
      if (editingId) {
        await api.updateMealPlan(editingId, payload);
      } else {
        await api.createMealPlan(payload);
      }
      resetForm();
      loadMealPlans();
    } catch (err) {
      alert('Failed to save meal plan');
      console.error(err);
    }
  };

  const handleEdit = (mealPlan) => {
    setFormData({
      recipeId: mealPlan.recipeId?.toString() || '',
      date: mealPlan.date?.split('T')[0] || '',
      mealType: mealPlan.mealType || MealType.DINNER,
      servings: mealPlan.servings || 1,
      notes: mealPlan.notes || ''
    });
    setEditingId(mealPlan.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal plan?')) {
      return;
    }

    try {
      await api.deleteMealPlan(id);
      loadMealPlans();
    } catch (err) {
      alert('Failed to delete meal plan');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      recipeId: '',
      date: '',
      mealType: MealType.DINNER,
      servings: 1,
      notes: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const groupByDate = () => {
    const grouped = {};
    mealPlans.forEach(plan => {
      const date = plan.date?.split('T')[0] || 'Unknown';
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(plan);
    });
    return grouped;
  };

  const groupedPlans = groupByDate();

  return (
    <div className="meal-plans-page">
      <div className="page-header">
        <h1>Meal Plans</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'Add Meal Plan'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="meal-plan-form">
          <h3>{editingId ? 'Edit Meal Plan' : 'New Meal Plan'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Recipe *</label>
              <select
                value={formData.recipeId}
                onChange={(e) => setFormData({ ...formData, recipeId: e.target.value })}
                required
                className="form-input"
              >
                <option value="">Select a recipe</option>
                {recipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Meal Type *</label>
              <select
                value={formData.mealType}
                onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                className="form-input"
              >
                {Object.values(MealType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Servings *</label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                min="1"
                required
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="form-textarea"
              rows="2"
              placeholder="Optional notes..."
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

      {loading && <div className="loading">Loading meal plans...</div>}
      {error && <div className="error">{error}</div>}

      <div className="meal-plans-timeline">
        {Object.keys(groupedPlans).sort().map(date => (
          <div key={date} className="date-group">
            <h2 className="date-header">{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
            <div className="meals-grid">
              {groupedPlans[date]
                .sort((a, b) => {
                  const order = { 'Breakfast': 1, 'Lunch': 2, 'Dinner': 3, 'Snack': 4 };
                  return (order[a.mealType] || 5) - (order[b.mealType] || 5);
                })
                .map(plan => (
                  <div key={plan.id} className="meal-card">
                    <div className="meal-type-badge">{plan.mealType}</div>
                    <h4>{plan.recipeName}</h4>
                    <p className="servings">Servings: {plan.servings}</p>
                    {plan.notes && <p className="notes">{plan.notes}</p>}
                    <div className="meal-actions">
                      <button onClick={() => handleEdit(plan)} className="btn-small btn-secondary">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(plan.id)} className="btn-small btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {!loading && mealPlans.length === 0 && (
        <div className="empty-state">
          <p>No meal plans found. Start planning your meals for the week!</p>
        </div>
      )}
    </div>
  );
}

export default MealPlans;
