using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;

namespace RecipeApi.Data;

public class RecipeDbContext : DbContext
{
    public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options)
    {
    }

    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Instruction> Instructions { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<RecipeCategory> RecipeCategories { get; set; }
    public DbSet<MealPlan> MealPlans { get; set; }
    public DbSet<ShoppingList> ShoppingLists { get; set; }
    public DbSet<ShoppingListItem> ShoppingListItems { get; set; }
    public DbSet<NutritionalInfo> NutritionalInfos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Recipe configuration
        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.Difficulty).HasMaxLength(50);
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // Ingredient configuration
        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Category).HasMaxLength(100);
        });

        // RecipeIngredient configuration
        modelBuilder.Entity<RecipeIngredient>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Quantity).HasPrecision(10, 2);
            entity.Property(e => e.Unit).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Notes).HasMaxLength(500);

            entity.HasOne(e => e.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(e => e.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Ingredient)
                .WithMany(i => i.RecipeIngredients)
                .HasForeignKey(e => e.IngredientId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Instruction configuration
        modelBuilder.Entity<Instruction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);

            entity.HasOne(e => e.Recipe)
                .WithMany(r => r.Instructions)
                .HasForeignKey(e => e.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Category configuration
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Type).HasMaxLength(50);
        });

        // RecipeCategory configuration (many-to-many)
        modelBuilder.Entity<RecipeCategory>(entity =>
        {
            entity.HasKey(e => new { e.RecipeId, e.CategoryId });

            entity.HasOne(e => e.Recipe)
                .WithMany(r => r.RecipeCategories)
                .HasForeignKey(e => e.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Category)
                .WithMany(c => c.RecipeCategories)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // MealPlan configuration
        modelBuilder.Entity<MealPlan>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.MealType).IsRequired().HasMaxLength(50);

            entity.HasOne(e => e.Recipe)
                .WithMany(r => r.MealPlans)
                .HasForeignKey(e => e.RecipeId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ShoppingList configuration
        modelBuilder.Entity<ShoppingList>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // ShoppingListItem configuration
        modelBuilder.Entity<ShoppingListItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Quantity).HasPrecision(10, 2);
            entity.Property(e => e.Unit).IsRequired().HasMaxLength(50);

            entity.HasOne(e => e.ShoppingList)
                .WithMany(sl => sl.Items)
                .HasForeignKey(e => e.ShoppingListId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Ingredient)
                .WithMany()
                .HasForeignKey(e => e.IngredientId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.MealPlan)
                .WithMany(mp => mp.ShoppingListItems)
                .HasForeignKey(e => e.MealPlanId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // NutritionalInfo configuration
        modelBuilder.Entity<NutritionalInfo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Protein).HasPrecision(10, 2);
            entity.Property(e => e.Carbohydrates).HasPrecision(10, 2);
            entity.Property(e => e.Fat).HasPrecision(10, 2);
            entity.Property(e => e.Fiber).HasPrecision(10, 2);

            entity.HasOne(e => e.Recipe)
                .WithOne(r => r.NutritionalInfo)
                .HasForeignKey<NutritionalInfo>(e => e.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
