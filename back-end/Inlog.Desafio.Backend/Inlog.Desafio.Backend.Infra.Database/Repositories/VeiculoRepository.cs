using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Infra.Database.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Inlog.Desafio.Backend.Infra.Database.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        private AppDbContext Context { get; set; }

        public VeiculoRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task<Veiculo> Insert(Veiculo veiculo)
        {
            await Context.Veiculos.AddAsync(veiculo);
            await Context.SaveChangesAsync();

            return veiculo;
        }

        public async Task<List<Veiculo>> ReadAll()
        {
            return await Context.Veiculos.ToListAsync();
        }

        public async Task DeleteById(int id)
        {
            var veiculo = Context.Veiculos.FirstOrDefault(v => v.Id == id);

            if (veiculo != null)
            {
                Context.Veiculos.Remove(veiculo);
                await Context.SaveChangesAsync();
            }
        }
    }
}
