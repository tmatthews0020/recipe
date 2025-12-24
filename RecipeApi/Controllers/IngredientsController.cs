using Microsoft.AspNetCore.Mvc;
using RecipeApi.DTOs;
using RecipeApi.Services;

namespace RecipeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private readonly IIngredientService _ingredientService;

    public IngredientsController(IIngredientService ingredientService)
    {
        _ingredientService = ingredientService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<IngredientDto>>> GetIngredients([FromQuery] string? search)
    {
        if (!string.IsNullOrEmpty(search))
        {
            var ingredients = await _ingredientService.SearchIngredientsByNameAsync(search);
            return Ok(ingredients);
        }

        var allIngredients = await _ingredientService.GetAllIngredientsAsync();
        return Ok(allIngredients);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IngredientDto>> GetIngredient(int id)
    {
        var ingredient = await _ingredientService.GetIngredientByIdAsync(id);
        if (ingredient == null)
            return NotFound();

        return Ok(ingredient);
    }

    [HttpPost]
    public async Task<ActionResult<IngredientDto>> CreateIngredient(CreateIngredientDto createDto)
    {
        var ingredient = await _ingredientService.CreateIngredientAsync(createDto);
        return CreatedAtAction(nameof(GetIngredient), new { id = ingredient.Id }, ingredient);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<IngredientDto>> UpdateIngredient(int id, UpdateIngredientDto updateDto)
    {
        var ingredient = await _ingredientService.UpdateIngredientAsync(id, updateDto);
        if (ingredient == null)
            return NotFound();

        return Ok(ingredient);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIngredient(int id)
    {
        var result = await _ingredientService.DeleteIngredientAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
