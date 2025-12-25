import { BaseFaker } from './faker-utils.js';

export class IngredientFaker extends BaseFaker {
  // Ingredient-specific data generators
  ingredientName() {
    const vegetables = ['Tomato', 'Carrot', 'Broccoli', 'Spinach', 'Bell Pepper', 'Onion', 'Garlic', 'Cucumber', 'Lettuce', 'Zucchini'];
    const proteins = ['Chicken Breast', 'Ground Beef', 'Salmon', 'Tofu', 'Eggs', 'Turkey', 'Pork Chop', 'Shrimp', 'Tuna', 'Black Beans'];
    const grains = ['Rice', 'Pasta', 'Quinoa', 'Bread', 'Flour', 'Oats', 'Couscous', 'Barley'];
    const dairy = ['Milk', 'Cheese', 'Butter', 'Yogurt', 'Cream', 'Mozzarella', 'Parmesan', 'Cheddar'];
    const spices = ['Salt', 'Black Pepper', 'Cumin', 'Paprika', 'Oregano', 'Basil', 'Thyme', 'Cinnamon', 'Turmeric', 'Ginger'];
    const oils = ['Olive Oil', 'Vegetable Oil', 'Coconut Oil', 'Sesame Oil', 'Canola Oil'];
    const condiments = ['Soy Sauce', 'Vinegar', 'Mustard', 'Ketchup', 'Mayonnaise', 'Hot Sauce', 'Worcestershire Sauce'];
    const fruits = ['Apple', 'Banana', 'Orange', 'Lemon', 'Lime', 'Strawberry', 'Blueberry', 'Mango', 'Avocado', 'Pineapple'];
    const nuts = ['Almonds', 'Walnuts', 'Cashews', 'Peanuts', 'Pecans', 'Pine Nuts'];

    const allIngredients = [
      ...vegetables, ...proteins, ...grains, ...dairy, ...spices,
      ...oils, ...condiments, ...fruits, ...nuts
    ];

    return this.randomElement(allIngredients);
  }

  category() {
    const categories = [
      'Vegetables',
      'Proteins',
      'Grains',
      'Dairy',
      'Spices',
      'Oils',
      'Condiments',
      'Fruits',
      'Nuts & Seeds',
      'Baking',
      'Seafood',
      'Meat',
      'Herbs',
      'Sweeteners',
      'Beverages'
    ];
    return this.randomElement(categories);
  }

  // Generate a complete fake ingredient (for CreateIngredientDto)
  createIngredient(overrides = {}) {
    return {
      name: this.ingredientName(),
      category: this.category(),
      ...overrides
    };
  }

  // Generate update data (for UpdateIngredientDto)
  updateIngredient(overrides = {}) {
    return {
      name: this.ingredientName(),
      category: this.category(),
      ...overrides
    };
  }

  // Generate multiple ingredients
  ingredients(count) {
    const ingredients = [];
    for (let i = 0; i < count; i++) {
      ingredients.push(this.createIngredient());
    }
    return ingredients;
  }
}
