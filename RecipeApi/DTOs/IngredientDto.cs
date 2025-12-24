namespace RecipeApi.DTOs;

public class IngredientDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}

public class CreateIngredientDto
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}

public class UpdateIngredientDto
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}
