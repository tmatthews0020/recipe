# Recipe Management System

A full-stack recipe management application with an ASP.NET Core Web API backend and a modern React frontend. Manage recipes, ingredients, meal plans, and shopping lists with ease.

## Features

- **Recipe Management**: Create, read, update, and delete recipes with ingredients, instructions, and nutritional information
- **Ingredient Management**: Manage ingredients with categorization
- **Category Management**: Organize recipes by categories
- **Meal Planning**: Plan meals by date and meal type
- **Shopping Lists**: Create and manage shopping lists with items linked to ingredients and meal plans
- **Search**: Search recipes by name and filter by category
- **RESTful API**: Clean and intuitive API endpoints
- **Swagger/OpenAPI**: Interactive API documentation

## Technology Stack

### Backend
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core 10
- PostgreSQL
- AutoMapper
- Swagger/OpenAPI

### Frontend
- React 18
- React Router 6
- Vite
- Modern CSS

## Project Structure

```
recipe/
├── RecipeApi/           # ASP.NET Core Web API
│   ├── Controllers/     # API Controllers
│   ├── DTOs/            # Data Transfer Objects
│   ├── Models/          # Entity Models
│   ├── Data/            # DbContext
│   ├── Repositories/    # Data Access Layer
│   ├── Services/        # Business Logic Layer
│   ├── Program.cs       # Application Entry Point
│   └── appsettings.json # Configuration
│
└── recipe-ui/           # React Frontend Application
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── pages/       # Page components
    │   ├── services/    # API service layer
    │   └── types/       # Type definitions
    ├── package.json
    └── vite.config.js
```

## Getting Started

### Prerequisites

- .NET 10 SDK
- Node.js 18+ (for frontend)
- PostgreSQL (version 12 or higher)
- Visual Studio 2022 or Visual Studio Code (optional)

### Installation

1. **Clone the repository**
   ```bash
   cd /home/tmatthews/dev/recipe
   ```

2. **Update Connection String**

   Edit `RecipeApi/appsettings.json` and update the connection string to match your PostgreSQL instance:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=RecipeDb;Username=postgres;Password=postgres"
   }
   ```

3. **Restore Packages**
   ```bash
   cd RecipeApi
   dotnet restore
   ```

4. **Create Database**

   Run Entity Framework migrations to create the database:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. **Run the API**
   ```bash
   dotnet run
   ```

6. **Set up the React UI**

   In a new terminal window:
   ```bash
   cd recipe-ui
   npm install
   npm run dev
   ```

7. **Access the Application**

   - React UI: `http://localhost:5173`
   - Swagger API Documentation: `https://localhost:5001/swagger`

## API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes (supports `?search=` and `?categoryId=` query params)
- `GET /api/recipes/{id}` - Get recipe by ID
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/{id}` - Update a recipe
- `DELETE /api/recipes/{id}` - Delete a recipe

### Ingredients
- `GET /api/ingredients` - Get all ingredients (supports `?search=` query param)
- `GET /api/ingredients/{id}` - Get ingredient by ID
- `POST /api/ingredients` - Create a new ingredient
- `PUT /api/ingredients/{id}` - Update an ingredient
- `DELETE /api/ingredients/{id}` - Delete an ingredient

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/{id}` - Update a category
- `DELETE /api/categories/{id}` - Delete a category

### Meal Plans
- `GET /api/mealplans` - Get all meal plans (supports `?startDate=` and `?endDate=` query params)
- `GET /api/mealplans/{id}` - Get meal plan by ID
- `POST /api/mealplans` - Create a new meal plan
- `PUT /api/mealplans/{id}` - Update a meal plan
- `DELETE /api/mealplans/{id}` - Delete a meal plan

### Shopping Lists
- `GET /api/shoppinglists` - Get all shopping lists
- `GET /api/shoppinglists/{id}` - Get shopping list by ID
- `POST /api/shoppinglists` - Create a new shopping list
- `PUT /api/shoppinglists/{id}` - Update a shopping list
- `DELETE /api/shoppinglists/{id}` - Delete a shopping list
- `POST /api/shoppinglists/{id}/items` - Add item to shopping list
- `PUT /api/shoppinglists/items/{itemId}` - Update shopping list item
- `DELETE /api/shoppinglists/items/{itemId}` - Remove item from shopping list

## Example Usage

### Create a Recipe

```json
POST /api/recipes
{
  "name": "Spaghetti Carbonara",
  "description": "Classic Italian pasta dish",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 20,
  "servings": 4,
  "difficulty": "Medium",
  "imageUrl": "https://example.com/image.jpg",
  "ingredients": [
    {
      "ingredientId": 1,
      "quantity": 400,
      "unit": "g",
      "notes": "dried spaghetti"
    }
  ],
  "instructions": [
    {
      "stepNumber": 1,
      "description": "Bring a large pot of salted water to boil",
      "timeMinutes": 5
    }
  ],
  "categoryIds": [1, 2],
  "nutritionalInfo": {
    "calories": 450,
    "protein": 18.5,
    "carbohydrates": 55.0,
    "fat": 15.0,
    "fiber": 3.5
  }
}
```

## Database Schema

The database schema is based on the mermaid class diagram in `/diagrams/recipe-relationships.mermaid` and includes the following entities:

- **Recipe**: Main recipe entity with metadata
- **Ingredient**: Ingredient master list
- **RecipeIngredient**: Junction table linking recipes to ingredients with quantities
- **Instruction**: Step-by-step cooking instructions
- **Category**: Recipe categories (cuisine, meal type, etc.)
- **RecipeCategory**: Junction table for recipe-category many-to-many relationship
- **MealPlan**: Planned meals by date and meal type
- **ShoppingList**: Shopping list header
- **ShoppingListItem**: Individual items in shopping lists
- **NutritionalInfo**: Nutritional information for recipes

## Development

### Adding Migrations

After making changes to entity models:

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Running Tests

```bash
dotnet test
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
