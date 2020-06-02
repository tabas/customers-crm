import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CustomerInterface} from '../interfaces/cutomer.interface';

@Injectable()

export class CustomersService {
  private customersUrl: string = '/customers';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Get all customers
   */
  public getCustomers(): Observable<CustomerInterface[]> {
    return this.http.get<CustomerInterface[]>(
      `${environment.apiUrl}${this.customersUrl}`
    );
  }

  /**
   * Get customer by Id
   */
  public getCustomer(id: number): Observable<CustomerInterface> {
    return this.http.get<CustomerInterface>(
      `${environment.apiUrl}${this.customersUrl}/${id}`
    );
  }

  /**
   * Creates new customer item
   */
  public createNewCustomer(customer: CustomerInterface): Observable<{id: number}> {
    return this.http.post<{id: number}>(
      `${environment.apiUrl}${this.customersUrl}`, customer
    );
  }

  /**
   * Updates customer
   */
  public updateCustomer(customer: CustomerInterface): Observable<null> {
    return this.http.put<null>(
      `${environment.apiUrl}${this.customersUrl}/${customer.id}`, customer
    );
  }

  /**
   * Deletes customer
   */
  public deleteCustomer(customerid: number): Observable<null> {
    return this.http.delete<null>(
      `${environment.apiUrl}${this.customersUrl}/${customerid}`
    );
  }
}
