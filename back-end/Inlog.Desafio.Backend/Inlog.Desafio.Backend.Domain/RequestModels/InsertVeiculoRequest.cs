using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.Shared;

namespace Inlog.Desafio.Backend.Domain.RequestModels
{
    public class InsertVeiculoRequest : IRequestModel<Veiculo>
    {
        public string Chassi { get; set; }
        public TipoVeiculo TipoVeiculo { get; set; }
        public string Cor { get; set; }
        public byte[]? ImageBytes { get; set; }

        public Veiculo ToModel()
        {
            return new Veiculo { Chassi = Chassi, TipoVeiculo = TipoVeiculo, Cor = Cor, ImageBytes = ImageBytes };
        }
    }
}
