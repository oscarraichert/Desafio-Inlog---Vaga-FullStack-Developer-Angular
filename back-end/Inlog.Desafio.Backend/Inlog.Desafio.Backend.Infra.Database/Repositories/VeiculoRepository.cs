using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Infra.Database.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Inlog.Desafio.Backend.Infra.Database.Repositories
{
    public class VeiculoRepository : IRepository<Veiculo>
    {
        private AppDbContext Context { get; set; }

        public VeiculoRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task Insert(Veiculo veiculo)
        {
            await Context.Veiculos.AddAsync(veiculo);
            await Context.SaveChangesAsync();
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
