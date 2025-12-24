using RecipeApi.DTOs;

namespace RecipeApi.Services;

public interface IShoppingListService
{
    Task<IEnumerable<ShoppingListDto>> GetAllShoppingListsAsync();
    Task<ShoppingListDto?> GetShoppingListByIdAsync(int id);
    Task<ShoppingListDto> CreateShoppingListAsync(CreateShoppingListDto createDto);
    Task<ShoppingListDto?> UpdateShoppingListAsync(int id, UpdateShoppingListDto updateDto);
    Task<bool> DeleteShoppingListAsync(int id);
    Task<ShoppingListItemDto> AddItemToShoppingListAsync(int shoppingListId, CreateShoppingListItemDto createDto);
    Task<bool> RemoveItemFromShoppingListAsync(int itemId);
    Task<ShoppingListItemDto?> UpdateShoppingListItemAsync(int itemId, UpdateShoppingListItemDto updateDto);
}
