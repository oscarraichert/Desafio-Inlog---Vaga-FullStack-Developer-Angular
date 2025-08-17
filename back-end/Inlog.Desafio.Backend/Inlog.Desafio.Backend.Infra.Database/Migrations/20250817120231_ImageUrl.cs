using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inlog.Desafio.Backend.Infra.Database.Migrations
{
    public partial class ImageUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBytes",
                table: "Veiculos");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Veiculos",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Veiculos");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageBytes",
                table: "Veiculos",
                type: "bytea",
                nullable: true);
        }
    }
}
