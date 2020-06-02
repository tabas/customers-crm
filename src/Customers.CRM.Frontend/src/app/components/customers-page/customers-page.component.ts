import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import {CustomerInterface, CustomerFormValueInterface} from 'app/interfaces/cutomer.interface';
import {CustomersService} from 'app/services/customers.service';
import {SnackBarService} from 'app/services/snack-bar.service';
import {messages} from '../../constants/messages-constants';
import {CustomerDialogComponent} from './customer-dialog/customer-dialog.component';
import {initialCustomerModelForCreation} from 'app/constants/customer-constants';
import {EditCustomerDialogComponent} from './edit-customer-dialog/edit-customer-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss']
})

export class CustomersPageComponent implements OnInit {
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['id', 'name', 'contactName', 'contactEmail', 'contactPhone', 'editCustomer', 'deleteCustomer'];
  public customers: CustomerInterface[] = [];
  fuseConfirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    public snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    if (this.route.snapshot.data && this.route.snapshot.data['customers']) {
      this.customers = this.getSortedCustomers(this.route.snapshot.data['customers']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = this.customers;
    }
  }

  private getSortedCustomers(customers: CustomerInterface[]): CustomerInterface[] {
    return customers.sort((a: CustomerInterface, b: CustomerInterface) => {
      return b.id - a.id;
    });
  }

  public searchCustomers(searching_value: string): void {
    this.dataSource.filter = searching_value;
  }

  public openNewCustomerModalWindow(): void {
    this.dialog.open(CustomerDialogComponent, {
      panelClass: 'customers-page-dialog',
      width: '600px',
      autoFocus: false,
      data: {
        customer: initialCustomerModelForCreation,
        onPrimaryAction: this.onCustomerCreate.bind(this)
      }
    });
  }

  public onCustomerCreate(customer_id: number, new_customer: CustomerInterface): void {
    this.customers.unshift(Object.assign({}, new_customer, {id: customer_id}));
    this.dataSource.data = this.customers;
  }

  public openEditCustomerModalWindow(customer_id: number): void {
    this.customersService.getCustomer(customer_id).subscribe((customer: CustomerInterface) => {
      this.dialog.open(EditCustomerDialogComponent, {
        width: '600px',
        autoFocus: false,
        data: {
          customer: customer,
          primaryButtonLabel: 'Update Details',
          onCustomerDetails: this.onCustomerDetailsUpdate.bind(this)
        }
      });
    }, error => {
      this.snackBarService.openSnackBar(messages.mainErrorMessage, true);
      console.error(error);
    });
  }

  public onCustomerDetailsUpdate(customer: CustomerInterface): void {
    this.customers = this.customers.map(customer_item => customer_item.id === customer.id ? customer : customer_item);
    this.dataSource.data = this.customers;
  }

  deleteCustomerRequest(customerid: number): void {
    this.fuseConfirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });
    this.fuseConfirmDialogRef.componentInstance.confirmMessage = `Are you sure you want to delete customer`;

    this.fuseConfirmDialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
         this.deleteCustomer(customerid);
        }
        this.fuseConfirmDialogRef = null;
      });
  }

  deleteCustomer(customerid: number): void {
    this.customersService.deleteCustomer(customerid).subscribe(() => {
      this.snackBarService.openSnackBar(messages.customerIsDeleted);
      this.customers = this.customers.filter(c => c.id !== customerid);
      this.dataSource.data = this.customers;
    }, error => {
      this.snackBarService.openSnackBar(messages.mainErrorMessage, true);
      console.error(error);
    });
  }
}
