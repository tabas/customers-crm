using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Customers.CRM.Infrastructure
{
    public class ConfigurationManager : IConfigurationManager
    {
        private readonly IConfiguration configuration;

        public ConfigurationManager(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string DatabaseConnectionString => this.GetConnectionStringValue("DatabaseConnectionString");

        public List<string> Admins => this.configuration.GetSection("Admins").Get<string[]>().ToList();

        private string GetConnectionStringValue(string connStringName)
        {
            return this.configuration.GetConnectionString(connStringName);
        }
    }
}
