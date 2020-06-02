// Modules
import {AppLoadModule} from './app.load.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule} from '@fuse/components';
import {LayoutModule} from 'app/layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import 'hammerjs';

import {fuseConfig} from '../fuse-config';
// Components

import {AppComponent} from 'app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppLoadModule,
    TranslateModule.forRoot(),
    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    MatSnackBarModule,
    // App modules
    LayoutModule
  ],
  bootstrap: [AppComponent],
  providers: [
  ]
})

export class AppModule {}
