namespace Inlog.Desafio.Backend.Infra.Database.Shared
{
    internal interface IRepository<T>
    {
        public Task Insert(T model);

        public Task<List<T>> ReadAll();
    }
}
