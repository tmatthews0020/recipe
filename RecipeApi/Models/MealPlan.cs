namespace RecipeApi.Models;

public class MealPlan
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string MealType { get; set; } = string.Empty;
    public int RecipeId { get; set; }
    public int Servings { get; set; }

    public Recipe Recipe { get; set; } = null!;
    public ICollection<ShoppingListItem> ShoppingListItems { get; set; } = new List<ShoppingListItem>();
}
