using RecipeApi.Models;

namespace RecipeApi.Repositories;

public interface IIngredientRepository
{
    Task<IEnumerable<Ingredient>> GetAllAsync();
    Task<Ingredient?> GetByIdAsync(int id);
    Task<Ingredient> CreateAsync(Ingredient ingredient);
    Task<Ingredient> UpdateAsync(Ingredient ingredient);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<Ingredient>> SearchByNameAsync(string name);
}
