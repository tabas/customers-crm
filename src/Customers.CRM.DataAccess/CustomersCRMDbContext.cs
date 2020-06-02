using Microsoft.EntityFrameworkCore;
using Customers.CRM.DataAccess.Mapping;

namespace Customers.CRM.DataAccess
{
    public class CustomersCRMDbContext : DbContext
    {
        public CustomersCRMDbContext(DbContextOptions<CustomersCRMDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new CustomerMap());
        }
    }
}
