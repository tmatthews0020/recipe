using Microsoft.AspNetCore.Mvc;
using RecipeApi.DTOs;
using RecipeApi.Services;

namespace RecipeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MealPlansController : ControllerBase
{
    private readonly IMealPlanService _mealPlanService;

    public MealPlansController(IMealPlanService mealPlanService)
    {
        _mealPlanService = mealPlanService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MealPlanDto>>> GetMealPlans([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        if (startDate.HasValue && endDate.HasValue)
        {
            var mealPlans = await _mealPlanService.GetMealPlansByDateRangeAsync(startDate.Value, endDate.Value);
            return Ok(mealPlans);
        }

        var allMealPlans = await _mealPlanService.GetAllMealPlansAsync();
        return Ok(allMealPlans);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MealPlanDto>> GetMealPlan(int id)
    {
        var mealPlan = await _mealPlanService.GetMealPlanByIdAsync(id);
        if (mealPlan == null)
            return NotFound();

        return Ok(mealPlan);
    }

    [HttpPost]
    public async Task<ActionResult<MealPlanDto>> CreateMealPlan(CreateMealPlanDto createDto)
    {
        var mealPlan = await _mealPlanService.CreateMealPlanAsync(createDto);
        return CreatedAtAction(nameof(GetMealPlan), new { id = mealPlan.Id }, mealPlan);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MealPlanDto>> UpdateMealPlan(int id, UpdateMealPlanDto updateDto)
    {
        var mealPlan = await _mealPlanService.UpdateMealPlanAsync(id, updateDto);
        if (mealPlan == null)
            return NotFound();

        return Ok(mealPlan);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMealPlan(int id)
    {
        var result = await _mealPlanService.DeleteMealPlanAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
