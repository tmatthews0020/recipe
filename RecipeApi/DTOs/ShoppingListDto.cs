namespace RecipeApi.DTOs;

public class ShoppingListDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public List<ShoppingListItemDto> Items { get; set; } = new();
}

public class CreateShoppingListDto
{
    public string Name { get; set; } = string.Empty;
    public List<CreateShoppingListItemDto> Items { get; set; } = new();
}

public class UpdateShoppingListDto
{
    public string Name { get; set; } = string.Empty;
}
