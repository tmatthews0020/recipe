import { BaseFaker } from './faker-utils.js';

export class RecipeFaker extends BaseFaker {
  // Recipe-specific data generators
  dishName() {
    const adjectives = ['Spicy', 'Sweet', 'Savory', 'Crispy', 'Creamy', 'Tangy', 'Herbed', 'Grilled', 'Baked', 'Fresh'];
    const proteins = ['Chicken', 'Beef', 'Salmon', 'Tofu', 'Pork', 'Shrimp', 'Turkey', 'Lamb'];
    const styles = ['Stir-Fry', 'Curry', 'Pasta', 'Tacos', 'Soup', 'Salad', 'Bowl', 'Sandwich', 'Casserole', 'Pizza'];

    return `${this.randomElement(adjectives)} ${this.randomElement(proteins)} ${this.randomElement(styles)}`;
  }

  description() {
    const templates = [
      'A delicious and easy-to-make dish perfect for any occasion.',
      'This recipe combines fresh ingredients with bold flavors.',
      'A family favorite that comes together in minutes.',
      'Restaurant-quality taste made right in your own kitchen.',
      'Healthy, flavorful, and absolutely satisfying.',
      'The perfect comfort food for busy weeknights.',
      'A crowd-pleasing recipe that never disappoints.',
      'Simple ingredients, incredible flavor.',
    ];
    return this.randomElement(templates);
  }

  ingredient() {
    const ingredients = [
      'Chicken Breast', 'Olive Oil', 'Garlic', 'Onion', 'Tomatoes', 'Bell Pepper',
      'Rice', 'Pasta', 'Cheese', 'Butter', 'Salt', 'Black Pepper', 'Basil',
      'Oregano', 'Lemon', 'Soy Sauce', 'Ginger', 'Carrots', 'Broccoli',
      'Potatoes', 'Beef', 'Eggs', 'Milk', 'Flour', 'Sugar', 'Honey'
    ];
    return this.randomElement(ingredients);
  }

  unit() {
    const units = ['cup', 'cups', 'tbsp', 'tsp', 'oz', 'lb', 'g', 'kg', 'ml', 'piece', 'pieces', 'clove', 'cloves'];
    return this.randomElement(units);
  }

  difficulty() {
    return this.randomElement(['Easy', 'Medium', 'Hard']);
  }

  cuisine() {
    return this.randomElement(['Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'French', 'American', 'Mediterranean', 'Korean']);
  }

  // Generate a complete fake recipe
  recipe(overrides = {}) {
    const ingredientCount = this.randomInt(3, 12);
    const ingredients = [];

    for (let i = 0; i < ingredientCount; i++) {
      ingredients.push({
        ingredientId: this.randomInt(0, 100),
        ingredientName: this.ingredient(),
        amount: this.randomFloat(0.25, 5, 2),
        unit: this.unit()
      });
    }

    const stepCount = this.randomInt(3, 8);
    const steps = [];
    for (let i = 0; i < stepCount; i++) {
      steps.push(`Step ${i + 1}: ${this.description()}`);
    }

    return {
      id: this.uuid(),
      name: this.dishName(),
      description: this.description(),
      prepTime: this.randomInt(5, 60),
      cookTime: this.randomInt(10, 180),
      servings: this.randomInt(2, 8),
      difficulty: this.difficulty(),
      cuisine: this.cuisine(),
      ingredients: ingredients,
      steps: steps,
      rating: this.randomFloat(3.5, 5.0, 1),
      author: this.personName(),
      createdAt: new Date(Date.now() - this.randomInt(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
      ...overrides
    };
  }

  // Generate multiple recipes
  recipes(count) {
    const recipes = [];
    for (let i = 0; i < count; i++) {
      recipes.push(this.recipe());
    }
    return recipes;
  }
}
