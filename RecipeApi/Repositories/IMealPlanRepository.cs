using RecipeApi.Models;

namespace RecipeApi.Repositories;

public interface IMealPlanRepository
{
    Task<IEnumerable<MealPlan>> GetAllAsync();
    Task<MealPlan?> GetByIdAsync(int id);
    Task<IEnumerable<MealPlan>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
    Task<MealPlan> CreateAsync(MealPlan mealPlan);
    Task<MealPlan> UpdateAsync(MealPlan mealPlan);
    Task<bool> DeleteAsync(int id);
}
