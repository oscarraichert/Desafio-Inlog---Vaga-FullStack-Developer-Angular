using Inlog.Desafio.Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Inlog.Desafio.Backend.Infra.Database.Configurations
{
    public class VeiculoEntityConfiguration : IEntityTypeConfiguration<Veiculo>
    {
        public void Configure(EntityTypeBuilder<Veiculo> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Chassi).IsUnique();
            builder.Property(x => x.TipoVeiculo).IsRequired();
            builder.Property(x => x.Cor).IsRequired();
            builder.Property(x => x.ImageBytes).HasColumnType("bytea").IsRequired(false);
            builder.HasIndex(x => x.Placa).IsUnique();
            builder.Property(x => x.Latitude).IsRequired();
            builder.Property(x => x.Longitude).IsRequired();
        }
    }
}
