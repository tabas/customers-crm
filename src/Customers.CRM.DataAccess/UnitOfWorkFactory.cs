using Microsoft.EntityFrameworkCore;
using Customers.CRM.DataAccess.Abstraction;
using Customers.CRM.Infrastructure;
using System;

namespace Customers.CRM.DataAccess
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly IConfigurationManager configurationManager;

        private readonly IServiceProvider serviceProvider;

        public UnitOfWorkFactory(
            IConfigurationManager configurationManager,
            IServiceProvider serviceProvider)
        {
            this.configurationManager = configurationManager;
            this.serviceProvider = serviceProvider;
        }

        public IUnitOfWork CreateUnitOfWork()
        {
            var dbContext = this.CreateDbContext();
            var unitOfWork = new UnitOfWork(dbContext, this.serviceProvider);

            return unitOfWork;
        }

        private DbContext CreateDbContext()
        {
            var dbConnetionString = this.configurationManager.DatabaseConnectionString;
            var dbContextOptions = new DbContextOptionsBuilder<CustomersCRMDbContext>()
                .UseSqlServer(dbConnetionString)
                .Options;
            DbContext dbContext = new CustomersCRMDbContext(dbContextOptions);

            return dbContext;
        }
    }
}
