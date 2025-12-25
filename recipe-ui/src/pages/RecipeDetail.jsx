import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const data = await api.getRecipe(id);
      setRecipe(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipe');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await api.deleteRecipe(id);
      navigate('/recipes');
    } catch (err) {
      alert('Failed to delete recipe');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading recipe...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div className="error">Recipe not found</div>;

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="recipe-detail">
      <div className="detail-header">
        <Link to="/recipes" className="back-link">&larr; Back to Recipes</Link>
        <div className="detail-actions">
          <Link to={`/recipes/${id}/edit`} className="btn btn-secondary">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>

      <div className="recipe-hero">
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt={recipe.name} className="hero-image" />
        )}
        <div className="hero-content">
          <h1>{recipe.name}</h1>
          <p className="description">{recipe.description}</p>
          <div className="recipe-info">
            <div className="info-item">
              <strong>Prep Time:</strong> {recipe.prepTimeMinutes} min
            </div>
            <div className="info-item">
              <strong>Cook Time:</strong> {recipe.cookTimeMinutes} min
            </div>
            <div className="info-item">
              <strong>Total Time:</strong> {totalTime} min
            </div>
            <div className="info-item">
              <strong>Servings:</strong> {recipe.servings}
            </div>
            <div className="info-item">
              <strong>Difficulty:</strong>{' '}
              <span className={`difficulty ${recipe.difficulty?.toLowerCase()}`}>
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-sections">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing.quantity} {ing.unit} {ing.ingredientName}
                  {ing.notes && <span className="ingredient-notes"> ({ing.notes})</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ingredients listed</p>
          )}
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            <ol className="instructions-list">
              {recipe.instructions
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map((step) => (
                  <li key={step.stepNumber}>
                    <p>{step.description}</p>
                    {step.timeMinutes > 0 && (
                      <span className="step-time">Time: {step.timeMinutes} min</span>
                    )}
                  </li>
                ))}
            </ol>
          ) : (
            <p>No instructions provided</p>
          )}
        </div>
      </div>

      {recipe.nutritionalInfo && (
        <div className="nutrition-section">
          <h2>Nutritional Information</h2>
          <div className="nutrition-grid">
            <div className="nutrition-item">
              <strong>Calories</strong>
              <span>{recipe.nutritionalInfo.calories}</span>
            </div>
            <div className="nutrition-item">
              <strong>Protein</strong>
              <span>{recipe.nutritionalInfo.protein}g</span>
            </div>
            <div className="nutrition-item">
              <strong>Carbs</strong>
              <span>{recipe.nutritionalInfo.carbohydrates}g</span>
            </div>
            <div className="nutrition-item">
              <strong>Fat</strong>
              <span>{recipe.nutritionalInfo.fat}g</span>
            </div>
            {recipe.nutritionalInfo.fiber > 0 && (
              <div className="nutrition-item">
                <strong>Fiber</strong>
                <span>{recipe.nutritionalInfo.fiber}g</span>
              </div>
            )}
          </div>
        </div>
      )}

      {recipe.categories && recipe.categories.length > 0 && (
        <div className="categories-section">
          <h3>Categories</h3>
          <div className="category-tags">
            {recipe.categories.map(cat => (
              <span key={cat.id} className="category-tag">{cat.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
