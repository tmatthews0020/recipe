import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 20,
};

// IDs to delete (adjust these based on your test data)
// WARNING: This will actually delete ingredients from your database
// Make sure you're running against a test database
const testIds = Array.from({ length: 100 }, (_, i) => i + 1);
let currentIndex = 0;

export default function () {
  // Cycle through test IDs
  const id = testIds[currentIndex % testIds.length];
  currentIndex++;

  // Make a DELETE request to remove the ingredient
  const response = http.del(
    `http://localhost:5000/api/ingredients/${id}`,
    null,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(`Deleted ingredient ID ${id} - Status: ${response.status}`);

  sleep(1);
}
