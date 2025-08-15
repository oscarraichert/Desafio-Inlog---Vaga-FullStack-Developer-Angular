using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inlog.Desafio.Backend.Infra.Database.Migrations
{
    public partial class AddingPlacaAndCoordinates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Veiculos",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Veiculos",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Placa",
                table: "Veiculos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Veiculos_Placa",
                table: "Veiculos",
                column: "Placa",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Veiculos_Placa",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "Placa",
                table: "Veiculos");
        }
    }
}
