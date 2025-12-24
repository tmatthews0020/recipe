using Microsoft.AspNetCore.Mvc;
using RecipeApi.DTOs;
using RecipeApi.Services;

namespace RecipeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShoppingListsController : ControllerBase
{
    private readonly IShoppingListService _shoppingListService;

    public ShoppingListsController(IShoppingListService shoppingListService)
    {
        _shoppingListService = shoppingListService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShoppingListDto>>> GetShoppingLists()
    {
        var shoppingLists = await _shoppingListService.GetAllShoppingListsAsync();
        return Ok(shoppingLists);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ShoppingListDto>> GetShoppingList(int id)
    {
        var shoppingList = await _shoppingListService.GetShoppingListByIdAsync(id);
        if (shoppingList == null)
            return NotFound();

        return Ok(shoppingList);
    }

    [HttpPost]
    public async Task<ActionResult<ShoppingListDto>> CreateShoppingList(CreateShoppingListDto createDto)
    {
        var shoppingList = await _shoppingListService.CreateShoppingListAsync(createDto);
        return CreatedAtAction(nameof(GetShoppingList), new { id = shoppingList.Id }, shoppingList);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ShoppingListDto>> UpdateShoppingList(int id, UpdateShoppingListDto updateDto)
    {
        var shoppingList = await _shoppingListService.UpdateShoppingListAsync(id, updateDto);
        if (shoppingList == null)
            return NotFound();

        return Ok(shoppingList);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShoppingList(int id)
    {
        var result = await _shoppingListService.DeleteShoppingListAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }

    [HttpPost("{id}/items")]
    public async Task<ActionResult<ShoppingListItemDto>> AddItemToShoppingList(int id, CreateShoppingListItemDto createDto)
    {
        var item = await _shoppingListService.AddItemToShoppingListAsync(id, createDto);
        return Ok(item);
    }

    [HttpPut("items/{itemId}")]
    public async Task<ActionResult<ShoppingListItemDto>> UpdateShoppingListItem(int itemId, UpdateShoppingListItemDto updateDto)
    {
        var item = await _shoppingListService.UpdateShoppingListItemAsync(itemId, updateDto);
        if (item == null)
            return NotFound();

        return Ok(item);
    }

    [HttpDelete("items/{itemId}")]
    public async Task<IActionResult> RemoveItemFromShoppingList(int itemId)
    {
        var result = await _shoppingListService.RemoveItemFromShoppingListAsync(itemId);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
