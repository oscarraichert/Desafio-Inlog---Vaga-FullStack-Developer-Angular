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

        public async Task AddVeiculo(InsertVeiculoRequest veiculoRequest)
        {
            await _repository.Insert(veiculoRequest.ToModel());
        }

        public async Task<List<Veiculo>> ReadAllVeiculos()
        {
            return await _repository.ReadAll();
        }
    }
}
