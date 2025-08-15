namespace Inlog.Desafio.Backend.Domain.Models;

public class Veiculo
{
    public int Id { get; set; }
    public string Chassi { get; set; }
    public TipoVeiculo TipoVeiculo { get; set; }
    public string Cor { get; set; }
    public string Placa { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public byte[]? ImageBytes { get; set; }
}
