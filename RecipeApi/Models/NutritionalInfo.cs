namespace RecipeApi.Models;

public class NutritionalInfo
{
    public int Id { get; set; }
    public int RecipeId { get; set; }
    public int Calories { get; set; }
    public decimal Protein { get; set; }
    public decimal Carbohydrates { get; set; }
    public decimal Fat { get; set; }
    public decimal Fiber { get; set; }

    public Recipe Recipe { get; set; } = null!;
}
