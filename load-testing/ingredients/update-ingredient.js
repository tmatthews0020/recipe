import http from 'k6/http';
import { sleep } from 'k6';
import { IngredientFaker } from '../data-generators/index.js';

export const options = {
  iterations: 30,
};

const faker = new IngredientFaker();

// IDs to update (adjust these based on your test data)
// You may want to run bulk-create-ingredients.js first to populate data
const testIds = Array.from({ length: 50 }, (_, i) => i + 1);
let currentIndex = 0;

export default function () {
  // Cycle through test IDs
  const id = testIds[currentIndex % testIds.length];
  currentIndex++;

  // Generate update data
  const updateData = faker.updateIngredient();

  // Make a PUT request to update the ingredient
  const response = http.put(
    `http://localhost:5000/api/ingredients/${id}`,
    JSON.stringify(updateData),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(`Updated ingredient ID ${id}: ${updateData.name} (${updateData.category}) - Status: ${response.status}`);

  sleep(1);
}
