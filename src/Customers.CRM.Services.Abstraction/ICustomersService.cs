using Customers.CRM.Domain.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Customers.CRM.Services.Abstraction
{
    public interface ICustomersService
    {
        Task<List<CustomerDTO>> GetAllCustomersAsync();

        Task<CustomerDTO> GetCustomerByIdAsync(int id);

        Task<int> CreateCustomerAsync(CreateCustomerDTO createCustomerDTO);

        Task UpdateCustomerAsync(int id, CustomerDTO createCustomerDTO);

        Task DeleteCustomerAsync(int id);
    }
}
