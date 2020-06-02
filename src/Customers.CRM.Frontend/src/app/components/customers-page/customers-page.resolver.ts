import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CustomersService} from '../../services/customers.service';
import {catchError} from 'rxjs/operators';
import {SnackBarService} from '../../services/snack-bar.service';
import {messages} from '../../constants/messages-constants';
import {CustomerInterface} from 'app/interfaces/cutomer.interface';

@Injectable()

export class CustomersPageResolver implements Resolve<CustomerInterface[]> {
  constructor(
    private customersService: CustomersService,
    public snackBarService: SnackBarService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerInterface[]> {
    return this.customersService.getCustomers().pipe(
      catchError(() => {
        this.snackBarService.openSnackBar(messages.fetchingDataProblem, true);
        return of([]);
      })
    );
  }
}
