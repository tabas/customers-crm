import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {ErrorResolverService} from '../../../services/error-resolver.service';
import {CustomerFormValueInterface, CustomerInterface} from 'app/interfaces/cutomer.interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})

export class CustomerFormComponent implements OnInit {
  @Input() dmsCustomer: CustomerFormValueInterface;
  @Input() dmsPrimaryButtonLabel: string;

  @Output() dmsOnPrimaryAction = new EventEmitter<CustomerInterface>();

  public customerForm: FormGroup;

  constructor(
    private errorResolverService: ErrorResolverService
  ) {}

  public ngOnInit(): void {
    this.customerForm = this.getCustomerForm(this.dmsCustomer);
  }

  private getCustomerForm(initial_customer_data: CustomerFormValueInterface): FormGroup {
    return new FormGroup({
      id: new FormControl(initial_customer_data.id, Validators.required),
      name: new FormControl(initial_customer_data.name, Validators.required),
      contactName: new FormControl(initial_customer_data.contactName, Validators.required),
      contactEmail: new FormControl(initial_customer_data.contactEmail, [Validators.required, Validators.email]),
      contactPhone: new FormControl(initial_customer_data.contactPhone, Validators.required)
    });
  }

  public onPrimaryAction(): void {
    if (this.customerForm.valid) {
      this.dmsOnPrimaryAction.emit(
        Object.assign({}, this.customerForm.value)
      );
    }
  }

  public getErrorMessage(control: AbstractControl): string {
    return this.errorResolverService.getErrorMessage(control);
  }
}
