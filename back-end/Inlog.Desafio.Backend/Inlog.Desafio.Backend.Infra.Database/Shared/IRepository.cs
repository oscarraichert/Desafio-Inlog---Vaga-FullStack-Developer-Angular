namespace Inlog.Desafio.Backend.Infra.Database.Shared
{
    public interface IRepository<T>
    {
        public Task<T> Insert(T model);

        public Task<List<T>> ReadAll();

        public Task DeleteById(int id);
    }
}
