using Xunit;
using Moq;
using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Infra.Database.Repositories;
using Inlog.Desafio.Backend.Application;
using Inlog.Desafio.Backend.Domain.RequestModels;
using Microsoft.Extensions.Configuration;
using Inlog.Desafio.Backend.Infra.Database.Shared;

namespace Inlog.Desafio.Backend.Tests;
public class VeiculoServiceTests
{
    [Fact]
    public async Task AddVeiculo_ShouldAddVeiculoSuccessfully()
    {
        var veiculo = new InsertVeiculoRequest
        {
            Chassi = "123456789ABCDEFG",
            TipoVeiculo = TipoVeiculo.Caminhao,
            Cor = "Azul",
            Placa = "ABC1234",
            Latitude = -25.427,
            Longitude = -49.260,
            ImageUrl = null
        };

        var mockRepository = new Mock<IVeiculoRepository>();
        var mockConfig = new Mock<IConfiguration>();
        var mockS3Service = new Mock<S3Service>();

        mockRepository.Setup(r => r.Insert(It.IsAny<Veiculo>()))
                      .ReturnsAsync((Veiculo v) =>
                      {
                          v.Id = 1;
                          return v;
                      });

        var service = new VeiculoService(mockRepository.Object, mockS3Service.Object, mockConfig.Object);

        var result = await service.AddVeiculo(veiculo);

        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("ABC1234", result.Placa);
        Assert.Equal(TipoVeiculo.Caminhao, result.TipoVeiculo);
        mockRepository.Verify(r => r.Insert(It.IsAny<Veiculo>()), Times.Once);
    }
}
