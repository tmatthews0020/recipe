const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Recipes
  async getRecipes(search = '', categoryId = null) {
    let endpoint = '/recipes';
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (categoryId) params.append('categoryId', categoryId);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return this.request(endpoint);
  }

  async getRecipe(id) {
    return this.request(`/recipes/${id}`);
  }

  async createRecipe(recipe) {
    return this.request('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
  }

  async updateRecipe(id, recipe) {
    return this.request(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe),
    });
  }

  async deleteRecipe(id) {
    return this.request(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }

  // Ingredients
  async getIngredients(search = '') {
    let endpoint = '/ingredients';
    if (search) endpoint += `?search=${encodeURIComponent(search)}`;
    return this.request(endpoint);
  }

  async getIngredient(id) {
    return this.request(`/ingredients/${id}`);
  }

  async createIngredient(ingredient) {
    return this.request('/ingredients', {
      method: 'POST',
      body: JSON.stringify(ingredient),
    });
  }

  async updateIngredient(id, ingredient) {
    return this.request(`/ingredients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ingredient),
    });
  }

  async deleteIngredient(id) {
    return this.request(`/ingredients/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(id) {
    return this.request(`/categories/${id}`);
  }

  async createCategory(category) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }

  async updateCategory(id, category) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    });
  }

  async deleteCategory(id) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Meal Plans
  async getMealPlans(startDate = null, endDate = null) {
    let endpoint = '/mealplans';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return this.request(endpoint);
  }

  async getMealPlan(id) {
    return this.request(`/mealplans/${id}`);
  }

  async createMealPlan(mealPlan) {
    return this.request('/mealplans', {
      method: 'POST',
      body: JSON.stringify(mealPlan),
    });
  }

  async updateMealPlan(id, mealPlan) {
    return this.request(`/mealplans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mealPlan),
    });
  }

  async deleteMealPlan(id) {
    return this.request(`/mealplans/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping Lists
  async getShoppingLists() {
    return this.request('/shoppinglists');
  }

  async getShoppingList(id) {
    return this.request(`/shoppinglists/${id}`);
  }

  async createShoppingList(shoppingList) {
    return this.request('/shoppinglists', {
      method: 'POST',
      body: JSON.stringify(shoppingList),
    });
  }

  async updateShoppingList(id, shoppingList) {
    return this.request(`/shoppinglists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shoppingList),
    });
  }

  async deleteShoppingList(id) {
    return this.request(`/shoppinglists/${id}`, {
      method: 'DELETE',
    });
  }

  async addShoppingListItem(listId, item) {
    return this.request(`/shoppinglists/${listId}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateShoppingListItem(itemId, item) {
    return this.request(`/shoppinglists/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async deleteShoppingListItem(itemId) {
    return this.request(`/shoppinglists/items/${itemId}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
