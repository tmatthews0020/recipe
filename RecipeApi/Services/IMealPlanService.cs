using RecipeApi.DTOs;

namespace RecipeApi.Services;

public interface IMealPlanService
{
    Task<IEnumerable<MealPlanDto>> GetAllMealPlansAsync();
    Task<MealPlanDto?> GetMealPlanByIdAsync(int id);
    Task<IEnumerable<MealPlanDto>> GetMealPlansByDateRangeAsync(DateTime startDate, DateTime endDate);
    Task<MealPlanDto> CreateMealPlanAsync(CreateMealPlanDto createDto);
    Task<MealPlanDto?> UpdateMealPlanAsync(int id, UpdateMealPlanDto updateDto);
    Task<bool> DeleteMealPlanAsync(int id);
}
