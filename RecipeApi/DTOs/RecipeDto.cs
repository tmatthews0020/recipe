namespace RecipeApi.DTOs;

public class RecipeDto
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
    public List<RecipeIngredientDto> Ingredients { get; set; } = new();
    public List<InstructionDto> Instructions { get; set; } = new();
    public List<string> Categories { get; set; } = new();
    public NutritionalInfoDto? NutritionalInfo { get; set; }
}

public class CreateRecipeDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PrepTimeMinutes { get; set; }
    public int CookTimeMinutes { get; set; }
    public int Servings { get; set; }
    public string Difficulty { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public List<CreateRecipeIngredientDto> Ingredients { get; set; } = new();
    public List<CreateInstructionDto> Instructions { get; set; } = new();
    public List<int> CategoryIds { get; set; } = new();
    public CreateNutritionalInfoDto? NutritionalInfo { get; set; }
}

public class UpdateRecipeDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PrepTimeMinutes { get; set; }
    public int CookTimeMinutes { get; set; }
    public int Servings { get; set; }
    public string Difficulty { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public List<CreateRecipeIngredientDto> Ingredients { get; set; } = new();
    public List<CreateInstructionDto> Instructions { get; set; } = new();
    public List<int> CategoryIds { get; set; } = new();
    public CreateNutritionalInfoDto? NutritionalInfo { get; set; }
}
