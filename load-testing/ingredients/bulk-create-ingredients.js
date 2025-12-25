import http from 'k6/http';
import { sleep } from 'k6';
import { IngredientFaker } from '../data-generators/index.js';

export const options = {
  iterations: 100,
};

// Pre-generate test dataset for better performance
const faker = new IngredientFaker();
const testData = faker.ingredients(100);
let currentIndex = 0;

export default function () {
  // Use pre-generated ingredient (cycles through the dataset)
  const ingredient = testData[currentIndex % testData.length];
  currentIndex++;

  // Make a POST request to create an ingredient
  const response = http.post(
    'http://localhost:5000/api/ingredients',
    JSON.stringify(ingredient),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(`Created ingredient: ${ingredient.name} (${ingredient.category}) - Status: ${response.status}`);
}
