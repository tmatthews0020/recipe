import http from 'k6/http';
import { sleep } from 'k6';
import { IngredientFaker } from '../data-generators/index.js';

export const options = {
  iterations: 50,
};

const faker = new IngredientFaker();

export default function () {
  // Generate a new ingredient for each request
  const ingredient = faker.createIngredient();

  // Make a POST request to create an ingredient
  const response = http.post(
    'http://localhost:5000/api/ingredients',
    JSON.stringify(ingredient),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(`Created ingredient: ${ingredient.name} (${ingredient.category}) - Status: ${response.status}`);

  sleep(1);
}
