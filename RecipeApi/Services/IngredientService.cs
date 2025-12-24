using RecipeApi.DTOs;
using RecipeApi.Models;
using RecipeApi.Repositories;

namespace RecipeApi.Services;

public class IngredientService : IIngredientService
{
    private readonly IIngredientRepository _ingredientRepository;

    public IngredientService(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }

    public async Task<IEnumerable<IngredientDto>> GetAllIngredientsAsync()
    {
        var ingredients = await _ingredientRepository.GetAllAsync();
        return ingredients.Select(MapToDto);
    }

    public async Task<IngredientDto?> GetIngredientByIdAsync(int id)
    {
        var ingredient = await _ingredientRepository.GetByIdAsync(id);
        return ingredient == null ? null : MapToDto(ingredient);
    }

    public async Task<IngredientDto> CreateIngredientAsync(CreateIngredientDto createDto)
    {
        var ingredient = new Ingredient
        {
            Name = createDto.Name,
            Category = createDto.Category
        };

        var created = await _ingredientRepository.CreateAsync(ingredient);
        return MapToDto(created);
    }

    public async Task<IngredientDto?> UpdateIngredientAsync(int id, UpdateIngredientDto updateDto)
    {
        var ingredient = await _ingredientRepository.GetByIdAsync(id);
        if (ingredient == null)
            return null;

        ingredient.Name = updateDto.Name;
        ingredient.Category = updateDto.Category;

        var updated = await _ingredientRepository.UpdateAsync(ingredient);
        return MapToDto(updated);
    }

    public async Task<bool> DeleteIngredientAsync(int id)
    {
        return await _ingredientRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<IngredientDto>> SearchIngredientsByNameAsync(string name)
    {
        var ingredients = await _ingredientRepository.SearchByNameAsync(name);
        return ingredients.Select(MapToDto);
    }

    private static IngredientDto MapToDto(Ingredient ingredient)
    {
        return new IngredientDto
        {
            Id = ingredient.Id,
            Name = ingredient.Name,
            Category = ingredient.Category
        };
    }
}
