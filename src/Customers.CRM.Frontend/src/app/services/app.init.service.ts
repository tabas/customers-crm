import {Injectable, Injector} from '@angular/core';

@Injectable({providedIn: 'root'})

export class AppInitService {
    constructor(private injector: Injector) {}

    async initializeApp() {
    }
}
