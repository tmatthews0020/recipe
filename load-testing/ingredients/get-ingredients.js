import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 50,
};

export default function () {
  // Make a GET request to retrieve all ingredients
  const response = http.get(
    'http://localhost:5000/api/ingredients',
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const ingredients = response.body ? JSON.parse(response.body) : [];
  console.log(`Retrieved ${ingredients.length} ingredients - Status: ${response.status}`);

  sleep(1);
}
