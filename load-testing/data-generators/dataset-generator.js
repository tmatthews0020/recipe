import { RecipeFaker } from './recipe-generator.js';
import { generateSearchQueries } from './search-generator.js';

const faker = new RecipeFaker();

/**
 * Generate a single random recipe
 */
export function generateRecipe(overrides = {}) {
  return faker.recipe(overrides);
}

/**
 * Generate multiple recipes
 */
export function generateRecipes(count = 10) {
  return faker.recipes(count);
}

/**
 * Generate recipe update data (partial recipe)
 */
export function generateRecipeUpdate() {
  return {
    name: faker.dishName(),
    description: faker.description(),
    rating: faker.randomFloat(3.5, 5.0, 1),
  };
}

/**
 * Pre-generated dataset for consistent load testing
 * Generate this once at the start of the test
 */
export function generateTestDataset(size = 100) {
  return {
    recipes: faker.recipes(size),
    searchQueries: generateSearchQueries(20),
    updates: Array.from({ length: 20 }, () => generateRecipeUpdate()),
  };
}
