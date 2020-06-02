import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppInitService } from './services/app.init.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

const initApp = (appInitService: AppInitService) => {
    return () => appInitService.initializeApp();
};

@NgModule({
    imports: [AppRoutingModule, HttpClientModule, AppRoutingModule],
    providers: [
        AppInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            deps: [AppInitService],
            multi: true
        }
    ]
})
export class AppLoadModule {}
