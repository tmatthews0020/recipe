using RecipeApi.DTOs;
using RecipeApi.Models;
using RecipeApi.Repositories;

namespace RecipeApi.Services;

public class ShoppingListService : IShoppingListService
{
    private readonly IShoppingListRepository _shoppingListRepository;

    public ShoppingListService(IShoppingListRepository shoppingListRepository)
    {
        _shoppingListRepository = shoppingListRepository;
    }

    public async Task<IEnumerable<ShoppingListDto>> GetAllShoppingListsAsync()
    {
        var shoppingLists = await _shoppingListRepository.GetAllAsync();
        return shoppingLists.Select(MapToDto);
    }

    public async Task<ShoppingListDto?> GetShoppingListByIdAsync(int id)
    {
        var shoppingList = await _shoppingListRepository.GetByIdAsync(id);
        return shoppingList == null ? null : MapToDto(shoppingList);
    }

    public async Task<ShoppingListDto> CreateShoppingListAsync(CreateShoppingListDto createDto)
    {
        var shoppingList = new ShoppingList
        {
            Name = createDto.Name,
            Items = createDto.Items.Select(i => new ShoppingListItem
            {
                IngredientId = i.IngredientId,
                Quantity = i.Quantity,
                Unit = i.Unit,
                MealPlanId = i.MealPlanId
            }).ToList()
        };

        var created = await _shoppingListRepository.CreateAsync(shoppingList);
        var result = await _shoppingListRepository.GetByIdAsync(created.Id);
        return MapToDto(result!);
    }

    public async Task<ShoppingListDto?> UpdateShoppingListAsync(int id, UpdateShoppingListDto updateDto)
    {
        var shoppingList = await _shoppingListRepository.GetByIdAsync(id);
        if (shoppingList == null)
            return null;

        shoppingList.Name = updateDto.Name;

        await _shoppingListRepository.UpdateAsync(shoppingList);
        var result = await _shoppingListRepository.GetByIdAsync(id);
        return MapToDto(result!);
    }

    public async Task<bool> DeleteShoppingListAsync(int id)
    {
        return await _shoppingListRepository.DeleteAsync(id);
    }

    public async Task<ShoppingListItemDto> AddItemToShoppingListAsync(int shoppingListId, CreateShoppingListItemDto createDto)
    {
        var item = new ShoppingListItem
        {
            IngredientId = createDto.IngredientId,
            Quantity = createDto.Quantity,
            Unit = createDto.Unit,
            MealPlanId = createDto.MealPlanId
        };

        var created = await _shoppingListRepository.AddItemAsync(shoppingListId, item);
        var shoppingList = await _shoppingListRepository.GetByIdAsync(shoppingListId);
        var createdItem = shoppingList!.Items.First(i => i.Id == created.Id);
        return MapItemToDto(createdItem);
    }

    public async Task<bool> RemoveItemFromShoppingListAsync(int itemId)
    {
        return await _shoppingListRepository.RemoveItemAsync(itemId);
    }

    public async Task<ShoppingListItemDto?> UpdateShoppingListItemAsync(int itemId, UpdateShoppingListItemDto updateDto)
    {
        var shoppingLists = await _shoppingListRepository.GetAllAsync();
        var item = shoppingLists.SelectMany(sl => sl.Items).FirstOrDefault(i => i.Id == itemId);

        if (item == null)
            return null;

        item.Quantity = updateDto.Quantity;
        item.Unit = updateDto.Unit;
        item.IsChecked = updateDto.IsChecked;

        var updated = await _shoppingListRepository.UpdateItemAsync(item);
        var result = await _shoppingListRepository.GetByIdAsync(item.ShoppingListId);
        var updatedItem = result!.Items.First(i => i.Id == itemId);
        return MapItemToDto(updatedItem);
    }

    private static ShoppingListDto MapToDto(ShoppingList shoppingList)
    {
        return new ShoppingListDto
        {
            Id = shoppingList.Id,
            Name = shoppingList.Name,
            CreatedDate = shoppingList.CreatedDate,
            Items = shoppingList.Items.Select(MapItemToDto).ToList()
        };
    }

    private static ShoppingListItemDto MapItemToDto(ShoppingListItem item)
    {
        return new ShoppingListItemDto
        {
            Id = item.Id,
            IngredientId = item.IngredientId,
            IngredientName = item.Ingredient.Name,
            Quantity = item.Quantity,
            Unit = item.Unit,
            IsChecked = item.IsChecked,
            MealPlanId = item.MealPlanId
        };
    }
}
