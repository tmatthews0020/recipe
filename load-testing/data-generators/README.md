# Recipe Data Generators

Fake data generators for recipe API load testing with k6.

## Installation

This is a local module for k6 load testing. Import directly from the module:

```javascript
import { generateRecipe, generateSearchParams } from './data-generators/index.js';
```

## Usage

### Generate a Single Recipe

```javascript
import { generateRecipe } from './data-generators/index.js';

const recipe = generateRecipe();
// Override specific fields
const customRecipe = generateRecipe({ name: 'My Recipe', servings: 4 });
```

### Generate Multiple Recipes

```javascript
import { generateRecipes } from './data-generators/index.js';

const recipes = generateRecipes(100);
```

### Generate Search Parameters

```javascript
import { generateSearchParams } from './data-generators/index.js';

const searchParams = generateSearchParams();
// { cuisine: 'Italian', difficulty: 'Easy', maxPrepTime: 30, minRating: 4.2 }
```

### Generate Pre-loaded Dataset

For high-performance load testing, generate data once at initialization:

```javascript
import { generateTestDataset } from './data-generators/index.js';

const dataset = generateTestDataset(1000);
// {
//   recipes: [...],
//   searchQueries: [...],
//   updates: [...]
// }
```

### Use Custom Faker

```javascript
import { RecipeFaker } from './data-generators/index.js';

const faker = new RecipeFaker(12345); // seeded for reproducibility
const recipe = faker.recipe();
const dishName = faker.dishName();
const ingredient = faker.ingredient();
```

## Modules

- **faker-utils.js** - Base faker with random number generation
- **recipe-generator.js** - Recipe-specific data generation
- **search-generator.js** - Search parameter generation
- **dataset-generator.js** - High-level dataset generation functions
- **index.js** - Main entry point with all exports

## Examples

See the `recipes/` directory for example k6 test scripts:
- `create-recipe.js` - POST requests with random recipes
- `search-recipes.js` - GET requests with random search params
- `bulk-create-recipes.js` - High-performance testing with pre-generated data
