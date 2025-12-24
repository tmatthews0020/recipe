import http from 'k6/http';
import { sleep } from 'k6';
import { generateTestDataset } from '../data-generators/index.js';

export const options = {
  iterations: 100,
};

// Generate test dataset once at initialization (more efficient for load testing)
const testData = generateTestDataset(100);
let currentIndex = 0;

export default function () {
  // Use pre-generated recipe (cycles through the dataset)
  const recipe = testData.recipes[currentIndex % testData.recipes.length];
  currentIndex++;

  // Make a POST request to create a recipe
  const response = http.post(
    'http://localhost:5000/api/recipes',
    JSON.stringify(recipe),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(`Created recipe: ${recipe.name} - Status: ${response.status}`);

  sleep(1);
}
