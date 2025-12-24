using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;
using RecipeApi.Models;

namespace RecipeApi.Repositories;

public class ShoppingListRepository : IShoppingListRepository
{
    private readonly RecipeDbContext _context;

    public ShoppingListRepository(RecipeDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ShoppingList>> GetAllAsync()
    {
        return await _context.ShoppingLists
            .Include(sl => sl.Items)
                .ThenInclude(sli => sli.Ingredient)
            .ToListAsync();
    }

    public async Task<ShoppingList?> GetByIdAsync(int id)
    {
        return await _context.ShoppingLists
            .Include(sl => sl.Items)
                .ThenInclude(sli => sli.Ingredient)
            .FirstOrDefaultAsync(sl => sl.Id == id);
    }

    public async Task<ShoppingList> CreateAsync(ShoppingList shoppingList)
    {
        shoppingList.CreatedDate = DateTime.UtcNow;
        _context.ShoppingLists.Add(shoppingList);
        await _context.SaveChangesAsync();
        return shoppingList;
    }

    public async Task<ShoppingList> UpdateAsync(ShoppingList shoppingList)
    {
        _context.ShoppingLists.Update(shoppingList);
        await _context.SaveChangesAsync();
        return shoppingList;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var shoppingList = await _context.ShoppingLists.FindAsync(id);
        if (shoppingList == null)
            return false;

        _context.ShoppingLists.Remove(shoppingList);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<ShoppingListItem> AddItemAsync(int shoppingListId, ShoppingListItem item)
    {
        item.ShoppingListId = shoppingListId;
        _context.ShoppingListItems.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<bool> RemoveItemAsync(int itemId)
    {
        var item = await _context.ShoppingListItems.FindAsync(itemId);
        if (item == null)
            return false;

        _context.ShoppingListItems.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<ShoppingListItem> UpdateItemAsync(ShoppingListItem item)
    {
        _context.ShoppingListItems.Update(item);
        await _context.SaveChangesAsync();
        return item;
    }
}
