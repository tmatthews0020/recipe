import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 50,
};

// Common ingredient search terms
const searchTerms = [
  'chicken', 'beef', 'tomato', 'onion', 'garlic', 'cheese', 'pepper',
  'salt', 'oil', 'rice', 'pasta', 'milk', 'butter', 'egg', 'flour',
  'sugar', 'lemon', 'basil', 'oregano', 'carrot', 'broccoli', 'salmon',
  'tofu', 'yogurt', 'bread', 'spinach', 'mushroom', 'ginger', 'honey'
];

let currentIndex = 0;

export default function () {
  // Cycle through search terms
  const searchTerm = searchTerms[currentIndex % searchTerms.length];
  currentIndex++;

  // Make a GET request with search parameter
  const response = http.get(
    `http://localhost:5000/api/ingredients?search=${searchTerm}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(`Searched for: "${searchTerm}" - Status: ${response.status} - Results: ${response.body ? JSON.parse(response.body).length : 0}`);

  sleep(1);
}
