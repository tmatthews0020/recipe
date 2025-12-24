using RecipeApi.Models;

namespace RecipeApi.Repositories;

public interface IRecipeRepository
{
    Task<IEnumerable<Recipe>> GetAllAsync();
    Task<Recipe?> GetByIdAsync(int id);
    Task<Recipe> CreateAsync(Recipe recipe);
    Task<Recipe> UpdateAsync(Recipe recipe);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<Recipe>> SearchByNameAsync(string name);
    Task<IEnumerable<Recipe>> GetByCategoryAsync(int categoryId);
}
