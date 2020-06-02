using Customers.CRM.DataAccess.Abstraction;
using Customers.CRM.DataAccess.Abstraction.Repositories;
using Customers.CRM.Domain.DTOs;
using Customers.CRM.Domain.Entities;
using Customers.CRM.Services.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Customers.CRM.Services
{
    public class CustomersService : ICustomersService
    {
        private readonly IUnitOfWorkFactory unitOfWorkFactory;

        public CustomersService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            this.unitOfWorkFactory = unitOfWorkFactory;
        }

        public async Task<List<CustomerDTO>> GetAllCustomersAsync()
        {
            using (IUnitOfWork uow = this.unitOfWorkFactory.CreateUnitOfWork())
            {
                var customerRepository = uow.GetRepository<ICustomersRepository>();

                var customers = await customerRepository.GetAllAsync();

                return customers.Select(c => new CustomerDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    ContactName = c.ContactName,
                    ContactEmail = c.ContactEmail,
                    ContactPhone = c.ContactPhone
                }).ToList();
            }
        }

        public async Task<CustomerDTO> GetCustomerByIdAsync(int id)
        {
            using (IUnitOfWork uow = this.unitOfWorkFactory.CreateUnitOfWork())
            {
                var customerRepository = uow.GetRepository<ICustomersRepository>();

                var customer = await customerRepository.GetByIdAsync(id);

                return new CustomerDTO
                {
                    Id = customer.Id,
                    Name = customer.Name,
                    ContactName = customer.ContactName,
                    ContactEmail = customer.ContactEmail,
                    ContactPhone = customer.ContactPhone
                };
            }
        }

        public async Task<int> CreateCustomerAsync(CreateCustomerDTO createCustomerDTO)
        {
            using (IUnitOfWork uow = this.unitOfWorkFactory.CreateUnitOfWork())
            {
                var customerRepository = uow.GetRepository<ICustomersRepository>();

                var newCustomer = new Customer
                {
                    Name = createCustomerDTO.Name,
                    ContactName = createCustomerDTO.ContactName,
                    ContactEmail = createCustomerDTO.ContactEmail,
                    ContactPhone = createCustomerDTO.ContactPhone
                };

                customerRepository.Add(newCustomer);
                await uow.SaveChangesAsync();

                return newCustomer.Id;
            }
        }

        public async Task UpdateCustomerAsync(int id, CustomerDTO createCustomerDTO)
        {
            using (IUnitOfWork uow = this.unitOfWorkFactory.CreateUnitOfWork())
            {
                var customerRepository = uow.GetRepository<ICustomersRepository>();

                var customer = await customerRepository.GetByIdAsync(id);

                if (customer != null)
                {
                    customer.Name = createCustomerDTO.Name;
                    customer.ContactName = createCustomerDTO.ContactName;
                    customer.ContactEmail = createCustomerDTO.ContactEmail;
                    customer.ContactPhone = createCustomerDTO.ContactPhone;

                    await uow.SaveChangesAsync();
                }
                else
                {
                    throw new ArgumentException($"Customer with id {id} does not exist");
                }
            }
        }

        public async Task DeleteCustomerAsync(int id)
        {
            using (IUnitOfWork uow = this.unitOfWorkFactory.CreateUnitOfWork())
            {
                var customerRepository = uow.GetRepository<ICustomersRepository>();

                var customer = await customerRepository.GetByIdAsync(id);

                if (customer != null)
                {
                    customerRepository.Remove(customer);
                    await uow.SaveChangesAsync();
                }
                else
                {
                    throw new ArgumentException($"Customer with id {id} does not exist");
                }
            }
        }
    }
}
