using RecipeApi.DTOs;

namespace RecipeApi.Services;

public interface IIngredientService
{
    Task<IEnumerable<IngredientDto>> GetAllIngredientsAsync();
    Task<IngredientDto?> GetIngredientByIdAsync(int id);
    Task<IngredientDto> CreateIngredientAsync(CreateIngredientDto createDto);
    Task<IngredientDto?> UpdateIngredientAsync(int id, UpdateIngredientDto updateDto);
    Task<bool> DeleteIngredientAsync(int id);
    Task<IEnumerable<IngredientDto>> SearchIngredientsByNameAsync(string name);
}
