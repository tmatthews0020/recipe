namespace RecipeApi.DTOs;

public class MealPlanDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string MealType { get; set; } = string.Empty;
    public int RecipeId { get; set; }
    public string RecipeName { get; set; } = string.Empty;
    public int Servings { get; set; }
}

public class CreateMealPlanDto
{
    public DateTime Date { get; set; }
    public string MealType { get; set; } = string.Empty;
    public int RecipeId { get; set; }
    public int Servings { get; set; }
}

public class UpdateMealPlanDto
{
    public DateTime Date { get; set; }
    public string MealType { get; set; } = string.Empty;
    public int RecipeId { get; set; }
    public int Servings { get; set; }
}
