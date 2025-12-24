import { RecipeFaker } from './recipe-generator.js';

const faker = new RecipeFaker();

/**
 * Generate random search parameters for recipe queries
 */
export function generateSearchParams() {
  return {
    cuisine: faker.cuisine(),
    difficulty: faker.difficulty(),
    maxPrepTime: faker.randomInt(15, 60),
    minRating: faker.randomFloat(3, 5, 1),
  };
}

/**
 * Generate multiple search parameter sets
 */
export function generateSearchQueries(count = 10) {
  const queries = [];
  for (let i = 0; i < count; i++) {
    queries.push(generateSearchParams());
  }
  return queries;
}
