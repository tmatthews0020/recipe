using RecipeApi.DTOs;
using RecipeApi.Models;
using RecipeApi.Repositories;

namespace RecipeApi.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return categories.Select(MapToDto);
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        return category == null ? null : MapToDto(category);
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createDto)
    {
        var category = new Category
        {
            Name = createDto.Name,
            Type = createDto.Type
        };

        var created = await _categoryRepository.CreateAsync(category);
        return MapToDto(created);
    }

    public async Task<CategoryDto?> UpdateCategoryAsync(int id, UpdateCategoryDto updateDto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
            return null;

        category.Name = updateDto.Name;
        category.Type = updateDto.Type;

        var updated = await _categoryRepository.UpdateAsync(category);
        return MapToDto(updated);
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        return await _categoryRepository.DeleteAsync(id);
    }

    private static CategoryDto MapToDto(Category category)
    {
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Type = category.Type
        };
    }
}
