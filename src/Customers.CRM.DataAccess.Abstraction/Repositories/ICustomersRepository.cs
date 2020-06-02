using Customers.CRM.Domain.Entities;

namespace Customers.CRM.DataAccess.Abstraction.Repositories
{
    public interface ICustomersRepository : IRepository<Customer, int>
    {
    }
}
