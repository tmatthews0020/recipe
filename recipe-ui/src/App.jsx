import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import RecipeForm from './pages/RecipeForm';
import Ingredients from './pages/Ingredients';
import Categories from './pages/Categories';
import MealPlans from './pages/MealPlans';
import ShoppingLists from './pages/ShoppingLists';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/new" element={<RecipeForm />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
          <Route path="recipes/:id/edit" element={<RecipeForm />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="categories" element={<Categories />} />
          <Route path="meal-plans" element={<MealPlans />} />
          <Route path="shopping-lists" element={<ShoppingLists />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
