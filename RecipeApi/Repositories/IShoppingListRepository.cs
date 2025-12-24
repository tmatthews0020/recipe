using RecipeApi.Models;

namespace RecipeApi.Repositories;

public interface IShoppingListRepository
{
    Task<IEnumerable<ShoppingList>> GetAllAsync();
    Task<ShoppingList?> GetByIdAsync(int id);
    Task<ShoppingList> CreateAsync(ShoppingList shoppingList);
    Task<ShoppingList> UpdateAsync(ShoppingList shoppingList);
    Task<bool> DeleteAsync(int id);
    Task<ShoppingListItem> AddItemAsync(int shoppingListId, ShoppingListItem item);
    Task<bool> RemoveItemAsync(int itemId);
    Task<ShoppingListItem> UpdateItemAsync(ShoppingListItem item);
}
