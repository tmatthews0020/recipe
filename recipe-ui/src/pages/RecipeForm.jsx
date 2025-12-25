import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Difficulty } from '../types';
import './RecipeForm.css';

function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: Difficulty.MEDIUM,
    imageUrl: '',
    categoryIds: [],
    ingredients: [],
    instructions: [],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0
    }
  });

  useEffect(() => {
    loadCategories();
    loadIngredients();
    if (isEditing) {
      loadRecipe();
    }
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const data = await api.getRecipe(id);
      setFormData({
        name: data.name || '',
        description: data.description || '',
        prepTimeMinutes: data.prepTimeMinutes || 0,
        cookTimeMinutes: data.cookTimeMinutes || 0,
        servings: data.servings || 1,
        difficulty: data.difficulty || Difficulty.MEDIUM,
        imageUrl: data.imageUrl || '',
        categoryIds: data.categories?.map(c => c.id) || [],
        ingredients: data.ingredients || [],
        instructions: data.instructions || [],
        nutritionalInfo: data.nutritionalInfo || {
          calories: 0,
          protein: 0,
          carbohydrates: 0,
          fat: 0,
          fiber: 0
        }
      });
    } catch (err) {
      alert('Failed to load recipe');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadIngredients = async () => {
    try {
      const data = await api.getIngredients();
      setIngredients(data);
    } catch (err) {
      console.error('Failed to load ingredients:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        prepTimeMinutes: parseInt(formData.prepTimeMinutes),
        cookTimeMinutes: parseInt(formData.cookTimeMinutes),
        servings: parseInt(formData.servings),
        ingredients: formData.ingredients.map(ing => ({
          ...ing,
          quantity: parseFloat(ing.quantity),
          ingredientId: parseInt(ing.ingredientId)
        })),
        instructions: formData.instructions.map((inst, idx) => ({
          ...inst,
          stepNumber: idx + 1,
          timeMinutes: parseInt(inst.timeMinutes || 0)
        })),
        nutritionalInfo: {
          calories: parseFloat(formData.nutritionalInfo.calories || 0),
          protein: parseFloat(formData.nutritionalInfo.protein || 0),
          carbohydrates: parseFloat(formData.nutritionalInfo.carbohydrates || 0),
          fat: parseFloat(formData.nutritionalInfo.fat || 0),
          fiber: parseFloat(formData.nutritionalInfo.fiber || 0)
        }
      };

      if (isEditing) {
        await api.updateRecipe(id, payload);
      } else {
        await api.createRecipe(payload);
      }

      navigate('/recipes');
    } catch (err) {
      alert(`Failed to ${isEditing ? 'update' : 'create'} recipe`);
      console.error(err);
    }
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { ingredientId: '', quantity: '', unit: '', notes: '' }
      ]
    });
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [
        ...formData.instructions,
        { description: '', timeMinutes: 0 }
      ]
    });
  };

  const updateInstruction = (index, field, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index][field] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const removeInstruction = (index) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, i) => i !== index)
    });
  };

  const toggleCategory = (categoryId) => {
    const newCategoryIds = formData.categoryIds.includes(categoryId)
      ? formData.categoryIds.filter(id => id !== categoryId)
      : [...formData.categoryIds, categoryId];
    setFormData({ ...formData, categoryIds: newCategoryIds });
  };

  if (loading) {
    return <div className="loading">Loading recipe...</div>;
  }

  return (
    <div className="recipe-form-page">
      <div className="form-header">
        <h1>{isEditing ? 'Edit Recipe' : 'New Recipe'}</h1>
        <Link to="/recipes" className="btn btn-secondary">Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="recipe-form">
        <section className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Recipe Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Prep Time (minutes) *</label>
              <input
                type="number"
                value={formData.prepTimeMinutes}
                onChange={(e) => setFormData({ ...formData, prepTimeMinutes: e.target.value })}
                required
                min="0"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Cook Time (minutes) *</label>
              <input
                type="number"
                value={formData.cookTimeMinutes}
                onChange={(e) => setFormData({ ...formData, cookTimeMinutes: e.target.value })}
                required
                min="0"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Servings *</label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                required
                min="1"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Difficulty *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="form-input"
              >
                {Object.values(Difficulty).map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Categories</h2>
          <div className="category-checkboxes">
            {categories.map(cat => (
              <label key={cat.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.categoryIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2>Ingredients</h2>
            <button type="button" onClick={addIngredient} className="btn btn-secondary">
              Add Ingredient
            </button>
          </div>
          <div className="ingredients-list">
            {formData.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-row">
                <select
                  value={ing.ingredientId}
                  onChange={(e) => updateIngredient(index, 'ingredientId', e.target.value)}
                  required
                  className="form-input"
                >
                  <option value="">Select ingredient</option>
                  {ingredients.map(ingredient => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., cup, tbsp)"
                  value={ing.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={ing.notes}
                  onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2>Instructions</h2>
            <button type="button" onClick={addInstruction} className="btn btn-secondary">
              Add Step
            </button>
          </div>
          <div className="instructions-list">
            {formData.instructions.map((inst, index) => (
              <div key={index} className="instruction-row">
                <div className="step-number">{index + 1}</div>
                <textarea
                  placeholder="Instruction description"
                  value={inst.description}
                  onChange={(e) => updateInstruction(index, 'description', e.target.value)}
                  required
                  className="form-textarea"
                  rows="2"
                />
                <input
                  type="number"
                  placeholder="Time (min)"
                  value={inst.timeMinutes}
                  onChange={(e) => updateInstruction(index, 'timeMinutes', e.target.value)}
                  min="0"
                  className="form-input time-input"
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="form-section">
          <h2>Nutritional Information (per serving)</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                step="0.1"
                value={formData.nutritionalInfo.calories}
                onChange={(e) => setFormData({
                  ...formData,
                  nutritionalInfo: { ...formData.nutritionalInfo, calories: e.target.value }
                })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Protein (g)</label>
              <input
                type="number"
                step="0.1"
                value={formData.nutritionalInfo.protein}
                onChange={(e) => setFormData({
                  ...formData,
                  nutritionalInfo: { ...formData.nutritionalInfo, protein: e.target.value }
                })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Carbohydrates (g)</label>
              <input
                type="number"
                step="0.1"
                value={formData.nutritionalInfo.carbohydrates}
                onChange={(e) => setFormData({
                  ...formData,
                  nutritionalInfo: { ...formData.nutritionalInfo, carbohydrates: e.target.value }
                })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Fat (g)</label>
              <input
                type="number"
                step="0.1"
                value={formData.nutritionalInfo.fat}
                onChange={(e) => setFormData({
                  ...formData,
                  nutritionalInfo: { ...formData.nutritionalInfo, fat: e.target.value }
                })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Fiber (g)</label>
              <input
                type="number"
                step="0.1"
                value={formData.nutritionalInfo.fiber}
                onChange={(e) => setFormData({
                  ...formData,
                  nutritionalInfo: { ...formData.nutritionalInfo, fiber: e.target.value }
                })}
                className="form-input"
              />
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Recipe' : 'Create Recipe'}
          </button>
          <Link to="/recipes" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
