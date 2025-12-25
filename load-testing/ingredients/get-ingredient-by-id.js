import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 30,
};

// IDs to test (adjust these based on your test data)
// You may want to run bulk-create-ingredients.js first to populate data
const testIds = Array.from({ length: 50 }, (_, i) => i + 1);
let currentIndex = 0;

export default function () {
  // Cycle through test IDs
  const id = testIds[currentIndex % testIds.length];
  currentIndex++;

  // Make a GET request to retrieve ingredient by ID
  const response = http.get(
    `http://localhost:5000/api/ingredients/${id}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.status === 200) {
    const ingredient = JSON.parse(response.body);
    console.log(`Retrieved ingredient ID ${id}: ${ingredient.name} - Status: ${response.status}`);
  } else {
    console.log(`Ingredient ID ${id} - Status: ${response.status}`);
  }

  sleep(1);
}
