using Microsoft.EntityFrameworkCore;

namespace Customers.CRM.DataAccess.Abstraction.Repositories
{
    public interface IBaseRepository
    {
        void SetContext(DbContext context);
    }
}
