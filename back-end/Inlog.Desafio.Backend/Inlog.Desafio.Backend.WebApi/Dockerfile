# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Inlog.Desafio.Backend.WebApi/Inlog.Desafio.Backend.WebApi.csproj", "Inlog.Desafio.Backend.WebApi/"]
COPY ["Inlog.Desafio.Backend.Application/Inlog.Desafio.Backend.Application.csproj", "Inlog.Desafio.Backend.Application/"]
COPY ["Inlog.Desafio.Backend.Domain/Inlog.Desafio.Backend.Domain.csproj", "Inlog.Desafio.Backend.Domain/"]
COPY ["Inlog.Desafio.Backend.Infra.Database/Inlog.Desafio.Backend.Infra.Database.csproj", "Inlog.Desafio.Backend.Infra.Database/"]
RUN dotnet restore "./Inlog.Desafio.Backend.WebApi/Inlog.Desafio.Backend.WebApi.csproj"
COPY . .
WORKDIR "/src/Inlog.Desafio.Backend.WebApi"
RUN dotnet build "./Inlog.Desafio.Backend.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Inlog.Desafio.Backend.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Inlog.Desafio.Backend.WebApi.dll"]