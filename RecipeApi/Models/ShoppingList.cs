namespace RecipeApi.Models;

public class ShoppingList
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }

    public ICollection<ShoppingListItem> Items { get; set; } = new List<ShoppingListItem>();
}
