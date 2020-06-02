import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarService} from './services/snack-bar.service';
import {CustomersPageResolver} from './components/customers-page/customers-page.resolver';
import {CustomersService} from './services/customers.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/customers-page/customers-page.module').then(m => m.CustomersPageModule),
    resolve: {customers: CustomersPageResolver}
  },
  {
    path: 'errors/error-403',
    loadChildren: () => import('@common/pages/errors/403/error-403.module').then(m => m.Error403Module)
  },
  {
    path: '**',
    loadChildren: () => import('@common/pages/errors/404/error-404.module').then(m => m.Error404Module)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
  providers: [
    CustomersPageResolver,
    CustomersService,
    SnackBarService,
    MatSnackBar
  ]
})

export class AppRoutingModule {}
