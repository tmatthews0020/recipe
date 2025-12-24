using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;
using RecipeApi.Models;

namespace RecipeApi.Repositories;

public class IngredientRepository : IIngredientRepository
{
    private readonly RecipeDbContext _context;

    public IngredientRepository(RecipeDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Ingredient>> GetAllAsync()
    {
        return await _context.Ingredients.ToListAsync();
    }

    public async Task<Ingredient?> GetByIdAsync(int id)
    {
        return await _context.Ingredients.FindAsync(id);
    }

    public async Task<Ingredient> CreateAsync(Ingredient ingredient)
    {
        _context.Ingredients.Add(ingredient);
        await _context.SaveChangesAsync();
        return ingredient;
    }

    public async Task<Ingredient> UpdateAsync(Ingredient ingredient)
    {
        _context.Ingredients.Update(ingredient);
        await _context.SaveChangesAsync();
        return ingredient;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var ingredient = await _context.Ingredients.FindAsync(id);
        if (ingredient == null)
            return false;

        _context.Ingredients.Remove(ingredient);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Ingredient>> SearchByNameAsync(string name)
    {
        return await _context.Ingredients
            .Where(i => i.Name.Contains(name))
            .ToListAsync();
    }
}
