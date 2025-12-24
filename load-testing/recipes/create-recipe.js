import http from 'k6/http';
import { sleep } from 'k6';
import { generateRecipe } from '../data-generators/index.js';

export const options = {
  iterations: 10,
};

export default function () {
  // Generate a fake recipe
  const fakeRecipe = generateRecipe();

  // Make a POST request to create a recipe
  const response = http.post(
    'http://localhost:5000/api/recipes',
    JSON.stringify(fakeRecipe),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  // Optional: log response status
  console.log(`Created recipe: ${fakeRecipe.name} - Status: ${response.status}`);

  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}
