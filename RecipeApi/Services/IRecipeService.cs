using RecipeApi.DTOs;

namespace RecipeApi.Services;

public interface IRecipeService
{
    Task<IEnumerable<RecipeDto>> GetAllRecipesAsync();
    Task<RecipeDto?> GetRecipeByIdAsync(int id);
    Task<RecipeDto> CreateRecipeAsync(CreateRecipeDto createDto);
    Task<RecipeDto?> UpdateRecipeAsync(int id, UpdateRecipeDto updateDto);
    Task<bool> DeleteRecipeAsync(int id);
    Task<IEnumerable<RecipeDto>> SearchRecipesByNameAsync(string name);
    Task<IEnumerable<RecipeDto>> GetRecipesByCategoryAsync(int categoryId);
}
