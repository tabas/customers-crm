import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })

export class SnackBarService {
  constructor(
    private _snackBar: MatSnackBar
  ) {}

  /**
   * Opens alert window with provided configurations
   */
  public openSnackBar(message: string, is_error: boolean = false): void {
    const panelClass: string = is_error ? 'error-snack-bar-panel' : 'success-snack-bar-panel';
    const snackBarConfig: MatSnackBarConfig = {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: panelClass
    };
    this._snackBar.open(message, '', snackBarConfig);
  }
}
