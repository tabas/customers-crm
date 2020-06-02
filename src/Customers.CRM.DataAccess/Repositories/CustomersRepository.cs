using Customers.CRM.DataAccess.Abstraction.Repositories;
using Customers.CRM.Domain.Entities;

namespace Customers.CRM.DataAccess.Repositories
{
    public class CustomersRepository : EntityFrameworkRepository<Customer, int>, ICustomersRepository
    {
    }
}
