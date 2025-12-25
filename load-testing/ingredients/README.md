# Ingredients Load Tests

This directory contains K6 load tests for the Ingredients API endpoints.

## Prerequisites

1. **K6 installed**: Download from [k6.io](https://k6.io/docs/getting-started/installation/)
2. **API running**: Ensure the Recipe API is running on `http://localhost:5000`
3. **Test database**: Use a test database (these tests will create/modify/delete data)

## Available Load Tests

### 1. Create Ingredient (`create-ingredient.js`)

Tests the POST `/api/ingredients` endpoint with dynamically generated ingredient data.

```bash
k6 run load-testing/ingredients/create-ingredient.js
```

**Configuration:**
- **Iterations**: 50
- **Sleep**: 1 second between requests
- **Data**: Generates unique ingredients for each request

**Use case**: Test creation endpoint with varied data

---

### 2. Bulk Create Ingredients (`bulk-create-ingredients.js`)

High-performance test for POST `/api/ingredients` using pre-generated data.

```bash
k6 run load-testing/ingredients/bulk-create-ingredients.js
```

**Configuration:**
- **Iterations**: 100
- **Sleep**: 1 second between requests
- **Data**: Uses pre-generated dataset (more efficient)

**Use case**: Populate database with test data, high-volume creation testing

---

### 3. Get All Ingredients (`get-ingredients.js`)

Tests the GET `/api/ingredients` endpoint to retrieve all ingredients.

```bash
k6 run load-testing/ingredients/get-ingredients.js
```

**Configuration:**
- **Iterations**: 50
- **Sleep**: 1 second between requests

**Use case**: Test read performance for listing all ingredients

---

### 4. Get Ingredient by ID (`get-ingredient-by-id.js`)

Tests the GET `/api/ingredients/{id}` endpoint.

```bash
k6 run load-testing/ingredients/get-ingredient-by-id.js
```

**Configuration:**
- **Iterations**: 30
- **Sleep**: 1 second between requests
- **Test IDs**: 1-50 (cycles through)

**Use case**: Test individual ingredient retrieval performance

**Note**: Run `bulk-create-ingredients.js` first to ensure test data exists.

---

### 5. Search Ingredients (`search-ingredients.js`)

Tests the GET `/api/ingredients?search={term}` endpoint with various search terms.

```bash
k6 run load-testing/ingredients/search-ingredients.js
```

**Configuration:**
- **Iterations**: 50
- **Sleep**: 1 second between requests
- **Search terms**: Common ingredient names (chicken, beef, tomato, etc.)

**Use case**: Test search/filter performance

---

### 6. Update Ingredient (`update-ingredient.js`)

Tests the PUT `/api/ingredients/{id}` endpoint.

```bash
k6 run load-testing/ingredients/update-ingredient.js
```

**Configuration:**
- **Iterations**: 30
- **Sleep**: 1 second between requests
- **Test IDs**: 1-50 (cycles through)
- **Data**: Generates random update data

**Use case**: Test update performance

**Note**: Run `bulk-create-ingredients.js` first to ensure test data exists.

---

### 7. Delete Ingredient (`delete-ingredient.js`)

Tests the DELETE `/api/ingredients/{id}` endpoint.

```bash
k6 run load-testing/ingredients/delete-ingredient.js
```

**Configuration:**
- **Iterations**: 20
- **Sleep**: 1 second between requests
- **Test IDs**: 1-100 (cycles through)

**Use case**: Test delete performance

**⚠️ WARNING**: This will actually delete ingredients from your database. Make sure you're running against a test database!

---

## Test Data Generator

The ingredient data generator is located at `load-testing/data-generators/ingredient-generator.js`.

### IngredientFaker Class

```javascript
import { IngredientFaker } from '../data-generators/index.js';

const faker = new IngredientFaker();

// Generate a single ingredient
const ingredient = faker.createIngredient();

// Generate multiple ingredients
const ingredients = faker.ingredients(100);

// Generate update data
const updateData = faker.updateIngredient();
```

### Generated Data Structure

**CreateIngredientDto:**
```json
{
  "name": "Chicken Breast",
  "category": "Proteins"
}
```

**Categories include:**
- Vegetables
- Proteins
- Grains
- Dairy
- Spices
- Oils
- Condiments
- Fruits
- Nuts & Seeds
- Baking
- Seafood
- Meat
- Herbs
- Sweeteners
- Beverages

## Running All Tests in Sequence

```bash
# 1. Create test data
k6 run load-testing/ingredients/bulk-create-ingredients.js

# 2. Test read operations
k6 run load-testing/ingredients/get-ingredients.js
k6 run load-testing/ingredients/get-ingredient-by-id.js
k6 run load-testing/ingredients/search-ingredients.js

# 3. Test update operations
k6 run load-testing/ingredients/update-ingredient.js

# 4. Test delete operations (optional - will delete data)
# k6 run load-testing/ingredients/delete-ingredient.js
```

## Customizing Tests

### Adjust Load

Modify the `options` object in any test file:

```javascript
export const options = {
  iterations: 100,  // Total number of iterations
  // OR use VUs (virtual users) and duration
  // vus: 10,
  // duration: '30s',
};
```

### Change API URL

Update the base URL in each test file:

```javascript
const BASE_URL = 'http://localhost:5000';  // Change this
```

### Modify Test IDs

For tests that use IDs (get-by-id, update, delete), adjust the range:

```javascript
const testIds = Array.from({ length: 100 }, (_, i) => i + 1);  // IDs 1-100
```

## Advanced K6 Options

### Using VUs and Duration

```javascript
export const options = {
  vus: 10,           // 10 virtual users
  duration: '30s',   // Run for 30 seconds
};
```

### Stages (Ramping)

```javascript
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 users
    { duration: '1m', target: 10 },    // Stay at 10 users
    { duration: '30s', target: 0 },    // Ramp down
  ],
};
```

### Thresholds

```javascript
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // Error rate under 1%
  },
};
```

## Troubleshooting

### API Not Running

```
Error: request timeout after 60000ms
```

**Solution**: Ensure the Recipe API is running on `http://localhost:5000`

```bash
cd RecipeApi
dotnet run
```

### Database Connection Issues

```
Status: 500 Internal Server Error
```

**Solution**: Check that PostgreSQL is running and connection string is configured correctly.

### 404 Not Found

```
Status: 404
```

**Solution**:
1. Verify API endpoints are correctly registered
2. Check that the API is running on the correct port
3. Ensure the ingredient route exists in `IngredientsController.cs`

### Test Data Not Found (404 on GET by ID)

```
Ingredient ID 5 - Status: 404
```

**Solution**: Run `bulk-create-ingredients.js` first to populate test data.

## Best Practices

1. **Always use a test database** - Never run load tests against production
2. **Start with low iterations** - Test with small numbers first, then scale up
3. **Monitor your system** - Watch CPU, memory, and database connections during tests
4. **Clean up after tests** - Delete test data when finished
5. **Run creation tests first** - Ensure test data exists before running read/update/delete tests
6. **Check results** - Review K6 output for errors and performance metrics

## Sample K6 Output

```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: create-ingredient.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration
           * default: 50 iterations shared among 1 VUs

     data_received..................: 25 kB  500 B/s
     data_sent......................: 15 kB  300 B/s
     http_req_blocked...............: avg=1.2ms    min=5µs     med=10µs    max=50ms    p(90)=15µs    p(95)=20ms
     http_req_duration..............: avg=45.5ms   min=10ms    med=40ms    max=120ms   p(90)=80ms    p(95)=100ms
     http_reqs......................: 50     1/s
     iteration_duration.............: avg=1.05s    min=1.01s   med=1.04s   max=1.2s    p(90)=1.08s   p(95)=1.1s
     iterations.....................: 50     1/s

running (00m50.5s), 0/1 VUs, 50 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  50 iterations
```

## Related Documentation

- [K6 Documentation](https://k6.io/docs/)
- [Recipe Load Testing README](../recipes/README.md)
- [Data Generators README](../data-generators/README.md)
