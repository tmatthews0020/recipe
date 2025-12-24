import http from 'k6/http';
import { sleep } from 'k6';
import { generateSearchParams } from '../data-generators/index.js';

export const options = {
  iterations: 10,
};

export default function () {
  // Generate random search parameters
  const searchParams = generateSearchParams();

  // Build query string
  const queryString = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Make a GET request with search parameters
  const response = http.get(`http://localhost:5000/api/recipes?${queryString}`);

  console.log(`Searching for ${searchParams.cuisine} recipes - Status: ${response.status}`);

  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}
