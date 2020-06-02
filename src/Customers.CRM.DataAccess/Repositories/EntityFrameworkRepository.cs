using Microsoft.EntityFrameworkCore;
using Customers.CRM.DataAccess.Abstraction.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;


namespace Customers.CRM.DataAccess.Repositories
{
    public class EntityFrameworkRepository<TEntity, TKey> : IRepository<TEntity, TKey>
                            where TEntity : class
    {
        protected EntityFrameworkRepository() { }

        protected EntityFrameworkRepository(DbContext dbContext)
        {
            this.SetContext(dbContext);
        }

        protected DbContext DbContext { get; private set; }

        protected DbSet<TEntity> DbSet => this.DbContext.Set<TEntity>();

        protected IQueryable<TEntity> Queryable => this.DbSet.AsQueryable();

        public void SetContext(DbContext context)
        {
            this.DbContext = context;
        }

        public virtual TEntity GetById(TKey id)
        {
            return this.DbSet.Find(id);
        }

        public virtual Task<TEntity> GetByIdAsync(TKey id)
        {
            return this.DbSet.FindAsync(id).AsTask();
        }

        public virtual ICollection<TEntity> GetAll()
        {
            return this.DbSet.ToList();
        }

        public virtual async Task<ICollection<TEntity>> GetAllAsync()
        {
            return await this.DbSet.ToListAsync();
        }

        public virtual ICollection<TEntity> Find(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            IEnumerable<Expression<Func<TEntity, object>>> includes = null)
        {
            List<TEntity> result = this.GenericFindQuery(filter, orderBy, includes).ToList();
            return result;
        }

        public virtual async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            return await this.DbSet.AnyAsync(filter);
        }

        public virtual async Task<ICollection<TEntity>> FindAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            IEnumerable<Expression<Func<TEntity, object>>> includes = null)
        {
            List<TEntity> result = await this.GenericFindQuery(filter, orderBy, includes).ToListAsync();
            return result;
        }

        public ICollection<TResult> FindAndMap<TResult>(
            Expression<Func<TEntity, TResult>> selector,
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            IEnumerable<Expression<Func<TEntity, object>>> includes = null)
        {
            List<TResult> result = this.GenericFindQuery(filter, orderBy, includes).Select(selector).ToList();
            return result;
        }

        public async Task<ICollection<TResult>> FindAndMapAsync<TResult>(
            Expression<Func<TEntity, TResult>> selector,
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            IEnumerable<Expression<Func<TEntity, object>>> includes = null)
        {
            List<TResult> result = await this.GenericFindQuery(filter, orderBy, includes).Select(selector).ToListAsync();
            return result;
        }

        public async Task<TResult> FindByKeyAndMapAsync<TResult>(
             Expression<Func<TEntity, bool>> keyFilter,
             Expression<Func<TEntity, TResult>> selector)
        {
            TResult result = await this.GenericFindQuery(keyFilter, null, null).Select(selector).FirstOrDefaultAsync();
            return result;
        }

        public void Add(TEntity entity)
        {
            this.DbSet.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            this.DbSet.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            this.DbSet.Attach(entity);
            this.DbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Remove(TEntity entity)
        {
            this.DbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            this.DbSet.RemoveRange(entities);
        }

        private IQueryable<TEntity> GenericFindQuery(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy,
            IEnumerable<Expression<Func<TEntity, object>>> includes)
        {
            IQueryable<TEntity> query = this.DbSet.AsQueryable();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            if (orderBy != null)
            {
                return orderBy(query);
            }

            return query;
        }
    }
}
