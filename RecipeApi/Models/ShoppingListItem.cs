namespace RecipeApi.Models;

public class ShoppingListItem
{
    public int Id { get; set; }
    public int ShoppingListId { get; set; }
    public int IngredientId { get; set; }
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public bool IsChecked { get; set; }
    public int? MealPlanId { get; set; }

    public ShoppingList ShoppingList { get; set; } = null!;
    public Ingredient Ingredient { get; set; } = null!;
    public MealPlan? MealPlan { get; set; }
}
