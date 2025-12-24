using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;
using RecipeApi.Models;

namespace RecipeApi.Repositories;

public class RecipeRepository : IRecipeRepository
{
    private readonly RecipeDbContext _context;

    public RecipeRepository(RecipeDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Recipe>> GetAllAsync()
    {
        return await _context.Recipes
            .Include(r => r.RecipeIngredients)
                .ThenInclude(ri => ri.Ingredient)
            .Include(r => r.Instructions)
            .Include(r => r.RecipeCategories)
                .ThenInclude(rc => rc.Category)
            .Include(r => r.NutritionalInfo)
            .ToListAsync();
    }

    public async Task<Recipe?> GetByIdAsync(int id)
    {
        return await _context.Recipes
            .Include(r => r.RecipeIngredients)
                .ThenInclude(ri => ri.Ingredient)
            .Include(r => r.Instructions)
            .Include(r => r.RecipeCategories)
                .ThenInclude(rc => rc.Category)
            .Include(r => r.NutritionalInfo)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<Recipe> CreateAsync(Recipe recipe)
    {
        recipe.CreatedDate = DateTime.UtcNow;
        recipe.UpdatedDate = DateTime.UtcNow;
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task<Recipe> UpdateAsync(Recipe recipe)
    {
        recipe.UpdatedDate = DateTime.UtcNow;
        _context.Recipes.Update(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe == null)
            return false;

        _context.Recipes.Remove(recipe);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Recipe>> SearchByNameAsync(string name)
    {
        return await _context.Recipes
            .Include(r => r.RecipeIngredients)
                .ThenInclude(ri => ri.Ingredient)
            .Include(r => r.Instructions)
            .Include(r => r.RecipeCategories)
                .ThenInclude(rc => rc.Category)
            .Include(r => r.NutritionalInfo)
            .Where(r => r.Name.Contains(name))
            .ToListAsync();
    }

    public async Task<IEnumerable<Recipe>> GetByCategoryAsync(int categoryId)
    {
        return await _context.Recipes
            .Include(r => r.RecipeIngredients)
                .ThenInclude(ri => ri.Ingredient)
            .Include(r => r.Instructions)
            .Include(r => r.RecipeCategories)
                .ThenInclude(rc => rc.Category)
            .Include(r => r.NutritionalInfo)
            .Where(r => r.RecipeCategories.Any(rc => rc.CategoryId == categoryId))
            .ToListAsync();
    }
}
