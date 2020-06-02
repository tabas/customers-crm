import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

interface GreaterThanErrorInterface {
  gt_value: number;
  actual: any;
}

interface MinErrorInterface {
  min: number;
  actual: any;
}

@Injectable()

export class ErrorResolverService {
  private errorResolver = {
    required: () => 'This field is required',
    email: () => 'Email address is not valid',
    min: (error: MinErrorInterface) => `Minimum allowed value is ${error.min}`,
    greaterThan: (error: GreaterThanErrorInterface) => `Should be greater than ${error.gt_value}`,
    notUnique: () => 'Value is not unique',
    isLookupInvalid: () => 'Address must be selected',
    isCallSignInvalid: () => 'Call sign should be selected from the list',
    isCustomerInvalid: () => 'Customer name should be selected from the list',
    matDatepickerParse: () => 'Invalid date value'
  };

  constructor() {}

  /**
   * Getter of error messages for form controls
   */
  public getErrorMessage(control: AbstractControl): string {
    if (control.invalid) {
      const errorKeys = Object.keys(control.errors);

      if (this.errorResolver[errorKeys[0]]) {
        return this.errorResolver[errorKeys[0]](control.errors[errorKeys[0]]);
      }
    }
  }
}
