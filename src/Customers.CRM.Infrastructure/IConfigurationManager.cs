using System.Collections.Generic;

namespace Customers.CRM.Infrastructure
{
    public interface IConfigurationManager
    {
        string DatabaseConnectionString { get; }

        List<string> Admins { get; }
    }
}
