using Microsoft.AspNetCore.Mvc;
using RecipeApi.DTOs;
using RecipeApi.Services;

namespace RecipeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    public RecipesController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecipeDto>>> GetRecipes([FromQuery] string? search, [FromQuery] int? categoryId)
    {
        if (!string.IsNullOrEmpty(search))
        {
            var recipes = await _recipeService.SearchRecipesByNameAsync(search);
            return Ok(recipes);
        }

        if (categoryId.HasValue)
        {
            var recipes = await _recipeService.GetRecipesByCategoryAsync(categoryId.Value);
            return Ok(recipes);
        }

        var allRecipes = await _recipeService.GetAllRecipesAsync();
        return Ok(allRecipes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
    {
        var recipe = await _recipeService.GetRecipeByIdAsync(id);
        if (recipe == null)
            return NotFound();

        return Ok(recipe);
    }

    [HttpPost]
    public async Task<ActionResult<RecipeDto>> CreateRecipe(CreateRecipeDto createDto)
    {
        var recipe = await _recipeService.CreateRecipeAsync(createDto);
        return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<RecipeDto>> UpdateRecipe(int id, UpdateRecipeDto updateDto)
    {
        var recipe = await _recipeService.UpdateRecipeAsync(id, updateDto);
        if (recipe == null)
            return NotFound();

        return Ok(recipe);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var result = await _recipeService.DeleteRecipeAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
