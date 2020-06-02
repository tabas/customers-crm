namespace Customers.CRM.DataAccess.Abstraction
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork CreateUnitOfWork();
    }
}
