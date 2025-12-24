namespace RecipeApi.DTOs;

public class InstructionDto
{
    public int Id { get; set; }
    public int StepNumber { get; set; }
    public string Description { get; set; } = string.Empty;
    public int? TimeMinutes { get; set; }
}

public class CreateInstructionDto
{
    public int StepNumber { get; set; }
    public string Description { get; set; } = string.Empty;
    public int? TimeMinutes { get; set; }
}
