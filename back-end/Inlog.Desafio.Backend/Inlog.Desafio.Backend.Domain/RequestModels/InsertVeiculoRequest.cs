using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.Shared;
using System.Buffers.Text;

namespace Inlog.Desafio.Backend.Domain.RequestModels
{
    public class InsertVeiculoRequest : IRequestModel<Veiculo>
    {
        public string Chassi { get; set; }
        public TipoVeiculo TipoVeiculo { get; set; }
        public string Cor { get; set; }
        public string Placa { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageBase64 { get; set; }

        public Veiculo ToModel()
        {
            return new Veiculo
            {
                Chassi = Chassi,
                TipoVeiculo = TipoVeiculo,
                Cor = Cor,
                ImageUrl = ImageUrl,
                Latitude = Latitude,
                Longitude = Longitude,
                Placa = Placa
            };
        }
    }
}
