import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Recipe Manager</h1>
      <p className="subtitle">Manage your recipes, plan meals, and create shopping lists</p>

      <div className="feature-grid">
        <Link to="/recipes" className="feature-card">
          <h2>Recipes</h2>
          <p>Browse, create, and manage your recipe collection</p>
        </Link>

        <Link to="/ingredients" className="feature-card">
          <h2>Ingredients</h2>
          <p>Manage your ingredient inventory</p>
        </Link>

        <Link to="/categories" className="feature-card">
          <h2>Categories</h2>
          <p>Organize recipes by cuisine and meal type</p>
        </Link>

        <Link to="/meal-plans" className="feature-card">
          <h2>Meal Plans</h2>
          <p>Plan your meals for the week</p>
        </Link>

        <Link to="/shopping-lists" className="feature-card">
          <h2>Shopping Lists</h2>
          <p>Create and manage shopping lists</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
