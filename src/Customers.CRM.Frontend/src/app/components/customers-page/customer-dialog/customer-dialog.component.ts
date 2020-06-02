import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomerFormValueInterface, CustomerInterface} from 'app/interfaces/cutomer.interface';
import {messages} from '../../../constants/messages-constants';
import {CustomersService} from '../../../services/customers.service';
import {SnackBarService} from '../../../services/snack-bar.service';

export interface CustomerDialogDataInterface {
  customer: CustomerFormValueInterface;
  onPrimaryAction: (customer_id: number, new_customer: CustomerInterface) => void;
}

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})

export class CustomerDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogDataInterface,
    private customersService: CustomersService,
    public snackBarService: SnackBarService
  ) {}

  /**
   * Initializes component - life circle angular hook
   */
  public ngOnInit(): void {}

  /**
   * This method will be called on primary action of customer form
   * Creates new customer
   */
  public onCustomerCreate(new_customer: CustomerInterface): void {
    this.customersService.createNewCustomer(new_customer).subscribe((data: {id: number}) => {
      this.snackBarService.openSnackBar(messages.customerIsCreated);
      this.data.onPrimaryAction(data.id, new_customer);
    }, error => {
      this.snackBarService.openSnackBar(messages.mainErrorMessage, true);
      console.error(error);
    });
  }
}
