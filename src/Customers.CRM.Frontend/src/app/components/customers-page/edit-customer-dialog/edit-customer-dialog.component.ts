import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerFormValueInterface, CustomerInterface} from 'app/interfaces/cutomer.interface';
import {messages} from '../../../constants/messages-constants';
import {SnackBarService} from '../../../services/snack-bar.service';
import {AbstractControl} from '@angular/forms';
import {ErrorResolverService} from '../../../services/error-resolver.service';
import {CustomersService} from '../../../services/customers.service';

export interface CustomerDialogDataInterface {
  customer: CustomerFormValueInterface;
  primaryButtonLabel: string;
  onCustomerDetails: (customer: CustomerInterface) => void;
}

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss']
})

export class EditCustomerDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogDataInterface,
    private snackBarService: SnackBarService,
    private errorResolverService: ErrorResolverService,
    private customersService: CustomersService
  ) {}

  public ngOnInit(): void {
  }


  public onCustomerDetailsUpdate(customer: CustomerInterface): void {
    this.customersService.updateCustomer(customer).subscribe(() => {
      this.snackBarService.openSnackBar(messages.customerIsUpdated);
      this.data.onCustomerDetails(customer);
    }, error => {
      this.snackBarService.openSnackBar(messages.mainErrorMessage, true);
      console.error(error);
    });
  }

  public getErrorMessage(control: AbstractControl): string {
    return this.errorResolverService.getErrorMessage(control);
  }
}
