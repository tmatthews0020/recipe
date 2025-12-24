namespace RecipeApi.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PrepTimeMinutes { get; set; }
    public int CookTimeMinutes { get; set; }
    public int Servings { get; set; }
    public string Difficulty { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }

    public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
    public ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();
    public ICollection<RecipeCategory> RecipeCategories { get; set; } = new List<RecipeCategory>();
    public ICollection<MealPlan> MealPlans { get; set; } = new List<MealPlan>();
    public NutritionalInfo? NutritionalInfo { get; set; }
}
