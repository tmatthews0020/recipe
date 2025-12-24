# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY RecipeApi/RecipeApi.csproj RecipeApi/
RUN dotnet restore RecipeApi/RecipeApi.csproj

# Copy everything else and build
COPY RecipeApi/ RecipeApi/
WORKDIR /src/RecipeApi
RUN dotnet build RecipeApi.csproj -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish RecipeApi.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "RecipeApi.dll"]
