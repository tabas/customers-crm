using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Customers.CRM.Domain.DTOs;
using Customers.CRM.Services.Abstraction;
using System.Collections.Generic;

namespace Customers.CRM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomersService customersService;

        public CustomersController(ICustomersService customersService)
        {
            this.customersService = customersService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            List<CustomerDTO> customers = await this.customersService.GetAllCustomersAsync();

            return Ok(customers);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCustomerById([FromRoute]int id)
        {
            CustomerDTO customer = await this.customersService.GetCustomerByIdAsync(id);

            return Ok(customer);
        }


        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody]CreateCustomerDTO createCustomerDTO)
        {
            int customerId = await this.customersService.CreateCustomerAsync(createCustomerDTO);

            return Ok(new { Id = customerId });
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute]int id, [FromBody]CustomerDTO customerDTO)
        {
            await this.customersService.UpdateCustomerAsync(id, customerDTO);

            return Ok();
        }  
        
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute]int id)
        {
            await this.customersService.DeleteCustomerAsync(id);

            return Ok();
        }
    }
}