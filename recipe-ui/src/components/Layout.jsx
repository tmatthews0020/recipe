import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Recipe Manager
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/recipes" className="nav-link">Recipes</Link>
            </li>
            <li className="nav-item">
              <Link to="/ingredients" className="nav-link">Ingredients</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
              <Link to="/meal-plans" className="nav-link">Meal Plans</Link>
            </li>
            <li className="nav-item">
              <Link to="/shopping-lists" className="nav-link">Shopping Lists</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
