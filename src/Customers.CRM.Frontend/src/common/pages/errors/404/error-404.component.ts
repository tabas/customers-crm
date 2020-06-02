import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector: 'error-404',
    templateUrl: './error-404.component.html',
    styleUrls: ['./error-404.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Error404Component {
    constructor(
        private fuseConfigService: FuseConfigService
    ) {
        const hideNavbar = true;

        // Configure the layout
        this.fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: hideNavbar
                },
                toolbar: {
                    hidden: hideNavbar
                },
                footer: {
                    hidden: hideNavbar
                }
            }
        };
    }
}
