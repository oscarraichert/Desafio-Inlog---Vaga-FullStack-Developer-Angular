using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.RequestModels;
using Inlog.Desafio.Backend.Infra.Database.Repositories;

namespace Inlog.Desafio.Backend.Application
{
    public class VeiculoService
    {
        private VeiculoRepository _repository;

        public VeiculoService(VeiculoRepository repository)
        {
            _repository = repository;
        }

        public async Task AddVeiculo(InsertVeiculoRequest veiculoRequest, string webRoot, string url)
        {
            if (!string.IsNullOrEmpty(veiculoRequest.ImageBase64))
            {
                byte[] imageBytes = Convert.FromBase64String(veiculoRequest.ImageBase64);

                var folder = Path.Combine(webRoot, "images");
                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var fileName = veiculoRequest.Placa + ".png";
                var filePath = Path.Combine(folder, fileName);

                await File.WriteAllBytesAsync(filePath, imageBytes);
            }

            veiculoRequest.ImageUrl = url;

            await _repository.Insert(veiculoRequest.ToModel());
        }

        public async Task<List<Veiculo>> ReadAllVeiculos()
        {
            return await _repository.ReadAll();
        }
    }
}
