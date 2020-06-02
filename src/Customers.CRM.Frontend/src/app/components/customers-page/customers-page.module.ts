// Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {MaterialModule} from '../../material.module';
import {FuseSidebarModule} from '../../../@fuse/components';

// Components
import {CustomersPageComponent} from './customers-page.component';
import {CustomerDialogComponent} from './customer-dialog/customer-dialog.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {EditCustomerDialogComponent} from './edit-customer-dialog/edit-customer-dialog.component';

// Services
import {CustomersService} from 'app/services/customers.service';
import {SnackBarService} from '../../services/snack-bar.service';
import {ErrorResolverService} from 'app/services/error-resolver.service';

const routes = [
  {path: '', component: CustomersPageComponent}
];

@NgModule({
  declarations: [
    CustomersPageComponent,
    CustomerDialogComponent,
    CustomerFormComponent,
    EditCustomerDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    FuseSidebarModule
  ],
  exports: [
    CustomersPageComponent
  ],
  entryComponents: [
    CustomerDialogComponent
  ],
  providers: [
    CustomersService,
    SnackBarService,
    ErrorResolverService
  ]
})

export class CustomersPageModule {}
