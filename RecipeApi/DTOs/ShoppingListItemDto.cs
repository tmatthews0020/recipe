namespace RecipeApi.DTOs;

public class ShoppingListItemDto
{
    public int Id { get; set; }
    public int IngredientId { get; set; }
    public string IngredientName { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public bool IsChecked { get; set; }
    public int? MealPlanId { get; set; }
}

public class CreateShoppingListItemDto
{
    public int IngredientId { get; set; }
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public int? MealPlanId { get; set; }
}

public class UpdateShoppingListItemDto
{
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public bool IsChecked { get; set; }
}
