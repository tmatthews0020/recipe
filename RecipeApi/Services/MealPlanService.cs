using RecipeApi.DTOs;
using RecipeApi.Models;
using RecipeApi.Repositories;

namespace RecipeApi.Services;

public class MealPlanService : IMealPlanService
{
    private readonly IMealPlanRepository _mealPlanRepository;

    public MealPlanService(IMealPlanRepository mealPlanRepository)
    {
        _mealPlanRepository = mealPlanRepository;
    }

    public async Task<IEnumerable<MealPlanDto>> GetAllMealPlansAsync()
    {
        var mealPlans = await _mealPlanRepository.GetAllAsync();
        return mealPlans.Select(MapToDto);
    }

    public async Task<MealPlanDto?> GetMealPlanByIdAsync(int id)
    {
        var mealPlan = await _mealPlanRepository.GetByIdAsync(id);
        return mealPlan == null ? null : MapToDto(mealPlan);
    }

    public async Task<IEnumerable<MealPlanDto>> GetMealPlansByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        var mealPlans = await _mealPlanRepository.GetByDateRangeAsync(startDate, endDate);
        return mealPlans.Select(MapToDto);
    }

    public async Task<MealPlanDto> CreateMealPlanAsync(CreateMealPlanDto createDto)
    {
        var mealPlan = new MealPlan
        {
            Date = createDto.Date,
            MealType = createDto.MealType,
            RecipeId = createDto.RecipeId,
            Servings = createDto.Servings
        };

        var created = await _mealPlanRepository.CreateAsync(mealPlan);
        var result = await _mealPlanRepository.GetByIdAsync(created.Id);
        return MapToDto(result!);
    }

    public async Task<MealPlanDto?> UpdateMealPlanAsync(int id, UpdateMealPlanDto updateDto)
    {
        var mealPlan = await _mealPlanRepository.GetByIdAsync(id);
        if (mealPlan == null)
            return null;

        mealPlan.Date = updateDto.Date;
        mealPlan.MealType = updateDto.MealType;
        mealPlan.RecipeId = updateDto.RecipeId;
        mealPlan.Servings = updateDto.Servings;

        await _mealPlanRepository.UpdateAsync(mealPlan);
        var result = await _mealPlanRepository.GetByIdAsync(id);
        return MapToDto(result!);
    }

    public async Task<bool> DeleteMealPlanAsync(int id)
    {
        return await _mealPlanRepository.DeleteAsync(id);
    }

    private static MealPlanDto MapToDto(MealPlan mealPlan)
    {
        return new MealPlanDto
        {
            Id = mealPlan.Id,
            Date = mealPlan.Date,
            MealType = mealPlan.MealType,
            RecipeId = mealPlan.RecipeId,
            RecipeName = mealPlan.Recipe.Name,
            Servings = mealPlan.Servings
        };
    }
}
