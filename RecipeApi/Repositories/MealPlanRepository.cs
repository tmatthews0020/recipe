using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;
using RecipeApi.Models;

namespace RecipeApi.Repositories;

public class MealPlanRepository : IMealPlanRepository
{
    private readonly RecipeDbContext _context;

    public MealPlanRepository(RecipeDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MealPlan>> GetAllAsync()
    {
        return await _context.MealPlans
            .Include(mp => mp.Recipe)
            .ToListAsync();
    }

    public async Task<MealPlan?> GetByIdAsync(int id)
    {
        return await _context.MealPlans
            .Include(mp => mp.Recipe)
            .FirstOrDefaultAsync(mp => mp.Id == id);
    }

    public async Task<IEnumerable<MealPlan>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.MealPlans
            .Include(mp => mp.Recipe)
            .Where(mp => mp.Date >= startDate && mp.Date <= endDate)
            .OrderBy(mp => mp.Date)
            .ToListAsync();
    }

    public async Task<MealPlan> CreateAsync(MealPlan mealPlan)
    {
        _context.MealPlans.Add(mealPlan);
        await _context.SaveChangesAsync();
        return mealPlan;
    }

    public async Task<MealPlan> UpdateAsync(MealPlan mealPlan)
    {
        _context.MealPlans.Update(mealPlan);
        await _context.SaveChangesAsync();
        return mealPlan;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var mealPlan = await _context.MealPlans.FindAsync(id);
        if (mealPlan == null)
            return false;

        _context.MealPlans.Remove(mealPlan);
        await _context.SaveChangesAsync();
        return true;
    }
}
