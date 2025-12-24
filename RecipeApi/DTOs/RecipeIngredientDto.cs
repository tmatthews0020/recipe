namespace RecipeApi.DTOs;

public class RecipeIngredientDto
{
    public int IngredientId { get; set; }
    public string IngredientName { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string? Notes { get; set; }
}

public class CreateRecipeIngredientDto
{
    public int IngredientId { get; set; }
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string? Notes { get; set; }
}
