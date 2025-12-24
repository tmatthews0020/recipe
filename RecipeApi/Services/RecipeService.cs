using RecipeApi.DTOs;
using RecipeApi.Models;
using RecipeApi.Repositories;

namespace RecipeApi.Services;

public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _recipeRepository;

    public RecipeService(IRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    public async Task<IEnumerable<RecipeDto>> GetAllRecipesAsync()
    {
        var recipes = await _recipeRepository.GetAllAsync();
        return recipes.Select(MapToDto);
    }

    public async Task<RecipeDto?> GetRecipeByIdAsync(int id)
    {
        var recipe = await _recipeRepository.GetByIdAsync(id);
        return recipe == null ? null : MapToDto(recipe);
    }

    public async Task<RecipeDto> CreateRecipeAsync(CreateRecipeDto createDto)
    {
        var recipe = new Recipe
        {
            Name = createDto.Name,
            Description = createDto.Description,
            PrepTimeMinutes = createDto.PrepTimeMinutes,
            CookTimeMinutes = createDto.CookTimeMinutes,
            Servings = createDto.Servings,
            Difficulty = createDto.Difficulty,
            ImageUrl = createDto.ImageUrl,
            RecipeIngredients = createDto.Ingredients.Select(i => new RecipeIngredient
            {
                IngredientId = i.IngredientId,
                Quantity = i.Quantity,
                Unit = i.Unit,
                Notes = i.Notes
            }).ToList(),
            Instructions = createDto.Instructions.Select(i => new Instruction
            {
                StepNumber = i.StepNumber,
                Description = i.Description,
                TimeMinutes = i.TimeMinutes
            }).ToList(),
            RecipeCategories = createDto.CategoryIds.Select(id => new RecipeCategory
            {
                CategoryId = id
            }).ToList()
        };

        if (createDto.NutritionalInfo != null)
        {
            recipe.NutritionalInfo = new NutritionalInfo
            {
                Calories = createDto.NutritionalInfo.Calories,
                Protein = createDto.NutritionalInfo.Protein,
                Carbohydrates = createDto.NutritionalInfo.Carbohydrates,
                Fat = createDto.NutritionalInfo.Fat,
                Fiber = createDto.NutritionalInfo.Fiber
            };
        }

        var createdRecipe = await _recipeRepository.CreateAsync(recipe);
        var result = await _recipeRepository.GetByIdAsync(createdRecipe.Id);
        return MapToDto(result!);
    }

    public async Task<RecipeDto?> UpdateRecipeAsync(int id, UpdateRecipeDto updateDto)
    {
        var existingRecipe = await _recipeRepository.GetByIdAsync(id);
        if (existingRecipe == null)
            return null;

        existingRecipe.Name = updateDto.Name;
        existingRecipe.Description = updateDto.Description;
        existingRecipe.PrepTimeMinutes = updateDto.PrepTimeMinutes;
        existingRecipe.CookTimeMinutes = updateDto.CookTimeMinutes;
        existingRecipe.Servings = updateDto.Servings;
        existingRecipe.Difficulty = updateDto.Difficulty;
        existingRecipe.ImageUrl = updateDto.ImageUrl;

        existingRecipe.RecipeIngredients.Clear();
        existingRecipe.RecipeIngredients = updateDto.Ingredients.Select(i => new RecipeIngredient
        {
            RecipeId = id,
            IngredientId = i.IngredientId,
            Quantity = i.Quantity,
            Unit = i.Unit,
            Notes = i.Notes
        }).ToList();

        existingRecipe.Instructions.Clear();
        existingRecipe.Instructions = updateDto.Instructions.Select(i => new Instruction
        {
            RecipeId = id,
            StepNumber = i.StepNumber,
            Description = i.Description,
            TimeMinutes = i.TimeMinutes
        }).ToList();

        existingRecipe.RecipeCategories.Clear();
        existingRecipe.RecipeCategories = updateDto.CategoryIds.Select(cid => new RecipeCategory
        {
            RecipeId = id,
            CategoryId = cid
        }).ToList();

        if (updateDto.NutritionalInfo != null)
        {
            if (existingRecipe.NutritionalInfo == null)
            {
                existingRecipe.NutritionalInfo = new NutritionalInfo { RecipeId = id };
            }
            existingRecipe.NutritionalInfo.Calories = updateDto.NutritionalInfo.Calories;
            existingRecipe.NutritionalInfo.Protein = updateDto.NutritionalInfo.Protein;
            existingRecipe.NutritionalInfo.Carbohydrates = updateDto.NutritionalInfo.Carbohydrates;
            existingRecipe.NutritionalInfo.Fat = updateDto.NutritionalInfo.Fat;
            existingRecipe.NutritionalInfo.Fiber = updateDto.NutritionalInfo.Fiber;
        }

        await _recipeRepository.UpdateAsync(existingRecipe);
        var result = await _recipeRepository.GetByIdAsync(id);
        return MapToDto(result!);
    }

    public async Task<bool> DeleteRecipeAsync(int id)
    {
        return await _recipeRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<RecipeDto>> SearchRecipesByNameAsync(string name)
    {
        var recipes = await _recipeRepository.SearchByNameAsync(name);
        return recipes.Select(MapToDto);
    }

    public async Task<IEnumerable<RecipeDto>> GetRecipesByCategoryAsync(int categoryId)
    {
        var recipes = await _recipeRepository.GetByCategoryAsync(categoryId);
        return recipes.Select(MapToDto);
    }

    private static RecipeDto MapToDto(Recipe recipe)
    {
        return new RecipeDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            Description = recipe.Description,
            PrepTimeMinutes = recipe.PrepTimeMinutes,
            CookTimeMinutes = recipe.CookTimeMinutes,
            Servings = recipe.Servings,
            Difficulty = recipe.Difficulty,
            ImageUrl = recipe.ImageUrl,
            CreatedDate = recipe.CreatedDate,
            UpdatedDate = recipe.UpdatedDate,
            Ingredients = recipe.RecipeIngredients.Select(ri => new RecipeIngredientDto
            {
                IngredientId = ri.IngredientId,
                IngredientName = ri.Ingredient.Name,
                Quantity = ri.Quantity,
                Unit = ri.Unit,
                Notes = ri.Notes
            }).ToList(),
            Instructions = recipe.Instructions.OrderBy(i => i.StepNumber).Select(i => new InstructionDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                TimeMinutes = i.TimeMinutes
            }).ToList(),
            Categories = recipe.RecipeCategories.Select(rc => rc.Category.Name).ToList(),
            NutritionalInfo = recipe.NutritionalInfo == null ? null : new NutritionalInfoDto
            {
                Id = recipe.NutritionalInfo.Id,
                Calories = recipe.NutritionalInfo.Calories,
                Protein = recipe.NutritionalInfo.Protein,
                Carbohydrates = recipe.NutritionalInfo.Carbohydrates,
                Fat = recipe.NutritionalInfo.Fat,
                Fiber = recipe.NutritionalInfo.Fiber
            }
        };
    }
}
