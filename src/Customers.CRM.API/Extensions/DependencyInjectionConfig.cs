using Microsoft.Extensions.DependencyInjection;
using Customers.CRM.DataAccess;
using Customers.CRM.DataAccess.Abstraction;
using Customers.CRM.DataAccess.Abstraction.Repositories;
using Customers.CRM.DataAccess.Repositories;
using Customers.CRM.Infrastructure;
using Customers.CRM.Services;
using Customers.CRM.Services.Abstraction;

namespace Customers.CRM.API.Extensions
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection RegisterDependencies(this IServiceCollection services)
        {
            RegisterInfrastructure(services);
            RegisterServices(services);
            RegisterDataAccess(services);

            return services;
        }

        private static void RegisterServices(IServiceCollection services)
        {
            services.AddTransient<ICustomersService, CustomersService>();

        }

        public static void RegisterDataAccess(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWorkFactory, UnitOfWorkFactory>();

            services.AddScoped<ICustomersRepository, CustomersRepository>();
        }
        public static void RegisterInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<IConfigurationManager, ConfigurationManager>();
        }
    }
}
